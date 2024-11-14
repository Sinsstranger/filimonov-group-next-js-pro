import { Rating } from "flowbite-react"

export default function RatingStars({ rating }: { rating: number }) {
  const ratingStars = Array.from({ length: 5 }, (_, i) => (
    <Rating.Star
      key={i}
      filled={i < rating}
    />
  ))
  return <Rating>{ratingStars}</Rating>
}
