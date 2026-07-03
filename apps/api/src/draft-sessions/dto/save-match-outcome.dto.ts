import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { MatchResult } from '../../generated/prisma/enums.js';

export class SaveMatchOutcomeDto {
  @IsEnum(MatchResult)
  result!: MatchResult;

  @IsString()
  @IsNotEmpty()
  myChampionKey!: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  kills?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  deaths?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  assists?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  notes?: string;
}
