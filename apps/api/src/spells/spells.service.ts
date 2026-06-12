import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';

@Injectable()
export class SpellsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.spell.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        name: `asc`,
      },
    });
  }

  async findOneByKey(key: string) {
    const spell = await this.prisma.spell.findFirst({
      where: {
        key,
        deletedAt: null,
      },
      include: {
        spellPatchStats: {
          where: {
            deletedAt: null,
          },
          include: {
            patch: true,
          },
        },
      },
    });

    if (!spell) {
      throw new NotFoundException(`Spell not found!`);
    }

    return spell;
  }
}
