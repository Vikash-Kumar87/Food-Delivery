"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import MealUploadForm from "./meal-upload-form"
import MealCard from "./meal-card"
import { useAppContext, type Meal } from "@/context/app-context"
import { PlusCircle, UtensilsCrossed } from "lucide-react"

export default function ChefDashboard() {
  const { meals, userId, addMeal, updateMeal, deleteMeal } = useAppContext()
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [editingMeal, setEditingMeal] = useState<Meal | undefined>(undefined)

  const chefMeals = meals.filter((meal) => meal.chefId === userId)

  const handleFormSubmit = (mealData: Omit<Meal, "id" | "chefId"> | Meal) => {
    if ("id" in mealData) {
      updateMeal(mealData as Meal)
      setEditingMeal(undefined)
    } else {
      addMeal(mealData)
    }
    setShowUploadForm(false)
  }

  const handleEdit = (meal: Meal) => {
    setEditingMeal(meal)
    setShowUploadForm(true)
  }

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this meal?")) {
      deleteMeal(id)
    }
  }

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-64px)] bg-gray-50 p-4 space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800">Chef Dashboard</h2>

      <Card className="w-full max-w-4xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" /> {editingMeal ? "Edit Meal" : "Upload New Meal"}
          </CardTitle>
          <Button
            onClick={() => {
              setShowUploadForm(!showUploadForm)
              setEditingMeal(undefined)
            }}
          >
            {showUploadForm ? "Cancel" : "Add New Meal"}
          </Button>
        </CardHeader>
        {showUploadForm && (
          <CardContent>
            <MealUploadForm onSubmit={handleFormSubmit} initialMeal={editingMeal} />
          </CardContent>
        )}
      </Card>

      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UtensilsCrossed className="h-5 w-5" /> Your Uploaded Meals
          </CardTitle>
        </CardHeader>
        <CardContent>
          {chefMeals.length === 0 ? (
            <p className="text-center text-gray-600">You haven't uploaded any meals yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {chefMeals.map((meal) => (
                <MealCard
                  key={meal.id}
                  meal={meal}
                  onViewDetails={() => {
                    /* Chef view doesn't need detail page, can edit directly */
                  }}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  isChefView={true}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
