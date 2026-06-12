import { Controller, Get, Param } from '@nestjs/common';
import { successResponse } from '../common/types/api-response.helper.js';
import { GameTagsService } from './game-tags.service.js';

@Controller(`game-tags`)
export class GameTagsController {
  constructor(private readonly gameTagsService: GameTagsService) {}

  @Get()
  async findAll() {
    const gameTags = await this.gameTagsService.findAll();
    return successResponse(`Get game tags successfully`, gameTags);
  }

  @Get(`:key`)
  async findOneByKey(@Param(`key`) key: string) {
    const gameTag = await this.gameTagsService.findOneByKey(key);
    return successResponse(`Get game tag successfully`, gameTag);
  }
}
