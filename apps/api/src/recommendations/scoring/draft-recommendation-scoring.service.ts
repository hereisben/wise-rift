import { Injectable } from '@nestjs/common';
import { DraftChampionContext } from '../../common/types/draft-recommendation-champion.type.js';
import {
  DraftRecommendationChampionPoolEntry,
  DraftRecommendationContext,
  DraftRecommendationResultItem,
  DraftRecommendationResultItemExplanation,
  DraftRecommendationResultItemScoreBreakdown,
  DraftRecommendationScoringInput,
  DraftRecommendationScoringResult,
  DraftRecommendationScoringResultBreakdown,
} from '../../common/types/draft-recommendation-scoring.types.js';
import { ConfidenceLevel } from '../../generated/prisma/enums.js';
import {
  DRAFT_RECOMMENDATION_SCORE_LIMITS,
  DRAFT_RECOMMENDATION_SCORING_WEIGHTS,
} from './draft-recommendation-scoring.constants.js';
import { calculateChampionPoolScore } from './helpers/champion-pool-scoring.helper.js';
import { calculateMatchupScore } from './helpers/matchup-scoring.helper.js';
import { calculateSynergyScore } from './helpers/synergy-scoring.helper.js';
import { calculateTotalScore } from './helpers/total-score.helper.js';

@Injectable()
export class DraftRecommendationScoringService {
  scoreDraftRecommendations(
    input: DraftRecommendationScoringInput,
  ): DraftRecommendationScoringResult {
    const unavailableChampionKeys = new Set([
      ...input.allyChampionKeys,
      ...input.enemyChampionKeys,
      ...input.bannedChampionKeys,
    ]);

    const availableCandidateContexts = input.candidateContexts.filter(
      (candidateContext) =>
        !unavailableChampionKeys.has(candidateContext.champion.key),
    );

    const draftRecommendationContext: DraftRecommendationContext = {
      role: input.role,
      effectiveIntendedChampionKey: input.effectiveIntendedChampionKey,
      allyChampionKeys: input.allyChampionKeys,
      enemyChampionKeys: input.enemyChampionKeys,
      bannedChampionKeys: input.bannedChampionKeys,
    };

    const allyTeamTags = this.collectTeamAttributeTags(
      input.allyChampionContexts,
    );

    const enemyTeamTags = this.collectTeamAttributeTags(
      input.enemyChampionContexts,
    );

    const championPoolEntries = input.championPoolEntries;

    const resultItems = availableCandidateContexts
      .map((candidateContext) =>
        this.scoreCandidate(
          draftRecommendationContext,
          candidateContext,
          allyTeamTags,
          enemyTeamTags,
          championPoolEntries,
        ),
      )
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, DRAFT_RECOMMENDATION_SCORE_LIMITS.DEFAULT_RECOMMENDATION_LIMIT);

    const bestItem = resultItems[0] ?? null;

    const scoreBreakdown: DraftRecommendationScoringResultBreakdown = {
      candidateCount: input.candidateContexts.length,
      availableCandidateCount: availableCandidateContexts.length,
      recommendedCandidateCount: resultItems.length,
    };

