import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
@Injectable()
export class ItemsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.item.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        itemPatchStats: {
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
  }

  async getOneByKey(key: string) {
    const item = await this.prisma.item.findFirst({
      where: {
        key,
        deletedAt: null,
      },
      include: {
        itemPatchStats: {
          where: {
            deletedAt: null,
          },
          include: {
            patch: true,
          },
        },
      },
    });

    if (!item) {
      throw new NotFoundException(`Item not found`);
    }

    return item;
  }
}
