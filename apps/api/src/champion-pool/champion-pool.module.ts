import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module.js';
import { ChampionPoolController } from './champion-pool.controller.js';
import { ChampionPoolService } from './champion-pool.service.js';

@Module({
  imports: [UsersModule],
  providers: [ChampionPoolService],
  controllers: [ChampionPoolController],
})
export class ChampionPoolModule {}
