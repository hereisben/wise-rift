import { Module } from '@nestjs/common';
import { PatchesController } from './patch.controller.js';
import { PatchesService } from './patch.service.js';

@Module({
  providers: [PatchesService],
  controllers: [PatchesController],
})
export class PatchesModule {}
