import { Module } from '@nestjs/common';
import { DraftSessionsController } from './draft-sessions.controller.js';
import { DraftSessionsService } from './draft-sessions.service.js';

@Module({
  controllers: [DraftSessionsController],
  providers: [DraftSessionsService],
})
export class DraftSessionsModule {}
