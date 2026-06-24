import { Type } from 'class-transformer';
import {
  ArrayUnique,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { GameRole } from '../../generated/prisma/enums.js';

export class DraftChampionPickDto {
  @IsString()
  @IsNotEmpty()
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
  @IsNotEmpty()
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
  @IsNotEmpty({ each: true })
  bannedChampionKeys?: string[];
}
