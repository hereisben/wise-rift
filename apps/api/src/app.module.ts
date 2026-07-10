import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ChampionPoolModule } from './champion-pool/champion-pool.module.js';
import { ChampionsModule } from './champions/champions.module.js';
import { DatabaseModule } from './database/database.module.js';
import { DraftSessionsModule } from './draft-sessions/draft-sessions.module.js';
import { GameTagsModule } from './game-tags/game-tags.module.js';
import { HealthController } from './health/health.controller.js';
import { ItemsModule } from './items/items.module.js';
import { PatchesModule } from './patches/patches.module.js';
import { RecommendationsModule } from './recommendations/recommendations.module.js';
import { RunesModule } from './runes/runes.module.js';
import { SpellsModule } from './spells/spells.module.js';

@Module({
  imports: [
    DatabaseModule,
    PatchesModule,
    ChampionsModule,
    ItemsModule,
    GameTagsModule,
    SpellsModule,
    RunesModule,
    ChampionPoolModule,
    DraftSessionsModule,
    RecommendationsModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
