import { Controller, Get } from '@nestjs/common';
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
}
