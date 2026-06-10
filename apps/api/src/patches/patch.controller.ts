import { Controller, Get } from '@nestjs/common';
import { successResponse } from '../common/types/api-response.helper.js';
import { PatchesService } from './patch.service.js';

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
}
