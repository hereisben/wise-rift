import { Module } from '@nestjs/common';
import { RecommendationsController } from './recommendations.controller.js';
import { RecommendationsService } from './recommendations.service.js';
import { DraftRecommendationScoringService } from './scoring/draft-recommendation-scoring.service.js';

@Module({
  controllers: [RecommendationsController],
  providers: [RecommendationsService, DraftRecommendationScoringService],
})
export class RecommendationsModule {}
