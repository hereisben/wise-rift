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

    const resultItems = availableCandidateContexts
      .map((candidateContext) =>
        this.scoreCandidate(draftRecommendationContext, candidateContext),
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
      buildProfileScore: candidateContext.championBuildProfile
        ? DRAFT_RECOMMENDATION_SCORING_WEIGHTS.BUILD_PROFILE_READY
        : 0,
      riskPenalty: 0,
      dataQualityPenalty: 0,
      totalBeforeClamp: 0,
    };

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
}
