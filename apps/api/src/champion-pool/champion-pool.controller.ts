import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { successResponse } from '../common/types/api-response.helper.js';
import { ChampionPoolService } from './champion-pool.service.js';
import { AddChampionPoolEntryDto } from './dto/add-champion-pool-entry.dto.js';
import { UpdateChampionPoolEntryDto } from './dto/update-champion-pool-entry.dto.js';

@Controller(`champion-pool`)
export class ChampionPoolController {
  constructor(private readonly championPoolService: ChampionPoolService) {}

  @Get()
  async getMyChampionPool() {
    const championPool = await this.championPoolService.getMyChampionPool();
    return successResponse(`Get champion pool successfully`, championPool);
  }

  @Post(`entries`)
  async addChampionPoolEntry(
    @Body() addChampionPoolEntryDto: AddChampionPoolEntryDto,
  ) {
    const championPoolEntry =
      await this.championPoolService.addChampionPoolEntry(
        addChampionPoolEntryDto,
      );
    return successResponse(
      `Add champion pool entry successfully`,
      championPoolEntry,
    );
  }

  @Patch(`entries/:id`)
  async updateChampionPoolEntry(
    @Param(`id`) id: string,
    @Body() updateChampionPoolEntryDto: UpdateChampionPoolEntryDto,
  ) {
    const updatedChampionPoolEntry =
      await this.championPoolService.updateChampionPoolEntry(
        id,
        updateChampionPoolEntryDto,
      );

    return successResponse(
      `Update champion pool entry successfully`,
      updatedChampionPoolEntry,
    );
  }

  @Delete(`entries/:id`)
  async softDeleteChampionPoolEntry(@Param(`id`) id: string) {
    const softDeletedChampionPoolEntry =
      await this.championPoolService.softDeleteChampionPoolEntry(id);
    return successResponse(
      `Remove champion pool entry successfully`,
      softDeletedChampionPoolEntry,
    );
  }
}
