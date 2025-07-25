"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppContext, type Meal } from "@/context/app-context"
import { formatCurrency } from "@/lib/utils"
import { ArrowLeft } from "lucide-react"

export default function MealDetail({ meal, onBack }: { meal: Meal; onBack: () => void }) {
  const { addToCart } = useAppContext()

  if (!meal) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4">
        <p className="text-lg text-gray-600">Meal not found.</p>
        <Button onClick={onBack} className="mt-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Meals
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 p-4">
      <Card className="w-full max-w-3xl rounded-lg shadow-lg overflow-hidden md:flex">
        <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-gray-100">
          <Image
            src={meal.imageUrl || "/placeholder.svg"}
            alt={meal.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
          />
        </div>
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-2xl font-bold">{meal.name}</CardTitle>
            <CardDescription className="text-gray-700 mt-2">{meal.description}</CardDescription>
          </CardHeader>
          <CardContent className="p-0 space-y-2">
            <p className="text-xl font-bold text-primary">{formatCurrency(meal.priceUSD)}</p>
            <p className="text-sm text-gray-600">Category: {meal.category}</p>
            <p className="text-sm text-gray-600">Location: {meal.location}</p>
            <p className={`font-medium ${meal.availability ? "text-green-600" : "text-red-600"}`}>
              {meal.availability ? "Available" : "Out of Stock"}
            </p>
          </CardContent>
          <CardFooter className="p-0 pt-6 flex flex-col gap-3">
            {meal.availability ? (
              <Button onClick={() => addToCart(meal)} className="w-full">
                Add to Cart
              </Button>
            ) : (
              <Button disabled className="w-full">
                Out of Stock
              </Button>
            )}
            <Button onClick={onBack} variant="outline" className="w-full bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Meals
            </Button>
          </CardFooter>
        </div>
      </Card>
    </div>
  )
}
