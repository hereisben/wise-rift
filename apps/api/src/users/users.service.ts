import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service.js';

const DEV_USER_EMAIL = `dev@wise-rift.local`;

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findDevUser() {
    const devUser = await this.prismaService.user.findFirst({
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
}
