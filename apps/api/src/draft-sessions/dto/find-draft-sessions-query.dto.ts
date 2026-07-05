import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { DraftStatus, GameRole } from './../../generated/prisma/enums.js';

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
}
