import { Module } from '@nestjs/common';
import { ChampionsController } from './champions.controller.js';
import { ChampionsService } from './champions.service.js';

@Module({
  providers: [ChampionsService],
  controllers: [ChampionsController],
})
export class ChampionsModule {}
