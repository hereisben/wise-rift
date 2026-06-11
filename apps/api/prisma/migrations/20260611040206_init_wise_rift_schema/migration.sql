-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "buildsIntoItemKeys" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "componentItemKeys" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- CreateIndex
CREATE INDEX "Item_deletedAt_idx" ON "Item"("deletedAt");
