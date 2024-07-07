/*
  Warnings:

  - You are about to drop the column `userId` on the `organisation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "organisation" DROP CONSTRAINT "organisation_userId_fkey";

-- AlterTable
ALTER TABLE "organisation" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "UserOrganisation" (
    "organisationOrgId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserOrganisation_pkey" PRIMARY KEY ("organisationOrgId","userId")
);

-- AddForeignKey
ALTER TABLE "UserOrganisation" ADD CONSTRAINT "UserOrganisation_organisationOrgId_fkey" FOREIGN KEY ("organisationOrgId") REFERENCES "organisation"("orgId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOrganisation" ADD CONSTRAINT "UserOrganisation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
