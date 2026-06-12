import { Module } from '@nestjs/common';
import { SpellsController } from './spells.controller.js';
import { SpellsService } from './spells.service.js';

@Module({
  providers: [SpellsService],
  controllers: [SpellsController],
})
export class SpellsModule {}
