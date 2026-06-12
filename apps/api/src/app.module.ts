import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChampionsModule } from './champions/champions.module.js';
import { DatabaseModule } from './database/database.module.js';
import { GameTagsModule } from './game-tags/game-tags.module.js';
import { HealthController } from './health/health.controller.js';
import { ItemsModule } from './items/items.module.js';
import { PatchesModule } from './patches/patches.module.js';
import { SpellsModule } from './spells/spells.module.js';

@Module({
  imports: [
    DatabaseModule,
    PatchesModule,
    ChampionsModule,
    ItemsModule,
    GameTagsModule,
    SpellsModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
