import { Controller, Get, Param } from '@nestjs/common';
import { successResponse } from '../common/types/api-response.helper.js';
import { ItemsService } from './items.service.js';

@Controller(`items`)
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAll() {
    const items = await this.itemsService.getAll();
    return successResponse(`Get items successfully`, items);
  }

  @Get(`:key`)
  async findOneByKey(@Param(`key`) key: string) {
    const item = await this.itemsService.getOneByKey(key);
    return successResponse(`Get item successfully`, item);
  }
}
