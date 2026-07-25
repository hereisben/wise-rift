-- AlterEnum
ALTER TYPE "ItemCategory" ADD VALUE 'ACTIVE';
ALTER TYPE "ItemCategory" ADD VALUE 'TRANSFORMED';

-- Rename existing columns
ALTER TABLE "ItemPatchStat"
RENAME COLUMN "armorPenetration" TO "flatArmorPenetration";

ALTER TABLE "ItemPatchStat"
RENAME COLUMN "magicPenetration" TO "flatMagicPenetration";

ALTER TABLE "ItemPatchStat"
RENAME COLUMN "movementSpeed" TO "flatMovementSpeed";

-- AlterTable
ALTER TABLE "ItemPatchStat"
ADD COLUMN     "healthRegen" DOUBLE PRECISION,
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "omniVamp" DOUBLE PRECISION,
ADD COLUMN     "percentArmorPenetration" DOUBLE PRECISION,
ADD COLUMN     "percentMagicPenetration" DOUBLE PRECISION,
ADD COLUMN     "percentMovementSpeed" DOUBLE PRECISION,
ADD COLUMN     "physicalVamp" DOUBLE PRECISION,
ADD COLUMN     "slowResistance" DOUBLE PRECISION,
ADD COLUMN     "tenacity" DOUBLE PRECISION;
