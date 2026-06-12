import { Controller, Get, Param } from '@nestjs/common';
import { successResponse } from '../common/types/api-response.helper.js';
import { SpellsService } from './spells.service.js';

@Controller(`spells`)
export class SpellsController {
  constructor(private readonly spellsService: SpellsService) {}

  @Get()
  async findMany() {
    const spells = await this.spellsService.findAll();
    return successResponse(`Get spells successfully`, spells);
  }

  @Get(`:key`)
  async findOneByKey(@Param(`key`) key: string) {
    const spell = await this.spellsService.findOneByKey(key);
    return successResponse(`Get spell successfully`, spell);
  }
}
