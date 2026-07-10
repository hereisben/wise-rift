import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import { UsersService } from '../users/users.service.js';
import { AddChampionPoolEntryDto } from './dto/add-champion-pool-entry.dto.js';
import { UpdateChampionPoolEntryDto } from './dto/update-champion-pool-entry.dto.js';

@Injectable()
export class ChampionPoolService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async getMyChampionPool() {
    const devUser = await this.usersService.findDevUser();

    const existingChampionPool =
      await this.prismaService.championPool.findFirst({
        where: {
          deletedAt: null,
          userId: devUser.id,
        },
        include: this.getChampionPoolInclude(),
      });

    if (existingChampionPool) {
      return existingChampionPool;
    }

    return this.prismaService.championPool.create({
      data: {
        userId: devUser.id,
        name: `Default Champion Pool`,
      },
      include: this.getChampionPoolInclude(),
    });
  }

  async addChampionPoolEntry(addChampionPoolEntryDto: AddChampionPoolEntryDto) {
    const championPool = await this.getMyChampionPool();

    const championKey = addChampionPoolEntryDto.championKey
      .trim()
      .toLowerCase();

    const champion = await this.prismaService.champion.findFirst({
      where: {
        deletedAt: null,
        key: championKey,
      },
    });

    if (!champion) {
      throw new NotFoundException(`Champion not found: ${championKey}`);
    }

    return this.prismaService.championPoolEntry.upsert({
      where: {
        championPoolId_championId_preferredRole: {
          championPoolId: championPool.id,
          championId: champion.id,
          preferredRole: addChampionPoolEntryDto.preferredRole,
        },
      },
      update: {
        comfortLevel: addChampionPoolEntryDto.comfortLevel ?? null,
        notes: addChampionPoolEntryDto.notes?.trim() || null,
        deletedAt: null,
      },
      create: {
        championPoolId: championPool.id,
        championId: champion.id,
        preferredRole: addChampionPoolEntryDto.preferredRole,
        comfortLevel: addChampionPoolEntryDto.comfortLevel ?? null,
        notes: addChampionPoolEntryDto.notes?.trim() || null,
      },
      include: {
        champion: true,
      },
    });
  }

  async updateChampionPoolEntry(
    entryId: string,
    updateChampionPoolEntryDto: UpdateChampionPoolEntryDto,
  ) {
    const championPool = await this.getMyChampionPool();

    const championPoolEntry = await this.getChampionPoolEntry(
      entryId,
      championPool.id,
    );

    const championKey = updateChampionPoolEntryDto.championKey
      ?.trim()
      .toLowerCase();

    const champion = championKey
      ? await this.prismaService.champion.findFirst({
          where: {
            deletedAt: null,
            key: championKey,
          },
        })
      : null;

    if (championKey && !champion) {
      throw new NotFoundException(`Champion not found: ${championKey}`);
    }

    const nextChampionId = champion?.id ?? championPoolEntry.championId;

    const nextPreferredRole =
      updateChampionPoolEntryDto.preferredRole ??
      championPoolEntry.preferredRole;

    const duplicateEntry = await this.prismaService.championPoolEntry.findFirst(
      {
        where: {
          deletedAt: null,
          championPoolId: championPool.id,
          championId: nextChampionId,
          preferredRole: nextPreferredRole,
          id: {
            not: championPoolEntry.id,
          },
        },
      },
    );

    if (duplicateEntry) {
      throw new BadRequestException(`Champion pool entry already exists`);
    }

    return this.prismaService.championPoolEntry.update({
      where: {
        id: championPoolEntry.id,
      },
      data: {
        championId: nextChampionId,
        preferredRole: nextPreferredRole,
        comfortLevel:
          updateChampionPoolEntryDto.comfortLevel ??
          championPoolEntry.comfortLevel,
        notes:
          updateChampionPoolEntryDto.notes !== undefined
            ? updateChampionPoolEntryDto.notes?.trim() || null
            : championPoolEntry.notes,
        deletedAt: null,
      },
      include: {
        champion: true,
      },
    });
  }

  async softDeleteChampionPoolEntry(entryId: string) {
    const championPool = await this.getMyChampionPool();

    const championPoolEntry = await this.getChampionPoolEntry(
      entryId,
      championPool.id,
    );

    return this.prismaService.championPoolEntry.update({
      where: {
        id: championPoolEntry.id,
      },
      data: {
        deletedAt: new Date(),
      },
      include: {
        champion: true,
      },
    });
  }

  private async getChampionPoolEntry(entryId: string, championPoolId: string) {
    const championPoolEntry =
      await this.prismaService.championPoolEntry.findFirst({
        where: {
          deletedAt: null,
          id: entryId.trim(),
          championPoolId: championPoolId.trim(),
        },
      });

    if (!championPoolEntry) {
      throw new NotFoundException(`Champion pool entry not found`);
    }

    return championPoolEntry;
  }

  private getChampionPoolInclude() {
    return {
      championPoolEntries: {
        where: {
          deletedAt: null,
        },
        include: {
          champion: true,
        },
        orderBy: {
          createdAt: `desc`,
        },
      },
    } as const;
  }
}
