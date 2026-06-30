import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';
import { DraftStatus, GameRole } from '../generated/prisma/enums.js';
import { CreateDraftSessionDto } from './dto/create-draft-session.dto.js';

const DEV_USER_EMAIL = `dev@wise-rift.local`;

@Injectable()
export class DraftSessionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDraftSessionDto: CreateDraftSessionDto) {
    if (createDraftSessionDto.role === GameRole.UNKNOWN) {
      throw new BadRequestException(`Draft session role cannot be UNKNOWN`);
    }

    const devUser = await this.findDevUser();

    const activePatch = await this.prisma.patch.findFirst({
      where: {
        deletedAt: null,
        isActive: true,
      },
      orderBy: {
        releasedAt: `desc`,
      },
    });

    if (!activePatch) {
      throw new NotFoundException(`Active patch not found`);
    }

    const intendedChampionKey =
      createDraftSessionDto.intendedChampionKey?.trim().toLowerCase() ?? null;

    const intendedChampion = intendedChampionKey
      ? await this.prisma.champion.findFirst({
          where: {
            deletedAt: null,
            key: intendedChampionKey,
          },
        })
      : null;

    if (intendedChampionKey && !intendedChampion) {
      throw new NotFoundException(`Champion not found: ${intendedChampionKey}`);
    }

    return this.prisma.draftSession.create({
      data: {
        userId: devUser.id,
        patchId: activePatch.id,
        role: createDraftSessionDto.role,
        intendedChampionId: intendedChampion?.id ?? null,
        queueType: createDraftSessionDto.queueType ?? null,
        notes: createDraftSessionDto.notes?.trim() || null,
      },
      include: this.getDraftSessionInclude(),
    });
  }

  async findAll() {
    const devUser = await this.findDevUser();

    return this.prisma.draftSession.findMany({
      where: {
        deletedAt: null,
        userId: devUser.id,
        status: {
          not: DraftStatus.DELETED,
        },
      },
      include: this.getDraftSessionInclude(),
      orderBy: {
        createdAt: `desc`,
      },
    });
  }

  async findOne(id: string) {
    const devUser = await this.findDevUser();

    const draftSession = await this.prisma.draftSession.findFirst({
      where: {
        id,
        userId: devUser.id,
        deletedAt: null,
        status: {
          not: DraftStatus.DELETED,
        },
      },
      include: this.getDraftSessionInclude(),
    });

    if (!draftSession) {
      throw new NotFoundException(`Draft session not found`);
    }

    return draftSession;
  }

  private async findDevUser() {
    const devUser = await this.prisma.user.findFirst({
      where: {
        deletedAt: null,
        email: DEV_USER_EMAIL,
      },
    });

    if (!devUser) {
      throw new NotFoundException(`Dev user not found`);
    }

    return devUser;
  }

  private getDraftSessionInclude() {
    return {
      user: true,
      patch: true,
      intendedChampion: true,
      draftBans: {
        where: {
          deletedAt: null,
        },
        include: {
          champion: true,
        },
        orderBy: {
          orderIndex: `asc`,
        },
      },
      draftPicks: {
        where: {
          deletedAt: null,
        },
        include: {
          champion: true,
        },
        orderBy: {
          orderIndex: `asc`,
        },
      },
    } as const;
  }
}
