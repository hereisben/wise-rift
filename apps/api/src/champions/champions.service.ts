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
      include: {
        championPatchStats: {
          where: {
            deletedAt: null,
            patch: {
              deletedAt: null,
            },
          },
          include: {
            patch: true,
          },
        },
        championSkills: {
          where: {
            deletedAt: null,
            patch: {
              deletedAt: null,
            },
          },
          include: {
            patch: true,
          },
          orderBy: {
            slot: `asc`,
          },
        },
        championBuildProfiles: {
          where: {
            deletedAt: null,
            patch: {
              deletedAt: null,
            },
          },
          include: {
            patch: true,
          },
          orderBy: {
            role: `asc`,
          },
        },
        championMatchupProfiles: {
          where: {
            deletedAt: null,
            patch: {
              deletedAt: null,
            },
          },
          include: {
            patch: true,
          },
          orderBy: {
            role: `asc`,
          },
        },
        championSynergyProfiles: {
          where: {
            deletedAt: null,
            patch: {
              deletedAt: null,
            },
          },
          include: {
            patch: true,
          },
          orderBy: {
            role: `asc`,
          },
        },
      },
      orderBy: {
        name: `asc`,
      },
    });
  }

  async findAllWithActivePatchData() {
    return this.prisma.champion.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        championPatchStats: {
          where: {
            deletedAt: null,
            patch: {
              isActive: true,
              deletedAt: null,
            },
          },
          include: {
            patch: true,
          },
        },
        championSkills: {
          where: {
            deletedAt: null,
            patch: {
              isActive: true,
              deletedAt: null,
            },
          },
          include: {
            patch: true,
          },
          orderBy: {
            slot: `asc`,
          },
        },
        championBuildProfiles: {
          where: {
            deletedAt: null,
            patch: {
              deletedAt: null,
              isActive: true,
            },
          },
          include: {
            patch: true,
          },
          orderBy: {
            role: `asc`,
          },
        },
        championMatchupProfiles: {
          where: {
            deletedAt: null,
            patch: {
              deletedAt: null,
              isActive: true,
            },
          },
          include: {
            patch: true,
          },
          orderBy: {
            role: `asc`,
          },
        },
        championSynergyProfiles: {
          where: {
            deletedAt: null,
            patch: {
              deletedAt: null,
              isActive: true,
            },
          },
          include: {
            patch: true,
          },
          orderBy: {
            role: `asc`,
          },
        },
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
      include: {
        championPatchStats: {
          where: {
            deletedAt: null,
            patch: {
              deletedAt: null,
            },
          },
          include: {
            patch: true,
          },
        },
        championSkills: {
          where: {
            deletedAt: null,
            patch: {
              deletedAt: null,
            },
          },
          include: {
            patch: true,
          },
          orderBy: {
            slot: `asc`,
          },
        },
        championBuildProfiles: {
          where: {
            deletedAt: null,
            patch: {
              deletedAt: null,
            },
          },
          include: {
            patch: true,
          },
          orderBy: {
            role: `asc`,
          },
        },
        championMatchupProfiles: {
          where: {
            deletedAt: null,
            patch: {
              deletedAt: null,
            },
          },
          include: {
            patch: true,
          },
          orderBy: {
            role: `asc`,
          },
        },
        championSynergyProfiles: {
          where: {
            deletedAt: null,
            patch: {
              deletedAt: null,
            },
          },
          include: {
            patch: true,
          },
          orderBy: {
            role: `asc`,
          },
        },
      },
    });

    if (!champion) {
      throw new NotFoundException(`Champion ${key} not found`);
    }

    return champion;
  }

  async findOneByKeyWithActivePatchData(key: string) {
    const champion = await this.prisma.champion.findFirst({
      where: {
        deletedAt: null,
        key,
      },
      include: {
        championPatchStats: {
          where: {
            deletedAt: null,
            patch: {
              deletedAt: null,
              isActive: true,
            },
          },
          include: {
            patch: true,
          },
        },
        championSkills: {
          where: {
            deletedAt: null,
            patch: {
              deletedAt: null,
              isActive: true,
            },
          },
          include: {
            patch: true,
          },
          orderBy: {
            slot: `asc`,
          },
        },
        championBuildProfiles: {
          where: {
            deletedAt: null,
            patch: {
              deletedAt: null,
              isActive: true,
            },
          },
          include: {
            patch: true,
          },
          orderBy: {
            role: `asc`,
          },
        },
        championMatchupProfiles: {
          where: {
            deletedAt: null,
            patch: {
              deletedAt: null,
              isActive: true,
            },
          },
          include: {
            patch: true,
          },
          orderBy: {
            role: `asc`,
          },
        },
        championSynergyProfiles: {
          where: {
            deletedAt: null,
            patch: {
              deletedAt: null,
              isActive: true,
            },
          },
          include: {
            patch: true,
          },
          orderBy: {
            role: `asc`,
          },
        },
      },
    });

    if (!champion) {
      throw new NotFoundException(`Champion ${key} not found!`);
    }

    return champion;
  }
}
