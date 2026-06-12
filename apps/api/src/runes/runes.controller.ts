import { Controller, Get, Param } from '@nestjs/common';
import { successResponse } from '../common/types/api-response.helper.js';
import { RunesService } from './runes.service.js';

@Controller(`runes`)
export class RunesController {
  constructor(private readonly runesService: RunesService) {}

  @Get()
  async findAll() {
    const runes = await this.runesService.findAll();
    return successResponse(`Get runes successfully`, runes);
  }

  @Get(`:key`)
  async findOneByKey(@Param(`key`) key: string) {
    const rune = await this.runesService.findOneByKey(key);
    return successResponse(`Get rune successfully`, rune);
  }
}
