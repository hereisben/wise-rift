import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { TeamSide } from '../../generated/prisma/enums.js';

export class AddDraftBanDto {
  @IsString()
  @IsNotEmpty()
  championKey!: string;

  @IsEnum(TeamSide)
  teamSide!: TeamSide;

  @IsOptional()
  @IsInt()
  @Min(0)
  orderIndex?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  reason?: string;
}
