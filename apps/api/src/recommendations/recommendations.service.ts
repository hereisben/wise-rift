import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';

@Injectable()
export class RecommendationsService {
  constructor(private readonly prismaService: PrismaService) {}

  getHealthCheck() {
    return {
      module: `recommendations`,
      status: `ok`,
    };
  }
}
