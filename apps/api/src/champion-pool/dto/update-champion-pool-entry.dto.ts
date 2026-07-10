import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { GameRole } from '../../generated/prisma/enums.js';

export class UpdateChampionPoolEntryDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  championKey?: string;

  @IsOptional()
  @IsEnum(GameRole)
  preferredRole?: GameRole;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  comfortLevel?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  notes?: string;
}
