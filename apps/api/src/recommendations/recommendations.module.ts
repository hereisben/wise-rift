import { Module } from '@nestjs/common';
import { ChampionPoolModule } from '../champion-pool/champion-pool.module.js';
import { PatchesModule } from '../patches/patches.module.js';
import { RecommendationsController } from './recommendations.controller.js';
import { RecommendationsService } from './recommendations.service.js';
import { DraftRecommendationScoringService } from './scoring/draft-recommendation-scoring.service.js';

@Module({
  imports: [PatchesModule, ChampionPoolModule],
  controllers: [RecommendationsController],
  providers: [RecommendationsService, DraftRecommendationScoringService],
  exports: [RecommendationsService],
})
export class RecommendationsModule {}
