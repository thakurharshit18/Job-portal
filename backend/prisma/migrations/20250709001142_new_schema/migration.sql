/*
  Warnings:

  - You are about to drop the column `userId` on the `Job` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('USER', 'ADMIN', 'EMPLOYER');

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "userId";
