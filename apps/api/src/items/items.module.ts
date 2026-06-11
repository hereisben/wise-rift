import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller.js';
import { ItemsService } from './items.service.js';

@Module({
  providers: [ItemsService],
  controllers: [ItemsController],
})
export class ItemsModule {}
