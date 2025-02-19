-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "cookies" TEXT[] DEFAULT ARRAY[]::TEXT[];
