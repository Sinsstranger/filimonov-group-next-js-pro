/*
  Warnings:

  - You are about to drop the `_ChefToRecipe` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ChefToRecipe" DROP CONSTRAINT "_ChefToRecipe_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChefToRecipe" DROP CONSTRAINT "_ChefToRecipe_B_fkey";

-- AlterTable
ALTER TABLE "Chef" ALTER COLUMN "bio" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "chefId" INTEGER;

-- DropTable
DROP TABLE "_ChefToRecipe";

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_chefId_fkey" FOREIGN KEY ("chefId") REFERENCES "Chef"("id") ON DELETE SET NULL ON UPDATE CASCADE;
