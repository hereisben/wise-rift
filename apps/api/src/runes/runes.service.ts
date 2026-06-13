import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';

@Injectable()
export class RunesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    const runes = await this.prismaService.rune.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        runePatchStats: {
          where: {
            deletedAt: null,
          },
          include: {
            patch: true,
          },
        },
      },
      orderBy: {
        name: `asc`,
      },
    });

    return runes;
  }

  async findOneByKey(key: string) {
    const rune = await this.prismaService.rune.findFirst({
      where: {
        key,
        deletedAt: null,
      },
      include: {
        runePatchStats: {
          where: {
            deletedAt: null,
          },
          include: {
            patch: true,
          },
        },
      },
    });

    if (!rune) {
      throw new NotFoundException(`Rune not found`);
    }

    return rune;
  }
}
