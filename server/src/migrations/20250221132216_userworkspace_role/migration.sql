-- CreateEnum
CREATE TYPE "WorkspaceRole" AS ENUM ('owner', 'editor', 'viewer');

-- AlterTable
ALTER TABLE "UserWorkspace" ADD COLUMN     "role" "WorkspaceRole" NOT NULL DEFAULT 'owner';
