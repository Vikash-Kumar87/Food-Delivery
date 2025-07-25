"use client"

import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAppContext, type Meal } from "@/context/app-context"
import { formatCurrency } from "@/lib/utils"
import { Edit, Trash2 } from "lucide-react"

export default function MealCard({
  meal,
  onViewDetails,
  onEdit,
  onDelete,
  isChefView = false,
}: {
  meal: Meal
  onViewDetails: (meal: Meal) => void
  onEdit?: (meal: Meal) => void
  onDelete?: (id: string) => void
  isChefView?: boolean
}) {
  const { addToCart } = useAppContext()

  return (
    <Card className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="relative w-full h-48 bg-gray-100">
        <Image
          src={meal.imageUrl || "/placeholder.svg"}
          alt={meal.name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <CardHeader className="p-4 pb-2 flex-grow">
        <CardTitle className="text-lg font-semibold">{meal.name}</CardTitle>
        <CardDescription className="text-sm text-gray-600 line-clamp-2">{meal.description}</CardDescription>
        <p className="text-md font-bold text-primary mt-2">{formatCurrency(meal.priceUSD)}</p>
      </CardHeader>
      <CardContent className="px-4 py-2 text-sm text-gray-700">
        <p>Category: {meal.category}</p>
        <p>Location: {meal.location}</p>
        <p className={`font-medium ${meal.availability ? "text-green-600" : "text-red-600"}`}>
          {meal.availability ? "Available" : "Out of Stock"}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col gap-2">
        <Button onClick={() => onViewDetails(meal)} variant="outline" className="w-full">
          View Details
        </Button>
        {!isChefView && meal.availability && (
          <Button onClick={() => addToCart(meal)} className="w-full">
            Add to Cart
          </Button>
        )}
        {isChefView && (
          <div className="flex gap-2 w-full">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => onEdit?.(meal)}>
              <Edit className="h-4 w-4 mr-2" /> Edit
            </Button>
            <Button variant="destructive" className="flex-1" onClick={() => onDelete?.(meal.id)}>
              <Trash2 className="h-4 w-4 mr-2" /> Delete
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
