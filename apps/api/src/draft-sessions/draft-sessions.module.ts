import { Module } from '@nestjs/common';
import { RecommendationsModule } from '../recommendations/recommendations.module.js';
import { DraftSessionsController } from './draft-sessions.controller.js';
import { DraftSessionsService } from './draft-sessions.service.js';

@Module({
  imports: [RecommendationsModule],
  controllers: [DraftSessionsController],
  providers: [DraftSessionsService],
})
export class DraftSessionsModule {}
