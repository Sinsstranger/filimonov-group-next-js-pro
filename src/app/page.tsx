import HeroSection from "@/components/shared/HeroSection"
import type { Metadata } from "next"
import React from "react"
import "@/scss/app.scss"
import { fetchRecipes } from "@/helpers/api"
import { Recipe } from "@prisma/client"

export const metadata: Metadata = {
  title: "Книга рецептов",
  description: "Книга рецептов. Делитесь любимыми рецептами и открывайте для себя новые",
}

export default async function Home(): Promise<React.JSX.Element> {
  const recipes: Recipe[] = await fetchRecipes()
  const images = recipes.map((r: { id: number; imageUrl: string; title: string }) => ({
    href: `/recipes/${r.id}`,
    src: r.imageUrl,
    alt: r.title,
    width: 80,
    height: 40,
  }))
  return (
    <div className="container mx-auto p-4">
      <HeroSection
        headline="Откройте для себя мир кулинарных шедевров"
        subheadLine="Добро пожаловать в книгу рецептов, где каждый рецепт – это маленький праздник! Найдите вдохновение для создания удивительных блюд, которые порадуют вас и ваших близких."
        primaryBtnText="Узнать больше"
        primaryBtnLink="/about"
        secondaryBtnText="Смотреть видео"
        secondaryBtnLink="/watch-demo"
        alertText="Попробуйте наши самые популярные рецепты!"
        alertLink="/recipes"
        alertBadge="Новинка"
        popularText="Популярно"
        images={images}
      />
    </div>
  )
}
