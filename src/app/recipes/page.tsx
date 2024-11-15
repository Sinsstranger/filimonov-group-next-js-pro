import RecipeCard from "@/components/recipes/RecipeCard"
import type { Recipe } from "@prisma/client"
import type { Metadata } from "next"
import { fetchRecipes } from "@/helpers/api"

export const metadata: Metadata = {
  title: "Книга рецептов",
  description: "Книга рецептов. Делитесь любимыми рецептами и открывайте для себя новые",
}

export default async function RecipesPage() {
  const recipes: Recipe[] = await fetchRecipes()
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-6">Рецепты</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe: Recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            description={recipe.description}
            showIngredientsBtn={true}
            image={recipe.imageUrl}
            rating={recipe.rating}
          />
        ))}
      </ul>
    </div>
  )
}
