import { Module } from '@nestjs/common';
import { GameTagsController } from './game-tags.controller.js';
import { GameTagsService } from './game-tags.service.js';

@Module({
  providers: [GameTagsService],
  controllers: [GameTagsController],
})
export class GameTagsModule {}
