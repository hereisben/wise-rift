import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';

@Injectable()
export class GameTagsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const gameTags = await this.prisma.gameTag.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        name: `asc`,
      },
    });

    return gameTags;
  }

  async findOneByKey(key: string) {
    const gameTag = await this.prisma.gameTag.findFirst({
      where: {
        deletedAt: null,
        key,
      },
    });

    if (!gameTag) {
      throw new NotFoundException(`GameTag not found`);
    }

    return gameTag;
  }
}
