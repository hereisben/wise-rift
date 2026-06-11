import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChampionsModule } from './champions/champions.module.js';
import { DatabaseModule } from './database/database.module.js';
import { HealthController } from './health/health.controller.js';
import { ItemsModule } from './items/items.module.js';
import { PatchesModule } from './patches/patches.module.js';

@Module({
  imports: [DatabaseModule, PatchesModule, ChampionsModule, ItemsModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
