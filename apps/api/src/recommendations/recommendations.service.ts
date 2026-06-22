import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import { ConfidenceLevel } from '../generated/prisma/enums.js';
import { CreateDraftRecommendationDto } from './dto/create-draft-recommendation.dto';

@Injectable()
export class RecommendationsService {
  constructor(private readonly prismaService: PrismaService) {}

  getHealthCheck() {
    return {
      module: `recommendations`,
      status: `ok`,
    };
  }

  createDraftRecommendation(
    createDraftRecommendationDto: CreateDraftRecommendationDto,
  ) {
    return {
      inputSnapshot: createDraftRecommendationDto,
      resultItems: [],
      scoreBreakdown: null,
      reasonCodes: [],
      confidence: ConfidenceLevel.UNKNOWN,
    };
  }
}
