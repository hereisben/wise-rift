import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import {
  DraftStatus,
  GameRole,
  MatchResult,
  QueueType,
} from './../../generated/prisma/enums.js';

export class FindDraftSessionsQueryDto {
  @IsOptional()
  @IsEnum(DraftStatus)
  status?: DraftStatus;

  @IsOptional()
  @IsEnum(GameRole)
  role?: GameRole;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  @IsOptional()
  @IsEnum(QueueType)
  queueType?: QueueType;

  @IsOptional()
  @IsEnum(MatchResult)
  result?: MatchResult;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  myChampionKey?: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  hasOutcome?: boolean;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  hasReview?: boolean;

  @IsOptional()
  @IsDateString()
  fromDate?: string;

  @IsOptional()
  @IsDateString()
  toDate?: string;
}
