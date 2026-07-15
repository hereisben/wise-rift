import { Injectable } from '@nestjs/common';
import { DraftChampionContext } from '../../common/types/draft-recommendation-champion.type.js';
import {
  DraftRecommendationChampionPoolEntry,
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
import { calculateChampionPoolScore } from './helpers/champion-pool-scoring.helper.js';
import { buildCandidateExplanation } from './helpers/explanation.helper.js';
import { calculateMatchupScore } from './helpers/matchup-scoring.helper.js';
import {
  buildCandidateReasonCodes,
  buildRecommendationReasonCodes,
} from './helpers/reason-code.helper.js';
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
      reasonCodes: buildRecommendationReasonCodes(scoreBreakdown),
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

    const reasonCodes = buildCandidateReasonCodes(scoreBreakdown);

    const explanation = buildCandidateExplanation(
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
}
