import { Controller, Get, Param } from '@nestjs/common';
import { successResponse } from '../common/types/api-response.helper.js';
import { ChampionsService } from './champions.service.js';

@Controller(`champions`)
export class ChampionsController {
  constructor(private readonly championsService: ChampionsService) {}

  @Get()
  async findAll() {
    const champions = await this.championsService.findAll();
    return successResponse(`Get champions successfully`, champions);
  }

  @Get(`:key`)
  async findOneByKey(@Param(`key`) key: string) {
    const champion = await this.championsService.findOneByKey(key);
    return successResponse(`Get champion successfully`, champion);
  }
}
