import { Module } from '@nestjs/common';
import { RunesController } from './runes.controller.js';
import { RunesService } from './runes.service.js';

@Module({
  providers: [RunesService],
  controllers: [RunesController],
})
export class RunesModule {}
