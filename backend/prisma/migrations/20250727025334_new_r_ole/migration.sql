/*
  Warnings:

  - The values [USER,EMPLOYER] on the enum `ROLE` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ROLE_new" AS ENUM ('ORGANIZATION', 'ADMIN', 'EMPLOYEE');
ALTER TYPE "ROLE" RENAME TO "ROLE_old";
ALTER TYPE "ROLE_new" RENAME TO "ROLE";
DROP TYPE "ROLE_old";
COMMIT;