    return {
      resultItems,
      bestItem,
      scoreBreakdown,
      reasonCodes: this.buildRecommendationReasonCodes(scoreBreakdown),
      confidence: bestItem?.confidence ?? ConfidenceLevel.UNKNOWN,
    };
  }

  private scoreCandidate(
    draftRecommendationContext: DraftRecommendationContext,
    candidateContext: DraftChampionContext,
    allyTeamTags: Set<string>,
    enemyTeamTags: Set<string>,
    championPoolEntries: DraftRecommendationChampionPoolEntry[],
  ): DraftRecommendationResultItem {
    const scoreBreakdown: DraftRecommendationResultItemScoreBreakdown = {
      roleFitScore: DRAFT_RECOMMENDATION_SCORING_WEIGHTS.BASE_ROLE_FIT,
      intendedChampionBonus:
        draftRecommendationContext.effectiveIntendedChampionKey ===
        candidateContext.champion.key
          ? DRAFT_RECOMMENDATION_SCORING_WEIGHTS.INTENDED_CHAMPION_BONUS
          : 0,
      matchupScore: 0,
      matchedGoodIntoTags: [],
      matchedWeakIntoTags: [],
      matchedBanRiskTags: [],
      synergyScore: 0,
      matchedGoodWithTags: [],
      matchedNeedsTags: [],
      matchedTeamRiskTags: [],
      buildProfileScore: candidateContext.selectedBuildProfile
        ? DRAFT_RECOMMENDATION_SCORING_WEIGHTS.BUILD_PROFILE_READY
        : 0,
      riskPenalty: 0,
      dataQualityPenalty: 0,
      isInChampionPool: false,
      championPoolComfortLevel: null,
      championPoolScore: 0,
      totalBeforeClamp: 0,
    };

    const matchupScoreResult = calculateMatchupScore(
      candidateContext,
      enemyTeamTags,
    );

    scoreBreakdown.matchedGoodIntoTags =
      matchupScoreResult.matchedGoodIntoTagsContext.matchingTags;

    scoreBreakdown.matchedWeakIntoTags =
      matchupScoreResult.matchedWeakIntoTagsContext.matchingTags;

    scoreBreakdown.matchedBanRiskTags =
      matchupScoreResult.matchedBanRiskTagsContext.matchingTags;

    scoreBreakdown.matchupScore += matchupScoreResult.matchupScore;

    scoreBreakdown.riskPenalty +=
      matchupScoreResult.matchedBanRiskTagsContext.matchingTagsCount *
      DRAFT_RECOMMENDATION_SCORING_WEIGHTS.TEAM_RISK_TAG;

    const synergyScoreResult = calculateSynergyScore(
      candidateContext,
      allyTeamTags,
    );

    scoreBreakdown.matchedGoodWithTags =
      synergyScoreResult.matchedGoodWithTagsContext.matchingTags;

    scoreBreakdown.matchedNeedsTags =
      synergyScoreResult.matchedNeedsTagsContext.matchingTags;

    scoreBreakdown.matchedTeamRiskTags =
      synergyScoreResult.matchedTeamRiskTagsContext.matchingTags;

    scoreBreakdown.synergyScore += synergyScoreResult.synergyScore;

    scoreBreakdown.riskPenalty +=
      synergyScoreResult.matchedTeamRiskTagsContext.matchingTagsCount *
      DRAFT_RECOMMENDATION_SCORING_WEIGHTS.TEAM_RISK_TAG;

    const championPoolResult = calculateChampionPoolScore(
      draftRecommendationContext,
      candidateContext,
      championPoolEntries,
    );

    scoreBreakdown.isInChampionPool = championPoolResult.isInChampionPool;
    scoreBreakdown.championPoolScore = championPoolResult.championPoolScore;
    scoreBreakdown.championPoolComfortLevel =
      championPoolResult.championPoolComfortLevel;

    const totalScoreResult = calculateTotalScore(scoreBreakdown);

    scoreBreakdown.totalBeforeClamp = totalScoreResult.totalBeforeClamp;

    const totalScore = totalScoreResult.totalScore;

    const reasonCodes = this.buildCandidateReasonCodes(scoreBreakdown);

    const explanation = this.buildExplanation(
      candidateContext.champion.name,
      reasonCodes,
    );

    return {
      championKey: candidateContext.champion.key,
      championName: candidateContext.champion.name,
      role: draftRecommendationContext.role,
      totalScore,
      confidence: this.getConfidence(totalScore),
      scoreBreakdown,
      reasonCodes,
      explanation,
    };
  }

  private getConfidence(score: number): ConfidenceLevel {
    if (score >= 75) {
      return ConfidenceLevel.HIGH;
    }

    if (score >= 55) {
      return ConfidenceLevel.MEDIUM;
    }

    return ConfidenceLevel.LOW;
  }

  private buildCandidateReasonCodes(
    scoreBreakdown: DraftRecommendationResultItemScoreBreakdown,
  ): string[] {
    const reasonCodes = [`ROLE_PROFILE_MATCH`];

    if (scoreBreakdown.intendedChampionBonus > 0) {
      reasonCodes.push(`INTENDED_CHAMPION`);
    }

    const matchupReasonCode = this.buildMatchupReasonCode(scoreBreakdown);

    if (matchupReasonCode) {
      reasonCodes.push(matchupReasonCode);
    }

    const synergyReasonCode = this.buildSynergyReasonCode(scoreBreakdown);

    if (synergyReasonCode) {
      reasonCodes.push(synergyReasonCode);
    }

    const riskReasonCode = this.buildRiskReasonCode(scoreBreakdown);

    if (riskReasonCode) {
      reasonCodes.push(riskReasonCode);
    }

    if (scoreBreakdown.buildProfileScore > 0) {
      reasonCodes.push(`HAS_BUILD_PROFILE`);
    }

    if (scoreBreakdown.isInChampionPool === true) {
      reasonCodes.push(`CHAMPION_POOL`);
    }

    return reasonCodes;
  }

  private buildRecommendationReasonCodes(
    scoreBreakdown: DraftRecommendationScoringResultBreakdown,
  ): string[] {
    const reasonCodes: string[] = [];

    if (scoreBreakdown.candidateCount < 1) {
      reasonCodes.push(`NO_CANDIDATES_FOUND`);
      return reasonCodes;
    }

    if (
      scoreBreakdown.candidateCount > 0 &&
      scoreBreakdown.availableCandidateCount < 1
    ) {
      reasonCodes.push(`NO_AVAILABLE_CANDIDATES`);
      return reasonCodes;
    }

    if (scoreBreakdown.recommendedCandidateCount < 1) {
      reasonCodes.push(`NO_RECOMMENDATIONS_FOUND`);
      return reasonCodes;
    }

    reasonCodes.push(`RECOMMENDATIONS_FOUND`);

    return reasonCodes;
  }

  private buildMatchupReasonCode(
    scoreBreakdown: DraftRecommendationResultItemScoreBreakdown,
  ): string | null {
    const goodMatchupCount = scoreBreakdown.matchedGoodIntoTags.length;
    const weakMatchupCount = scoreBreakdown.matchedWeakIntoTags.length;

    if (goodMatchupCount === 0 && weakMatchupCount === 0) {
      return null;
    }

    const matchupScore = scoreBreakdown.matchupScore;

    if (matchupScore >= 16) {
      return `MATCHUP_STRONGLY_FAVORABLE`;
    }

    if (matchupScore > 0) {
      return `MATCHUP_SLIGHTLY_FAVORABLE`;
    }

    if (matchupScore === 0) {
      return `MATCHUP_MIXED`;
    }

    if (matchupScore <= -20) {
      return `MATCHUP_STRONGLY_UNFAVORABLE`;
    }

    return `MATCHUP_SLIGHTLY_UNFAVORABLE`;
  }

  private buildSynergyReasonCode(
    scoreBreakdown: DraftRecommendationResultItemScoreBreakdown,
  ): string | null {
    const synergyMatchCount =
      scoreBreakdown.matchedGoodWithTags.length +
      scoreBreakdown.matchedNeedsTags.length;

    if (synergyMatchCount === 0) {
      return null;
    }

    if (scoreBreakdown.synergyScore >= 18) {
      return `STRONG_TEAM_SYNERGY`;
    }

    if (scoreBreakdown.synergyScore >= 12) {
      return `GOOD_TEAM_SYNERGY`;
    }

    return `LIMITED_TEAM_SYNERGY`;
  }

  private buildRiskReasonCode(
    scoreBreakdown: DraftRecommendationResultItemScoreBreakdown,
  ): string | null {
    const riskMatchCount =
      scoreBreakdown.matchedBanRiskTags.length +
      scoreBreakdown.matchedTeamRiskTags.length;

    if (riskMatchCount === 0) {
      return null;
    }

    if (scoreBreakdown.riskPenalty <= -12) {
      return `HIGH_DRAFT_RISK`;
    }

    return `LOW_DRAFT_RISK`;
  }

  private collectChampionAttributeTags(
    championContext: DraftChampionContext,
  ): Set<string> {
    return new Set([
      ...championContext.champion.classTags,
      ...championContext.champion.playstyleTags,
      ...championContext.champion.utilityTags,
      ...championContext.champion.riskTags,
      ...championContext.champion.strengths,
      ...championContext.champion.weaknesses,

      ...(championContext.selectedBuildProfile?.buildTags ?? []),
      ...(championContext.selectedBuildProfile?.playStyleTags ?? []),

      ...(championContext.selectedSynergyProfile?.providesTags ?? []),
    ]);
  }

  private collectTeamAttributeTags(
    championContexts: DraftChampionContext[],
  ): Set<string> {
    const teamTags = new Set<string>();

    for (const championContext of championContexts) {
      for (const tag of this.collectChampionAttributeTags(championContext)) {
        teamTags.add(tag);
      }
    }

    return teamTags;
  }

  private buildExplanation(
    championName: string,
    reasonCodes: string[],
  ): DraftRecommendationResultItemExplanation {
    const highlights: string[] = [];
    const warnings: string[] = [];

    if (reasonCodes.includes(`ROLE_PROFILE_MATCH`)) {
      highlights.push(`Fits the selected role profile`);
    }

    if (reasonCodes.includes(`MATCHUP_STRONGLY_FAVORABLE`)) {
      highlights.push(`Strong matchup signals into the enemy draft`);
    } else if (reasonCodes.includes(`MATCHUP_SLIGHTLY_FAVORABLE`)) {
      highlights.push(
        `Slightly favorable matchup signals into the enemy draft`,
      );
    } else if (reasonCodes.includes(`MATCHUP_MIXED`)) {
      warnings.push(`Mixed matchup signals into the enemy draft`);
    } else if (reasonCodes.includes(`MATCHUP_SLIGHTLY_UNFAVORABLE`)) {
      warnings.push(
        `Slightly unfavorable matchup signals into the enemy draft`,
      );
    } else if (reasonCodes.includes(`MATCHUP_STRONGLY_UNFAVORABLE`)) {
      warnings.push(`Strong unfavorable matchup signals into the enemy draft`);
    }

    if (reasonCodes.includes(`STRONG_TEAM_SYNERGY`)) {
      highlights.push(`Strong synergy with the current ally draft`);
    } else if (reasonCodes.includes(`GOOD_TEAM_SYNERGY`)) {
      highlights.push(`Useful synergy with the current ally draft`);
    }

    if (reasonCodes.includes(`HIGH_DRAFT_RISK`)) {
      warnings.push(`High draft risk based on current team context`);
    } else if (reasonCodes.includes(`LOW_DRAFT_RISK`)) {
      warnings.push(`Some draft risk is present`);
    }

    if (reasonCodes.includes(`HAS_BUILD_PROFILE`)) {
      highlights.push(`Has a role-specific build profile`);
    }

    if (reasonCodes.includes(`CHAMPION_POOL`)) {
      highlights.push(`Is in champion pool`);
    }

    const title =
      warnings.length === 0
        ? `${championName} is a strong draft option`
        : `${championName} is playable with some caveats`;

    const summary =
      highlights.length > 0
        ? `${championName} is recommended because ${highlights
            .map((highlight) => highlight.toLowerCase())
            .join(`, `)}.`
        : `${championName} is a possible draft option, but the current scoring evidence is limited.`;

    return {
      title,
      summary,
      highlights,
      warnings,
    };
  }
}
