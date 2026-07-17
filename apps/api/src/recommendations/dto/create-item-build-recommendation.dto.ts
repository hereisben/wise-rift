import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { NormalizedDraftChampionPick } from '../../common/types/draft-recommendation-champion.type.js';
import { GameRole } from '../../generated/prisma/enums.js';

export class CreateItemBuildRecommendationDto {
  @IsString()
  @IsNotEmpty()
  championKey!: string;

  @IsEnum(GameRole)
  role!: GameRole;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  allyPicks?: NormalizedDraftChampionPick[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  enemyPicks?: NormalizedDraftChampionPick[];
}
