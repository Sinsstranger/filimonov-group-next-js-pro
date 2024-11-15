import Link from "next/link"
import { fetchRecipeById } from "@/helpers/api"
import RecipeDetail from "@/components/recipes/RecipeDetail"

export default async function RecipesPage({ params }: { params: { id: string } }) {
  const recipe = await fetchRecipeById(params.id)
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-6">{recipe.title}</h1>
      <RecipeDetail params={recipe} />
      <div className="mt-8">
        <Link
          href="/recipes"
          className="text-blue-500 hover:underline"
        >
          Посмотреть все рецепты
        </Link>
      </div>
    </div>
  )
}
