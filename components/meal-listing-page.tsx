"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import MealCard from "./meal-card"
import MealDetail from "./meal-detail"
import { useAppContext, type Meal } from "@/context/app-context"
import { Search, MapPin, Utensils } from "lucide-react"

export default function MealListingPage({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const { meals } = useAppContext()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterLocation, setFilterLocation] = useState("all")
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null)

  const availableCategories = Array.from(new Set(meals.map((meal) => meal.category)))
  const availableLocations = Array.from(new Set(meals.map((meal) => meal.location)))

  const filteredMeals = meals.filter((meal) => {
    const matchesSearch =
      meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meal.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || meal.category === filterCategory
    const matchesLocation = filterLocation === "all" || meal.location === filterLocation
    return matchesSearch && matchesCategory && matchesLocation && meal.availability 
  })

  if (selectedMeal) {
    return <MealDetail meal={selectedMeal} onBack={() => setSelectedMeal(null)} />
  }

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-64px)] bg-gray-50 p-4">
      <div className="w-full max-w-5xl mb-6 space-y-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search for meals..."
            className="w-full pl-10 pr-4 py-2 rounded-md shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full">
              <Utensils className="h-4 w-4 mr-2 text-gray-400" />
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {availableCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterLocation} onValueChange={setFilterLocation}>
            <SelectTrigger className="w-full">
              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
              <SelectValue placeholder="Filter by Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {availableLocations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={() => {
              setSearchTerm("")
              setFilterCategory("all")
              setFilterLocation("all")
            }}
            variant="outline"
            className="w-full"
          >
            Clear Filters
          </Button>
        </div>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMeals.length === 0 ? (
          <p className="col-span-full text-center text-lg text-gray-600">No meals found matching your criteria.</p>
        ) : (
          filteredMeals.map((meal) => <MealCard key={meal.id} meal={meal} onViewDetails={setSelectedMeal} />)
        )}
      </div>
    </div>
  )
}
