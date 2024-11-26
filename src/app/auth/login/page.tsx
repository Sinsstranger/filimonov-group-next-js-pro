import type { Metadata } from "next"
import React from "react"
import LoginForm from "@/app/auth/_components/LoginForm"

export const metadata: Metadata = {
  title: "Авторизация",
}

export default async function Home(): Promise<React.JSX.Element> {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-6">Авторизация</h1>
      <LoginForm />
    </div>
  )
}
