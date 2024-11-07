-- CreateTable
CREATE TABLE "Chef" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT NOT NULL,

    CONSTRAINT "Chef_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ChefToRecipe" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ChefToRecipe_AB_unique" ON "_ChefToRecipe"("A", "B");

-- CreateIndex
CREATE INDEX "_ChefToRecipe_B_index" ON "_ChefToRecipe"("B");

-- AddForeignKey
ALTER TABLE "_ChefToRecipe" ADD CONSTRAINT "_ChefToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "Chef"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChefToRecipe" ADD CONSTRAINT "_ChefToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
