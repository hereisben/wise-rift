import { Body, Controller, Get, Post } from '@nestjs/common';
import { PatchesService } from './../patches/patches.service.js';
import { CreateDraftRecommendationDto } from './dto/create-draft-recommendation.dto.js';
import { RecommendationsService } from './recommendations.service.js';

@Controller(`recommendations`)
export class RecommendationsController {
  constructor(
    private readonly recommendationsService: RecommendationsService,
    private readonly patchesService: PatchesService,
  ) {}

  @Get()
  getHealthCheck() {
    return this.recommendationsService.getHealthCheck();
  }

  @Post(`draft`)
  async createDraftRecommendation(
    @Body() createDraftRecommendationDto: CreateDraftRecommendationDto,
  ) {
    const activePatch = await this.patchesService.findActive();

    return this.recommendationsService.createDraftRecommendation(
      createDraftRecommendationDto,
      activePatch.id,
    );
  }
}
