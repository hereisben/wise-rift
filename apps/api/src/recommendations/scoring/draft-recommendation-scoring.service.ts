import { Injectable } from '@nestjs/common';
import { DraftChampionContext } from '../../common/types/draft-recommendation-champion.type.js';
import {
  DraftRecommendationContext,
  DraftRecommendationResultItem,
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

    const resultItems = availableCandidateContexts
      .map((candidateContext) =>
        this.scoreCandidate(
          draftRecommendationContext,
          candidateContext,
          allyTeamTags,
          enemyTeamTags,
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
  ): DraftRecommendationResultItem {
    const scoreBreakdown: DraftRecommendationResultItemScoreBreakdown = {
      roleFitScore: DRAFT_RECOMMENDATION_SCORING_WEIGHTS.BASE_ROLE_FIT,
      intendedChampionBonus:
        draftRecommendationContext.effectiveIntendedChampionKey ===
        candidateContext.champion.key
          ? DRAFT_RECOMMENDATION_SCORING_WEIGHTS.INTENDED_CHAMPION_BONUS
          : 0,
      matchupScore: 0,
      synergyScore: 0,
      buildProfileScore: candidateContext.selectedBuildProfile
        ? DRAFT_RECOMMENDATION_SCORING_WEIGHTS.BUILD_PROFILE_READY
        : 0,
      riskPenalty: 0,
      dataQualityPenalty: 0,
      totalBeforeClamp: 0,
    };

    const matchupProfileTags =
      this.getChampionMatchupProfileTags(candidateContext);

    const goodMatchupCount = this.countMatchingTags(
      matchupProfileTags.goodIntoTags,
      enemyTeamTags,
    );

    const weakMatchupCount = this.countMatchingTags(
      matchupProfileTags.weakIntoTags,
      enemyTeamTags,
    );

    const banRiskCount = this.countMatchingTags(
      matchupProfileTags.banRiskTags,
      enemyTeamTags,
    );

    scoreBreakdown.matchupScore +=
      goodMatchupCount * DRAFT_RECOMMENDATION_SCORING_WEIGHTS.GOOD_MATCHUP_TAG +
      weakMatchupCount * DRAFT_RECOMMENDATION_SCORING_WEIGHTS.WEAK_MATCHUP_TAG;

    scoreBreakdown.riskPenalty +=
      banRiskCount * DRAFT_RECOMMENDATION_SCORING_WEIGHTS.TEAM_RISK_TAG;

    const synergyProfileTags =
      this.getChampionSynergyProfileTags(candidateContext);

    const goodSynergyCount = this.countMatchingTags(
      synergyProfileTags.goodWithTags,
      allyTeamTags,
    );

    const neededSynergyCount = this.countMatchingTags(
      synergyProfileTags.needsTags,
      allyTeamTags,
    );

    const teamRiskCount = this.countMatchingTags(
      synergyProfileTags.teamRiskTags,
      allyTeamTags,
    );

    scoreBreakdown.synergyScore +=
      (goodSynergyCount + neededSynergyCount) *
      DRAFT_RECOMMENDATION_SCORING_WEIGHTS.GOOD_SYNERGY_TAG;

    scoreBreakdown.riskPenalty +=
      teamRiskCount * DRAFT_RECOMMENDATION_SCORING_WEIGHTS.TEAM_RISK_TAG;

    scoreBreakdown.totalBeforeClamp =
      scoreBreakdown.roleFitScore +
      scoreBreakdown.intendedChampionBonus +
      scoreBreakdown.matchupScore +
      scoreBreakdown.synergyScore +
      scoreBreakdown.buildProfileScore +
      scoreBreakdown.riskPenalty +
      scoreBreakdown.dataQualityPenalty;

    const totalScore = this.clampScore(scoreBreakdown.totalBeforeClamp);

    return {
      championKey: candidateContext.champion.key,
      championName: candidateContext.champion.name,
      role: draftRecommendationContext.role,
      totalScore,
      confidence: this.getConfidence(totalScore),
      scoreBreakdown,
      reasonCodes: this.buildCandidateReasonCodes(scoreBreakdown),
    };
  }

  private clampScore(score: number): number {
    return Math.max(
      DRAFT_RECOMMENDATION_SCORE_LIMITS.MIN_SCORE,
      Math.min(DRAFT_RECOMMENDATION_SCORE_LIMITS.MAX_SCORE, score),
    );
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

    if (scoreBreakdown.matchupScore > 0) {
      reasonCodes.push(`GOOD_MATCHUP`);
    }

    if (scoreBreakdown.matchupScore < 0) {
      reasonCodes.push(`WEAK_MATCHUP`);
    }

    if (scoreBreakdown.synergyScore > 0) {
      reasonCodes.push(`GOOD_SYNERGY`);
    }

    if (scoreBreakdown.riskPenalty < 0) {
      reasonCodes.push(`DRAFT_RISK`);
    }

    if (scoreBreakdown.buildProfileScore > 0) {
      reasonCodes.push(`HAS_BUILD_PROFILE`);
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

  private getChampionMatchupProfileTags(
    candidateContext: DraftChampionContext,
  ): {
    goodIntoTags: string[];
    weakIntoTags: string[];
    banRiskTags: string[];
  } {
    return {
      goodIntoTags: candidateContext.selectedMatchupProfile?.goodIntoTags ?? [],
      weakIntoTags: candidateContext.selectedMatchupProfile?.weakIntoTags ?? [],
      banRiskTags: candidateContext.selectedMatchupProfile?.banRiskTags ?? [],
    };
  }

  private getChampionSynergyProfileTags(
    candidateContext: DraftChampionContext,
  ): {
    goodWithTags: string[];
    needsTags: string[];
    teamRiskTags: string[];
  } {
    return {
      goodWithTags: candidateContext.selectedSynergyProfile?.goodWithTags ?? [],
      needsTags: candidateContext.selectedSynergyProfile?.needsTags ?? [],
      teamRiskTags: candidateContext.selectedSynergyProfile?.teamRiskTags ?? [],
    };
  }

  private countMatchingTags(tags: string[], targetTags: Set<string>): number {
    return [...new Set(tags)].filter((tag) => targetTags.has(tag)).length;
  }
}
