import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { GameRole } from '../../generated/prisma/enums.js';

export class CreateDraftRecommendationDto {
  @IsEnum(GameRole)
  role!: GameRole;

  @IsOptional()
  @IsString()
  intendedChampionKey?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  allyChampionKeys?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  enemyChampionKeys?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  bannedChampionKeys?: string[];
}
