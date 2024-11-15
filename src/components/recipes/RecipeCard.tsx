"use client"
import { useState, useCallback } from "react"
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid"
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"
import IngredientsList, { Ingredient } from "@/components/ingredients/IngredientsList"
import { Card } from "flowbite-react"
import RatingStars from "@/components/recipes/RatingStars"
import { fetchRecipeById } from "@/helpers/api.js"

interface RecipeCardProps {
  id: number
  title: string
  description: string
  image: string
  showIngredientsBtn?: boolean
  rating?: number
}

export default function RecipeCard({ id, title, description, image, rating, showIngredientsBtn = false }: RecipeCardProps) {
  const [liked, setLiked] = useState(false)
  const [showIngredients, setShowIngredients] = useState(false)
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const toggleLike = () => {
    setLiked(!liked)
  }
  const getIngredients = useCallback(async () => {
    setShowIngredients(true)
    const res = await fetchRecipeById(id.toString())
    const data = await res.json()
    setIngredients(data.ingredients)
  }, [id])
  const hideIngredients = useCallback(() => setShowIngredients(false), [])
  return (
    <Card
      className="max-w-sm"
      renderImage={() => (
        <Link href={`/recipes/${id}`}>
          <Image
            width={500}
            height={500}
            src={image}
            alt="image 1"
          />
        </Link>
      )}
    >
      {rating && <RatingStars rating={rating} />}
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">{description}</p>
      {showIngredients && ingredients.length > 0 && <IngredientsList ingredients={ingredients} />}
      {showIngredientsBtn && (
        <button
          onClick={!showIngredients ? getIngredients : hideIngredients}
          className="flex items-center space-x-2 mt-4"
        >
          <span>{showIngredients ? "Скрыть ингредиенты" : "Посмотреть ингредиенты"}</span>
        </button>
      )}
      <button
        onClick={toggleLike}
        className="flex items-center space-x-2 mt-4"
      >
        {liked ? <SolidHeartIcon className="w-6 h-6 text-red-500" /> : <OutlineHeartIcon className="w-6 h-6 text-gray-500" />}
        <span className="text-gray-900 dark:text-gray-200">{liked ? "Вы поставили лайк!" : "Поставить лайк"}</span>
      </button>
    </Card>
  )
}
