import { Module } from '@nestjs/common';
import { PatchesModule } from '../patches/patches.module.js';
import { RecommendationsController } from './recommendations.controller.js';
import { RecommendationsService } from './recommendations.service.js';
import { DraftRecommendationScoringService } from './scoring/draft-recommendation-scoring.service.js';

@Module({
  imports: [PatchesModule],
  controllers: [RecommendationsController],
  providers: [RecommendationsService, DraftRecommendationScoringService],
})
export class RecommendationsModule {}
