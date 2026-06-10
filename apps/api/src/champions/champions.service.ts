import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';

@Injectable()
export class ChampionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.champion.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        name: `asc`,
      },
    });
  }

  async findOneByKey(key: string) {
    const champion = await this.prisma.champion.findFirst({
      where: {
        key,
        deletedAt: null,
      },
    });

    if (!champion) {
      throw new NotFoundException(`Champion ${key} not found`);
    }

    return champion;
  }
}
