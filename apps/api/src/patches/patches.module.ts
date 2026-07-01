import { Module } from '@nestjs/common';
import { PatchesController } from './patches.controller.js';
import { PatchesService } from './patches.service.js';

@Module({
  providers: [PatchesService],
  controllers: [PatchesController],
  exports: [PatchesService],
})
export class PatchesModule {}
