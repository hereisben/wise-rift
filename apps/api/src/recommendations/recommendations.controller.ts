import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateDraftRecommendationDto } from './dto/create-draft-recommendation.dto.js';
import { RecommendationsService } from './recommendations.service.js';

@Controller(`recommendations`)
export class RecommendationsController {
  constructor(
    private readonly recommendationsService: RecommendationsService,
  ) {}

  @Get()
  getHealthCheck() {
    return this.recommendationsService.getHealthCheck();
  }

  @Post(`draft`)
  createDraftRecommendation(
    @Body() createDraftRecommendationDto: CreateDraftRecommendationDto,
  ) {
    return this.recommendationsService.createDraftRecommendation(
      createDraftRecommendationDto,
    );
  }
}
