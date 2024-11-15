async function fetchRecipes() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`, { cache: "no-store" })
  if (!res.ok) {
    throw new Error("404")
  }
  return await res.json()
}
async function fetchRecipeById(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}`, { cache: "no-store" })
  if (!res.ok) {
    throw new Error("404")
  }

  return await res.json()
}
export { fetchRecipes, fetchRecipeById }
