import Image from "next/image"
import RatingStars from "@/components/recipes/RatingStars"
import type { Ingredient, Recipe } from "@prisma/client"

interface Params extends Recipe {
  ingredients: Ingredient[]
}

export default async function RecipeDetail({ params }: { params: Params }) {
  return (
    <div className="container flex flex-col md:flex-row gap-3.5">
      <div className="">
        <Image
          src={params.imageUrl}
          alt={params.title}
          width={320}
          height={320}
          className="image rounded"
        />
        <div className="container my-2">
          <RatingStars rating={params.rating} />
        </div>
      </div>
      <div className="">
        <p className="my-2">{params.description}</p>
        <h6 className="my-1">Ингредиенты:</h6>
        <ul className="italic">
          {params.ingredients.map((i: Ingredient) => (
            <li key={i.id}>
              {i.name} : {i.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
