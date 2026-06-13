import { Controller, Get, Param } from '@nestjs/common';
import { successResponse } from '../common/types/api-response.helper.js';
import { PatchesService } from './patches.service.js';

@Controller(`patches`)
export class PatchesController {
  constructor(private readonly patchesService: PatchesService) {}

  @Get()
  async findAll() {
    const patches = await this.patchesService.findAll();
    return successResponse(`Get patches successfully`, patches);
  }

  @Get(`active`)
  async findActive() {
    const patch = await this.patchesService.findActive();
    return successResponse(`Get active patch successfully`, patch);
  }

  @Get(`:version`)
  async findVersion(@Param(`version`) version: string) {
    const patch = await this.patchesService.findOneVersion(version);
    return successResponse(`Get version ${version} successfully`, patch);
  }
}
