import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';

@Injectable()
export class PatchesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.patch.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        releasedAt: `desc`,
      },
    });
  }

  async findActive() {
    const patch = await this.prisma.patch.findFirst({
      where: {
        isActive: true,
        deletedAt: null,
      },
      orderBy: {
        releasedAt: `desc`,
      },
    });

    if (!patch) {
      throw new Error('Active patch not found!');
    }

    return patch;
  }
}
