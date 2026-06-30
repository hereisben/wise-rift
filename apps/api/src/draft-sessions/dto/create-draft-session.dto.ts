import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { GameRole, QueueType } from '../../generated/prisma/enums.js';

export class CreateDraftSessionDto {
  @IsEnum(GameRole)
  role!: GameRole;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  intendedChampionKey?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  notes?: string;

  @IsEnum(QueueType)
  @IsOptional()
  queueType?: QueueType;
}
