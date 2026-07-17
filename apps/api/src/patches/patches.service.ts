import { Injectable, NotFoundException } from '@nestjs/common';
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
      throw new NotFoundException('Active patch not found!');
    }

    return patch;
  }

  async findOneVersion(version: string) {
    const patch = await this.prisma.patch.findFirst({
      where: {
        version,
        deletedAt: null,
      },
    });

    if (!patch) {
      throw new NotFoundException(`Patch version ${version} not found`);
    }

    return patch;
  }

  async findOneById(patchId: string) {
    const patch = await this.prisma.patch.findFirst({
      where: {
        deletedAt: null,
        id: patchId,
      },
    });

    if (!patch) {
      throw new NotFoundException(`Patch not found`);
    }

    return patch;
  }
}
