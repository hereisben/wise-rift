-- CreateEnum
CREATE TYPE "GameRole" AS ENUM ('TOP', 'MID', 'JUNGLE', 'ADC', 'SUPPORT', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "SkillSlot" AS ENUM ('PASSIVE', 'Q', 'W', 'E', 'R');

-- CreateEnum
CREATE TYPE "RunePath" AS ENUM ('KEYSTONE', 'PRECISION', 'DOMINATION', 'RESOLVE', 'SORCERY');

-- CreateEnum
CREATE TYPE "RunePageSlotType" AS ENUM ('KEYSTONE', 'PRIMARY', 'SECONDARY');

-- CreateEnum
CREATE TYPE "RuneSlot" AS ENUM ('KEYSTONE', 'SLOT_1', 'SLOT_2', 'SLOT_3');

-- CreateEnum
CREATE TYPE "RuneEffectType" AS ENUM ('DAMAGE', 'HEAL', 'SHIELD', 'MOVEMENT_SPEED', 'ATTACK_SPEED', 'ABILITY_HASTE', 'ADAPTIVE_FORCE', 'ARMOR', 'MAGIC_RESIST', 'HEALTH', 'MANA', 'GOLD', 'COOLDOWN_REDUCTION', 'CROWD_CONTROL', 'VISION', 'STACKING', 'SCALING', 'UTILITY');

-- CreateEnum
CREATE TYPE "RuneTriggerType" AS ENUM ('ALWAYS_ACTIVE', 'ON_HIT', 'ON_ATTACK', 'ON_ABILITY_HIT', 'ON_CHAMPION_HIT', 'ON_TAKEDOWN', 'ON_KILL', 'ON_ASSIST', 'ON_LOW_HEALTH', 'ON_SHIELD', 'ON_HEAL', 'ON_MOVEMENT', 'ON_COMBAT_START', 'AFTER_TIME', 'STACK_BASED');

-- CreateEnum
CREATE TYPE "RuneStatType" AS ENUM ('ATTACK_DAMAGE', 'ABILITY_POWER', 'ADAPTIVE_FORCE', 'ATTACK_SPEED', 'ABILITY_HASTE', 'CRITICAL_RATE', 'ARMOR', 'MAGIC_RESIST', 'HEALTH', 'MANA', 'OMNIVAMP', 'PHYSICAL_VAMP', 'MAGIC_VAMP', 'MOVEMENT_SPEED', 'GOLD');

-- CreateEnum
CREATE TYPE "DataQualityLevel" AS ENUM ('COMPLETE', 'PARTIAL', 'MINIMAL', 'MISSING');

-- CreateEnum
CREATE TYPE "AIExplanationSource" AS ENUM ('RECOMMENDATION_SOURCE', 'ITEM_BUILD_RECOMMENDATION', 'DRAFT_REVIEW', 'MANUAL');

-- CreateEnum
CREATE TYPE "ExplanationStyle" AS ENUM ('SHORT', 'DETAILED', 'COACHING', 'BEGINNER_FRIENDLY');

-- CreateEnum
CREATE TYPE "MatchResult" AS ENUM ('WIN', 'LOSS', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "GamePlan" AS ENUM ('STANDARD', 'BURST', 'SAFE', 'ANTI_TANK', 'ANTI_HEAL', 'ANTI_SHIELD', 'SURVIVE_DIVE', 'SCALING', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "RecommendationType" AS ENUM ('BAN', 'PICK', 'TEAM_COMPOSITION');

-- CreateEnum
CREATE TYPE "RecommendationStatus" AS ENUM ('QUEUED', 'RUNNING', 'SUCCEEDED', 'FAILED', 'CANCELED');

-- CreateEnum
CREATE TYPE "DraftPhase" AS ENUM ('SETUP', 'BAN_PREP', 'BAN_ENTRY', 'LIVE_PICK', 'COMPLETED', 'REVIEW', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "DraftStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'ARCHIVED', 'DELETED');

-- CreateEnum
CREATE TYPE "QueueType" AS ENUM ('RANKED', 'NORMAL', 'CUSTOM', 'SCRIM', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "TeamSide" AS ENUM ('MY_TEAM', 'ENEMY', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "DamageType" AS ENUM ('PHYSICAL', 'MAGIC', 'MIXED', 'TRUE_DAMAGE', 'UTILITY', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "TargetType" AS ENUM ('SELF', 'ALLY', 'ALLIES', 'ENEMY', 'ENEMIES', 'CHAMPION', 'MINION', 'MONSTER', 'TURRET', 'AREA', 'LOCATION');

-- CreateEnum
CREATE TYPE "SkillEffect" AS ENUM ('DAMAGE', 'SLOW', 'ROOT', 'STUN', 'KNOCK_UP', 'KNOCK_BACK', 'CHARM', 'SILENCE', 'FEAR', 'TAUNT', 'DASH', 'BLINK', 'SPEED_UP', 'SHIELD', 'HEAL', 'STEALTH', 'UNTARGETABLE', 'INVULNERABLE', 'EXECUTE', 'EMPOWERED_ATTACK', 'TRUE_DAMAGE', 'VISION', 'ZONE_CONTROL');

-- CreateEnum
CREATE TYPE "RangeType" AS ENUM ('MELEE', 'RANGED', 'HYBRID', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "ItemCategory" AS ENUM ('PHYSICAL', 'MAGIC', 'DEFENSE', 'BOOTS', 'ENCHANT', 'SUPPORT', 'JUNGLE', 'UTILITY', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "ConfidenceLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'UNKNOWN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patch" (
    "id" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "name" TEXT,
    "notes" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "releasedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "archivedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Patch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Champion" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT,
    "roles" "GameRole"[],
    "damageType" TEXT NOT NULL,
    "rangeType" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "resourceType" TEXT NOT NULL,
    "classTags" TEXT[],
    "playstyleTags" TEXT[],
    "utilityTags" TEXT[],
    "riskTags" TEXT[],
    "strengths" TEXT[],
    "weaknesses" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "archivedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Champion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChampionPatchStat" (
    "id" TEXT NOT NULL,
    "championId" TEXT NOT NULL,
    "patchId" TEXT NOT NULL,
    "baseHealth" DOUBLE PRECISION,
    "baseMana" DOUBLE PRECISION,
    "baseArmor" DOUBLE PRECISION,
    "baseMagicResist" DOUBLE PRECISION,
    "baseAttackDamage" DOUBLE PRECISION,
    "baseAbilityPower" DOUBLE PRECISION,
    "attackSpeed" DOUBLE PRECISION,
    "moveSpeed" DOUBLE PRECISION,
    "healthGrowth" DOUBLE PRECISION,
    "manaGrowth" DOUBLE PRECISION,
    "armorGrowth" DOUBLE PRECISION,
    "magicResistGrowth" DOUBLE PRECISION,
    "attackDamageGrowth" DOUBLE PRECISION,
    "attackSpeedGrowth" DOUBLE PRECISION,
    "scalingProfile" JSONB,
    "laneProfile" JSONB,
    "teamProfile" JSONB,
    "metaScore" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChampionPatchStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChampionSkill" (
    "id" TEXT NOT NULL,
    "slot" "SkillSlot" NOT NULL,
    "name" TEXT NOT NULL,
    "championId" TEXT NOT NULL,
    "patchId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "damageType" "DamageType" NOT NULL,
    "targetType" "TargetType" NOT NULL,
    "cooldown" JSONB,
    "cost" JSONB,
    "range" JSONB,
    "scaling" JSONB,
    "effects" "SkillEffect"[],
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChampionSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT[],
    "tags" TEXT[],
    "goodAgainst" TEXT[],
    "weakAgainst" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "archivedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemPatchStat" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "patchId" TEXT NOT NULL,
    "cost" INTEGER,
    "abilityPower" DOUBLE PRECISION,
    "attackDamage" DOUBLE PRECISION,
    "armor" DOUBLE PRECISION,
    "magicResist" DOUBLE PRECISION,
    "health" DOUBLE PRECISION,
    "mana" DOUBLE PRECISION,
    "abilityHaste" DOUBLE PRECISION,
    "critRate" DOUBLE PRECISION,
    "attackSpeed" DOUBLE PRECISION,
    "armorPenetration" DOUBLE PRECISION,
    "magicPenetration" DOUBLE PRECISION,
    "antiHealValue" DOUBLE PRECISION,
    "shieldPower" DOUBLE PRECISION,
    "effectDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemPatchStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChampionPool" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ChampionPool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChampionPoolEntry" (
    "id" TEXT NOT NULL,
    "championPoolId" TEXT NOT NULL,
    "championId" TEXT NOT NULL,
    "preferredRole" "GameRole" NOT NULL DEFAULT 'UNKNOWN',
    "comfortLevel" INTEGER,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChampionPoolEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DraftSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "patchId" TEXT NOT NULL,
    "role" "GameRole" NOT NULL,
    "intendedChampionId" TEXT,
    "phase" "DraftPhase" NOT NULL DEFAULT 'SETUP',
    "status" "DraftStatus" NOT NULL DEFAULT 'ACTIVE',
    "queueType" "QueueType",
    "notes" TEXT,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "archivedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "DraftSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DraftBan" (
    "id" TEXT NOT NULL,
    "draftSessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "championId" TEXT NOT NULL,
    "teamSide" "TeamSide" NOT NULL,
    "orderIndex" INTEGER,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "DraftBan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DraftPick" (
    "id" TEXT NOT NULL,
    "draftSessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "championId" TEXT NOT NULL,
    "teamSide" "TeamSide" NOT NULL,
    "role" "GameRole",
    "playerSlot" INTEGER,
    "orderIndex" INTEGER,
    "isUserPick" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "DraftPick_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecommendationResult" (
    "id" TEXT NOT NULL,
    "draftSessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "patchId" TEXT NOT NULL,
    "type" "RecommendationType" NOT NULL,
    "status" "RecommendationStatus" NOT NULL DEFAULT 'SUCCEEDED',
    "inputSnapshot" JSONB NOT NULL,
    "resultItems" JSONB NOT NULL,
    "scoreBreakdown" JSONB,
    "reasonCodes" JSONB,
    "confidence" "ConfidenceLevel" NOT NULL DEFAULT 'UNKNOWN',
    "aiExplanationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "RecommendationResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemBuildRecommendation" (
    "id" TEXT NOT NULL,
    "draftSessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "patchId" TEXT NOT NULL,
    "championId" TEXT NOT NULL,
    "gamePlan" "GamePlan"[] DEFAULT ARRAY['STANDARD']::"GamePlan"[],
    "coreItems" JSONB NOT NULL,
    "situationalItems" JSONB,
    "boots" JSONB,
    "enchant" JSONB,
    "warning" JSONB,
    "scoreBreakdown" JSONB,
    "reasonCodes" JSONB,
    "aiExplanationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ItemBuildRecommendation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchupNote" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "draftSessionId" TEXT NOT NULL,
    "myChampionId" TEXT NOT NULL,
    "enemyChampionId" TEXT NOT NULL,
    "role" "GameRole" NOT NULL,
    "title" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "MatchupNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchOutcome" (
    "id" TEXT NOT NULL,
    "draftSessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "result" "MatchResult" NOT NULL DEFAULT 'UNKNOWN',
    "myChampionId" TEXT NOT NULL,
    "kills" INTEGER,
    "deaths" INTEGER,
    "assists" INTEGER,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "MatchOutcome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DraftReview" (
    "id" TEXT NOT NULL,
    "draftSessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "summary" JSONB NOT NULL,
    "whatWentWell" JSONB,
    "whatToImprove" JSONB,
    "recommendationAccuracy" JSONB,
    "aiSummary" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "DraftReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIExplanation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "draftSessionId" TEXT NOT NULL,
    "sourceType" "AIExplanationSource" NOT NULL,
    "sourceId" TEXT NOT NULL,
    "style" "ExplanationStyle",
    "language" TEXT,
    "input" JSONB NOT NULL,
    "summary" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "AIExplanation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rune" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "iconUrl" TEXT,
    "path" "RunePath" NOT NULL,
    "slot" "RuneSlot" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Rune_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RunePatchStat" (
    "id" TEXT NOT NULL,
    "runeId" TEXT NOT NULL,
    "patchId" TEXT NOT NULL,
    "shortDescription" TEXT,
    "fullDescription" TEXT,
    "effectTypes" "RuneEffectType"[],
    "triggerTypes" "RuneTriggerType"[],
    "targetTypes" "TargetType"[],
    "baseValue" DOUBLE PRECISION,
    "scalingValue" DOUBLE PRECISION,
    "cooldown" DOUBLE PRECISION,
    "duration" DOUBLE PRECISION,
    "maxStacks" INTEGER,
    "statTypes" "RuneStatType"[],
    "statBonuses" JSONB,
    "notes" TEXT,
    "dataQuality" "DataQualityLevel" NOT NULL DEFAULT 'MINIMAL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "RunePatchStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RuneBuildRecommendation" (
    "id" TEXT NOT NULL,
    "draftSessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "patchId" TEXT NOT NULL,
    "championId" TEXT NOT NULL,
    "gamePlan" "GamePlan"[] DEFAULT ARRAY['STANDARD']::"GamePlan"[],
    "reasonCodes" JSONB,
    "scoreBreakdown" JSONB,
    "warning" JSONB,
    "aiExplanationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "RuneBuildRecommendation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RuneBuildRecommendationRune" (
    "id" TEXT NOT NULL,
    "runeBuildRecommendationId" TEXT NOT NULL,
    "runeId" TEXT NOT NULL,
    "pageSlotType" "RunePageSlotType" NOT NULL,
    "orderIndex" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RuneBuildRecommendationRune_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spell" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tags" TEXT[],
    "goodFor" TEXT[],
    "badFor" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Spell_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpellPatchStat" (
    "id" TEXT NOT NULL,
    "spellId" TEXT NOT NULL,
    "patchId" TEXT NOT NULL,
    "cooldownSeconds" INTEGER,
    "duration" DOUBLE PRECISION,
    "damageValue" DOUBLE PRECISION,
    "shieldValue" DOUBLE PRECISION,
    "healValue" DOUBLE PRECISION,
    "dataQuality" "DataQualityLevel" NOT NULL DEFAULT 'MINIMAL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "SpellPatchStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChampionBuildProfile" (
    "id" TEXT NOT NULL,
    "profileKey" TEXT NOT NULL,
    "championId" TEXT NOT NULL,
    "patchId" TEXT NOT NULL,
    "role" "GameRole" NOT NULL,
    "gamePlan" "GamePlan"[] DEFAULT ARRAY['STANDARD']::"GamePlan"[],
    "coreItemKeys" TEXT[],
    "situationalItemKeys" TEXT[],
    "recommendedRuneKeys" TEXT[],
    "recommendedSpellKeys" TEXT[],
    "playStyleTags" TEXT[],
    "buildTags" TEXT[],
    "notes" TEXT,
    "dataQuality" "DataQualityLevel" NOT NULL DEFAULT 'MINIMAL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ChampionBuildProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChampionMatchupProfile" (
    "id" TEXT NOT NULL,
    "championId" TEXT NOT NULL,
    "patchId" TEXT NOT NULL,
    "role" "GameRole" NOT NULL,
    "goodIntoTags" TEXT[],
    "weakIntoTags" TEXT[],
    "banRiskTags" TEXT[],
    "laneNotes" TEXT,
    "dataQuality" "DataQualityLevel" NOT NULL DEFAULT 'MINIMAL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ChampionMatchupProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChampionSynergyProfile" (
    "id" TEXT NOT NULL,
    "championId" TEXT NOT NULL,
    "patchId" TEXT NOT NULL,
    "role" "GameRole" NOT NULL,
    "goodWithTags" TEXT[],
    "providesTags" TEXT[],
    "needsTags" TEXT[],
    "teamRiskTags" TEXT[],
    "synergyNotes" TEXT,
    "dataQuality" "DataQualityLevel" NOT NULL DEFAULT 'MINIMAL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ChampionSynergyProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Patch_version_key" ON "Patch"("version");

-- CreateIndex
CREATE UNIQUE INDEX "Champion_key_key" ON "Champion"("key");

-- CreateIndex
CREATE INDEX "ChampionPatchStat_patchId_idx" ON "ChampionPatchStat"("patchId");

-- CreateIndex
CREATE UNIQUE INDEX "ChampionPatchStat_championId_patchId_key" ON "ChampionPatchStat"("championId", "patchId");

-- CreateIndex
CREATE INDEX "ChampionSkill_championId_idx" ON "ChampionSkill"("championId");

-- CreateIndex
CREATE INDEX "ChampionSkill_patchId_idx" ON "ChampionSkill"("patchId");

-- CreateIndex
CREATE UNIQUE INDEX "ChampionSkill_championId_patchId_slot_key" ON "ChampionSkill"("championId", "patchId", "slot");

-- CreateIndex
CREATE UNIQUE INDEX "Item_key_key" ON "Item"("key");

-- CreateIndex
CREATE INDEX "ItemPatchStat_itemId_idx" ON "ItemPatchStat"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "ItemPatchStat_patchId_itemId_key" ON "ItemPatchStat"("patchId", "itemId");

-- CreateIndex
CREATE UNIQUE INDEX "ChampionPool_userId_key" ON "ChampionPool"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ChampionPoolEntry_championPoolId_championId_preferredRole_key" ON "ChampionPoolEntry"("championPoolId", "championId", "preferredRole");

-- CreateIndex
CREATE INDEX "DraftSession_userId_idx" ON "DraftSession"("userId");

-- CreateIndex
CREATE INDEX "DraftSession_patchId_idx" ON "DraftSession"("patchId");

-- CreateIndex
CREATE INDEX "DraftSession_userId_patchId_idx" ON "DraftSession"("userId", "patchId");

-- CreateIndex
CREATE INDEX "DraftBan_userId_idx" ON "DraftBan"("userId");

-- CreateIndex
CREATE INDEX "DraftBan_draftSessionId_idx" ON "DraftBan"("draftSessionId");

-- CreateIndex
CREATE INDEX "DraftBan_championId_idx" ON "DraftBan"("championId");

-- CreateIndex
CREATE INDEX "DraftBan_userId_draftSessionId_idx" ON "DraftBan"("userId", "draftSessionId");

-- CreateIndex
CREATE INDEX "DraftBan_userId_championId_idx" ON "DraftBan"("userId", "championId");

-- CreateIndex
CREATE UNIQUE INDEX "DraftBan_draftSessionId_championId_key" ON "DraftBan"("draftSessionId", "championId");

-- CreateIndex
CREATE INDEX "DraftPick_draftSessionId_idx" ON "DraftPick"("draftSessionId");

-- CreateIndex
CREATE INDEX "DraftPick_userId_idx" ON "DraftPick"("userId");

-- CreateIndex
CREATE INDEX "DraftPick_championId_idx" ON "DraftPick"("championId");

-- CreateIndex
CREATE INDEX "DraftPick_userId_draftSessionId_idx" ON "DraftPick"("userId", "draftSessionId");

-- CreateIndex
CREATE INDEX "DraftPick_userId_championId_idx" ON "DraftPick"("userId", "championId");

-- CreateIndex
CREATE UNIQUE INDEX "DraftPick_draftSessionId_championId_key" ON "DraftPick"("draftSessionId", "championId");

-- CreateIndex
CREATE INDEX "RecommendationResult_draftSessionId_idx" ON "RecommendationResult"("draftSessionId");

-- CreateIndex
CREATE INDEX "RecommendationResult_userId_idx" ON "RecommendationResult"("userId");

-- CreateIndex
CREATE INDEX "RecommendationResult_patchId_idx" ON "RecommendationResult"("patchId");

-- CreateIndex
CREATE INDEX "RecommendationResult_userId_patchId_draftSessionId_idx" ON "RecommendationResult"("userId", "patchId", "draftSessionId");

-- CreateIndex
CREATE INDEX "ItemBuildRecommendation_draftSessionId_idx" ON "ItemBuildRecommendation"("draftSessionId");

-- CreateIndex
CREATE INDEX "ItemBuildRecommendation_patchId_idx" ON "ItemBuildRecommendation"("patchId");

-- CreateIndex
CREATE INDEX "ItemBuildRecommendation_championId_idx" ON "ItemBuildRecommendation"("championId");

-- CreateIndex
CREATE INDEX "ItemBuildRecommendation_userId_idx" ON "ItemBuildRecommendation"("userId");

-- CreateIndex
CREATE INDEX "ItemBuildRecommendation_userId_patchId_championId_idx" ON "ItemBuildRecommendation"("userId", "patchId", "championId");

-- CreateIndex
CREATE INDEX "MatchupNote_userId_idx" ON "MatchupNote"("userId");

-- CreateIndex
CREATE INDEX "MatchupNote_myChampionId_idx" ON "MatchupNote"("myChampionId");

-- CreateIndex
CREATE INDEX "MatchupNote_enemyChampionId_idx" ON "MatchupNote"("enemyChampionId");

-- CreateIndex
CREATE INDEX "MatchupNote_draftSessionId_idx" ON "MatchupNote"("draftSessionId");

-- CreateIndex
CREATE INDEX "MatchOutcome_userId_idx" ON "MatchOutcome"("userId");

-- CreateIndex
CREATE INDEX "MatchOutcome_draftSessionId_idx" ON "MatchOutcome"("draftSessionId");

-- CreateIndex
CREATE INDEX "MatchOutcome_myChampionId_idx" ON "MatchOutcome"("myChampionId");

-- CreateIndex
CREATE INDEX "MatchOutcome_userId_myChampionId_idx" ON "MatchOutcome"("userId", "myChampionId");

-- CreateIndex
CREATE UNIQUE INDEX "MatchOutcome_draftSessionId_key" ON "MatchOutcome"("draftSessionId");

-- CreateIndex
CREATE INDEX "DraftReview_userId_idx" ON "DraftReview"("userId");

-- CreateIndex
CREATE INDEX "DraftReview_userId_draftSessionId_idx" ON "DraftReview"("userId", "draftSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "DraftReview_draftSessionId_key" ON "DraftReview"("draftSessionId");

-- CreateIndex
CREATE INDEX "AIExplanation_userId_idx" ON "AIExplanation"("userId");

-- CreateIndex
CREATE INDEX "AIExplanation_draftSessionId_idx" ON "AIExplanation"("draftSessionId");

-- CreateIndex
CREATE INDEX "AIExplanation_sourceId_idx" ON "AIExplanation"("sourceId");

-- CreateIndex
CREATE INDEX "AIExplanation_userId_draftSessionId_sourceId_idx" ON "AIExplanation"("userId", "draftSessionId", "sourceId");

-- CreateIndex
CREATE UNIQUE INDEX "Rune_key_key" ON "Rune"("key");

-- CreateIndex
CREATE INDEX "Rune_path_idx" ON "Rune"("path");

-- CreateIndex
CREATE INDEX "Rune_slot_idx" ON "Rune"("slot");

-- CreateIndex
CREATE INDEX "Rune_path_slot_idx" ON "Rune"("path", "slot");

-- CreateIndex
CREATE INDEX "RunePatchStat_runeId_idx" ON "RunePatchStat"("runeId");

-- CreateIndex
CREATE INDEX "RunePatchStat_patchId_idx" ON "RunePatchStat"("patchId");

-- CreateIndex
CREATE UNIQUE INDEX "RunePatchStat_runeId_patchId_key" ON "RunePatchStat"("runeId", "patchId");

-- CreateIndex
CREATE INDEX "RuneBuildRecommendation_draftSessionId_idx" ON "RuneBuildRecommendation"("draftSessionId");

-- CreateIndex
CREATE INDEX "RuneBuildRecommendation_userId_idx" ON "RuneBuildRecommendation"("userId");

-- CreateIndex
CREATE INDEX "RuneBuildRecommendation_patchId_idx" ON "RuneBuildRecommendation"("patchId");

-- CreateIndex
CREATE INDEX "RuneBuildRecommendation_championId_idx" ON "RuneBuildRecommendation"("championId");

-- CreateIndex
CREATE INDEX "RuneBuildRecommendation_userId_patchId_championId_idx" ON "RuneBuildRecommendation"("userId", "patchId", "championId");

-- CreateIndex
CREATE INDEX "RuneBuildRecommendationRune_runeBuildRecommendationId_idx" ON "RuneBuildRecommendationRune"("runeBuildRecommendationId");

-- CreateIndex
CREATE INDEX "RuneBuildRecommendationRune_runeId_idx" ON "RuneBuildRecommendationRune"("runeId");

-- CreateIndex
CREATE INDEX "RuneBuildRecommendationRune_pageSlotType_idx" ON "RuneBuildRecommendationRune"("pageSlotType");

-- CreateIndex
CREATE UNIQUE INDEX "RuneBuildRecommendationRune_runeBuildRecommendationId_runeI_key" ON "RuneBuildRecommendationRune"("runeBuildRecommendationId", "runeId");

-- CreateIndex
CREATE UNIQUE INDEX "RuneBuildRecommendationRune_runeBuildRecommendationId_pageS_key" ON "RuneBuildRecommendationRune"("runeBuildRecommendationId", "pageSlotType", "orderIndex");

-- CreateIndex
CREATE UNIQUE INDEX "Spell_key_key" ON "Spell"("key");

-- CreateIndex
CREATE INDEX "SpellPatchStat_spellId_idx" ON "SpellPatchStat"("spellId");

-- CreateIndex
CREATE INDEX "SpellPatchStat_patchId_idx" ON "SpellPatchStat"("patchId");

-- CreateIndex
CREATE UNIQUE INDEX "SpellPatchStat_spellId_patchId_key" ON "SpellPatchStat"("spellId", "patchId");

-- CreateIndex
CREATE INDEX "ChampionBuildProfile_role_idx" ON "ChampionBuildProfile"("role");

-- CreateIndex
CREATE INDEX "ChampionBuildProfile_championId_idx" ON "ChampionBuildProfile"("championId");

-- CreateIndex
CREATE INDEX "ChampionBuildProfile_patchId_idx" ON "ChampionBuildProfile"("patchId");

-- CreateIndex
CREATE INDEX "ChampionBuildProfile_championId_patchId_role_idx" ON "ChampionBuildProfile"("championId", "patchId", "role");

-- CreateIndex
CREATE UNIQUE INDEX "ChampionBuildProfile_championId_patchId_role_profileKey_key" ON "ChampionBuildProfile"("championId", "patchId", "role", "profileKey");

-- CreateIndex
CREATE INDEX "ChampionMatchupProfile_championId_idx" ON "ChampionMatchupProfile"("championId");

-- CreateIndex
CREATE INDEX "ChampionMatchupProfile_patchId_idx" ON "ChampionMatchupProfile"("patchId");

-- CreateIndex
CREATE INDEX "ChampionMatchupProfile_role_idx" ON "ChampionMatchupProfile"("role");

-- CreateIndex
CREATE INDEX "ChampionMatchupProfile_championId_patchId_role_idx" ON "ChampionMatchupProfile"("championId", "patchId", "role");

-- CreateIndex
CREATE UNIQUE INDEX "ChampionMatchupProfile_championId_patchId_role_key" ON "ChampionMatchupProfile"("championId", "patchId", "role");

-- CreateIndex
CREATE INDEX "ChampionSynergyProfile_championId_idx" ON "ChampionSynergyProfile"("championId");

-- CreateIndex
CREATE INDEX "ChampionSynergyProfile_patchId_idx" ON "ChampionSynergyProfile"("patchId");

-- CreateIndex
CREATE INDEX "ChampionSynergyProfile_role_idx" ON "ChampionSynergyProfile"("role");

-- CreateIndex
CREATE INDEX "ChampionSynergyProfile_championId_patchId_role_idx" ON "ChampionSynergyProfile"("championId", "patchId", "role");

-- CreateIndex
CREATE UNIQUE INDEX "ChampionSynergyProfile_championId_patchId_role_key" ON "ChampionSynergyProfile"("championId", "patchId", "role");

-- AddForeignKey
ALTER TABLE "ChampionPatchStat" ADD CONSTRAINT "ChampionPatchStat_championId_fkey" FOREIGN KEY ("championId") REFERENCES "Champion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChampionPatchStat" ADD CONSTRAINT "ChampionPatchStat_patchId_fkey" FOREIGN KEY ("patchId") REFERENCES "Patch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChampionSkill" ADD CONSTRAINT "ChampionSkill_championId_fkey" FOREIGN KEY ("championId") REFERENCES "Champion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChampionSkill" ADD CONSTRAINT "ChampionSkill_patchId_fkey" FOREIGN KEY ("patchId") REFERENCES "Patch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemPatchStat" ADD CONSTRAINT "ItemPatchStat_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemPatchStat" ADD CONSTRAINT "ItemPatchStat_patchId_fkey" FOREIGN KEY ("patchId") REFERENCES "Patch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChampionPool" ADD CONSTRAINT "ChampionPool_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChampionPoolEntry" ADD CONSTRAINT "ChampionPoolEntry_championPoolId_fkey" FOREIGN KEY ("championPoolId") REFERENCES "ChampionPool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChampionPoolEntry" ADD CONSTRAINT "ChampionPoolEntry_championId_fkey" FOREIGN KEY ("championId") REFERENCES "Champion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DraftSession" ADD CONSTRAINT "DraftSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DraftSession" ADD CONSTRAINT "DraftSession_patchId_fkey" FOREIGN KEY ("patchId") REFERENCES "Patch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DraftSession" ADD CONSTRAINT "DraftSession_intendedChampionId_fkey" FOREIGN KEY ("intendedChampionId") REFERENCES "Champion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DraftBan" ADD CONSTRAINT "DraftBan_draftSessionId_fkey" FOREIGN KEY ("draftSessionId") REFERENCES "DraftSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DraftBan" ADD CONSTRAINT "DraftBan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DraftBan" ADD CONSTRAINT "DraftBan_championId_fkey" FOREIGN KEY ("championId") REFERENCES "Champion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DraftPick" ADD CONSTRAINT "DraftPick_draftSessionId_fkey" FOREIGN KEY ("draftSessionId") REFERENCES "DraftSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DraftPick" ADD CONSTRAINT "DraftPick_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DraftPick" ADD CONSTRAINT "DraftPick_championId_fkey" FOREIGN KEY ("championId") REFERENCES "Champion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecommendationResult" ADD CONSTRAINT "RecommendationResult_draftSessionId_fkey" FOREIGN KEY ("draftSessionId") REFERENCES "DraftSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecommendationResult" ADD CONSTRAINT "RecommendationResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecommendationResult" ADD CONSTRAINT "RecommendationResult_patchId_fkey" FOREIGN KEY ("patchId") REFERENCES "Patch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemBuildRecommendation" ADD CONSTRAINT "ItemBuildRecommendation_draftSessionId_fkey" FOREIGN KEY ("draftSessionId") REFERENCES "DraftSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemBuildRecommendation" ADD CONSTRAINT "ItemBuildRecommendation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemBuildRecommendation" ADD CONSTRAINT "ItemBuildRecommendation_patchId_fkey" FOREIGN KEY ("patchId") REFERENCES "Patch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemBuildRecommendation" ADD CONSTRAINT "ItemBuildRecommendation_championId_fkey" FOREIGN KEY ("championId") REFERENCES "Champion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchupNote" ADD CONSTRAINT "MatchupNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchupNote" ADD CONSTRAINT "MatchupNote_draftSessionId_fkey" FOREIGN KEY ("draftSessionId") REFERENCES "DraftSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchupNote" ADD CONSTRAINT "MatchupNote_myChampionId_fkey" FOREIGN KEY ("myChampionId") REFERENCES "Champion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchupNote" ADD CONSTRAINT "MatchupNote_enemyChampionId_fkey" FOREIGN KEY ("enemyChampionId") REFERENCES "Champion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchOutcome" ADD CONSTRAINT "MatchOutcome_draftSessionId_fkey" FOREIGN KEY ("draftSessionId") REFERENCES "DraftSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchOutcome" ADD CONSTRAINT "MatchOutcome_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchOutcome" ADD CONSTRAINT "MatchOutcome_myChampionId_fkey" FOREIGN KEY ("myChampionId") REFERENCES "Champion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DraftReview" ADD CONSTRAINT "DraftReview_draftSessionId_fkey" FOREIGN KEY ("draftSessionId") REFERENCES "DraftSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DraftReview" ADD CONSTRAINT "DraftReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIExplanation" ADD CONSTRAINT "AIExplanation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIExplanation" ADD CONSTRAINT "AIExplanation_draftSessionId_fkey" FOREIGN KEY ("draftSessionId") REFERENCES "DraftSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RunePatchStat" ADD CONSTRAINT "RunePatchStat_runeId_fkey" FOREIGN KEY ("runeId") REFERENCES "Rune"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RunePatchStat" ADD CONSTRAINT "RunePatchStat_patchId_fkey" FOREIGN KEY ("patchId") REFERENCES "Patch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuneBuildRecommendation" ADD CONSTRAINT "RuneBuildRecommendation_draftSessionId_fkey" FOREIGN KEY ("draftSessionId") REFERENCES "DraftSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuneBuildRecommendation" ADD CONSTRAINT "RuneBuildRecommendation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuneBuildRecommendation" ADD CONSTRAINT "RuneBuildRecommendation_patchId_fkey" FOREIGN KEY ("patchId") REFERENCES "Patch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuneBuildRecommendation" ADD CONSTRAINT "RuneBuildRecommendation_championId_fkey" FOREIGN KEY ("championId") REFERENCES "Champion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuneBuildRecommendationRune" ADD CONSTRAINT "RuneBuildRecommendationRune_runeBuildRecommendationId_fkey" FOREIGN KEY ("runeBuildRecommendationId") REFERENCES "RuneBuildRecommendation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuneBuildRecommendationRune" ADD CONSTRAINT "RuneBuildRecommendationRune_runeId_fkey" FOREIGN KEY ("runeId") REFERENCES "Rune"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpellPatchStat" ADD CONSTRAINT "SpellPatchStat_spellId_fkey" FOREIGN KEY ("spellId") REFERENCES "Spell"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpellPatchStat" ADD CONSTRAINT "SpellPatchStat_patchId_fkey" FOREIGN KEY ("patchId") REFERENCES "Patch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChampionBuildProfile" ADD CONSTRAINT "ChampionBuildProfile_championId_fkey" FOREIGN KEY ("championId") REFERENCES "Champion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChampionBuildProfile" ADD CONSTRAINT "ChampionBuildProfile_patchId_fkey" FOREIGN KEY ("patchId") REFERENCES "Patch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChampionMatchupProfile" ADD CONSTRAINT "ChampionMatchupProfile_championId_fkey" FOREIGN KEY ("championId") REFERENCES "Champion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChampionMatchupProfile" ADD CONSTRAINT "ChampionMatchupProfile_patchId_fkey" FOREIGN KEY ("patchId") REFERENCES "Patch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChampionSynergyProfile" ADD CONSTRAINT "ChampionSynergyProfile_championId_fkey" FOREIGN KEY ("championId") REFERENCES "Champion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChampionSynergyProfile" ADD CONSTRAINT "ChampionSynergyProfile_patchId_fkey" FOREIGN KEY ("patchId") REFERENCES "Patch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
