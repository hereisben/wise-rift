import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import {
  ConfidenceLevel,
  GameRole,
  MatchResult,
} from '../../generated/prisma/enums.js';

export enum DraftReviewVerdict {
  STRONG_DRAFT = `STRONG_DRAFT`,
  GOOD_DRAFT = `GOOD_DRAFT`,
  MIXED_DRAFT = `MIXED_DRAFT`,
  WEAK_DRAFT = `WEAK_DRAFT`,
  INCOMPLETE_DATA = `INCOMPLETE_DATA`,
}

export enum DraftReviewImpact {
  HIGH = `HIGH`,
  MEDIUM = `MEDIUM`,
  LOW = `LOW`,
}

export enum DraftReviewPriority {
  HIGH = `HIGH`,
  MEDIUM = `MEDIUM`,
  LOW = `LOW`,
}

// summary Json
export class DraftReviewSummaryDto {
  @IsEnum(MatchResult)
  result!: MatchResult;

  @IsEnum(GameRole)
  role!: GameRole;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  intendedChampionKey?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  playedChampionKey?: string;

  @IsInt()
  @Min(0)
  totalRecommendations!: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  latestRecommendationId?: string;

  @IsInt()
  @Min(0)
  @Max(100)
  draftScore!: number;

  @IsInt()
  @Min(0)
  @Max(100)
  outcomeScore!: number;

  @IsInt()
  @Min(0)
  @Max(100)
  overallScore!: number;

  @IsEnum(DraftReviewVerdict)
  verdict!: DraftReviewVerdict;

  @IsEnum(ConfidenceLevel)
  confidence!: ConfidenceLevel;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  reasonCodes!: string[];
}

// whatWentWell Json?
export class DraftReviewPositivePointDto {
  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  relatedChampionKeys!: string[];

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  relatedTagKeys!: string[];

  @IsEnum(DraftReviewImpact)
  impact!: DraftReviewImpact;
}

export class DraftReviewWhatWentWellDto {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DraftReviewPositivePointDto)
  items!: DraftReviewPositivePointDto[];
}

// whatToImprove Json?
export class DraftReviewImprovementPointDto {
  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  suggestedAction!: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  relatedChampionKeys!: string[];

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  relatedTagKeys!: string[];

  @IsEnum(DraftReviewPriority)
  priority!: DraftReviewPriority;
}

export class DraftReviewWhatToImproveDto {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DraftReviewImprovementPointDto)
  items!: DraftReviewImprovementPointDto[];
}

// recommendationAccuracy Json?
export class DraftReviewRecommendationAccuracyDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  latestRecommendationId?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  recommendedChampionKey?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  playedChampionKey?: string;

  @IsOptional()
  @IsBoolean()
  followedRecommendation?: boolean;

  @IsOptional()
  @IsInt()
  @Min(1)
  recommendedChampionRank?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  recommendedChampionScore?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  playedChampionRank?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  playedChampionScore?: number;

  @IsInt()
  @Min(0)
  @Max(100)
  accuracyScore!: number;

  @IsEnum(ConfidenceLevel)
  confidence!: ConfidenceLevel;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  reasonCodes!: string[];

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  notes?: string;
}

export class SaveDraftReviewDto {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => DraftReviewSummaryDto)
  summary!: DraftReviewSummaryDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => DraftReviewWhatWentWellDto)
  whatWentWell?: DraftReviewWhatWentWellDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => DraftReviewWhatToImproveDto)
  whatToImprove?: DraftReviewWhatToImproveDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => DraftReviewRecommendationAccuracyDto)
  recommendationAccuracy?: DraftReviewRecommendationAccuracyDto;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  aiSummary?: string;
}
