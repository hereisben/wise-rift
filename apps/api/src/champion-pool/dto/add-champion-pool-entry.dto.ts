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

export class AddChampionPoolEntryDto {
  @IsString()
  @IsNotEmpty()
  championKey!: string;

  @IsEnum(GameRole)
  preferredRole!: GameRole;

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
