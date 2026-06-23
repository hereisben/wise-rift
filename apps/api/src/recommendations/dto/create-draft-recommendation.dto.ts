import { Type } from 'class-transformer';
import {
  ArrayUnique,
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { GameRole } from '../../generated/prisma/enums.js';

export class DraftChampionPickDto {
  @IsString()
  championKey!: string;

  @IsOptional()
  @IsEnum(GameRole)
  role?: GameRole;
}

export class CreateDraftRecommendationDto {
  @IsEnum(GameRole)
  role!: GameRole;

  @IsOptional()
  @IsString()
  intendedChampionKey?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DraftChampionPickDto)
  allyPicks?: DraftChampionPickDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DraftChampionPickDto)
  enemyPicks?: DraftChampionPickDto[];

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  bannedChampionKeys?: string[];
}
