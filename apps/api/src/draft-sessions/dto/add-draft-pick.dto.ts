import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { GameRole, TeamSide } from '../../generated/prisma/enums.js';

export class AddDraftPickDto {
  @IsString()
  @IsNotEmpty()
  championKey!: string;

  @IsEnum(TeamSide)
  teamSide!: TeamSide;

  @IsEnum(GameRole)
  @IsOptional()
  role?: GameRole;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(4)
  playerSlot?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  orderIndex?: number;

  @IsOptional()
  @IsBoolean()
  isUserPick?: boolean;
}
