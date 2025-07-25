"use client"

import { useState, useEffect } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import type { Meal } from "@/context/app-context"

export default function MealUploadForm({
  onSubmit,
  initialMeal,
}: {
  onSubmit: (meal: Omit<Meal, "id" | "chefId"> | Meal) => void
  initialMeal?: Meal
}) {
  const [name, setName] = useState(initialMeal?.name || "")
  const [description, setDescription] = useState(initialMeal?.description || "")
  const [priceINR, setPriceINR] = useState(initialMeal?.priceUSD ? initialMeal.priceUSD * 83 : 0)
  const [imageUrl, setImageUrl] = useState(initialMeal?.imageUrl || "")
  const [availability, setAvailability] = useState<boolean>(initialMeal?.availability ?? true)
  const [category, setCategory] = useState(initialMeal?.category || "")
  const [location, setLocation] = useState(initialMeal?.location || "")

  useEffect(() => {
    if (initialMeal) {
      setName(initialMeal.name)
      setDescription(initialMeal.description)
      setPriceINR(initialMeal.priceUSD * 83) // Convert USD to INR
      setImageUrl(initialMeal.imageUrl)
      setAvailability(initialMeal.availability)
      setCategory(initialMeal.category)
      setLocation(initialMeal.location)
    }
  }, [initialMeal])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const priceUSD = Number(priceINR) / 83 // Convert back INR → USD for internal storage

    const mealData = {
      name,
      description,
      priceUSD,
      imageUrl,
      availability,
      category,
      location,
    }

    if (initialMeal) {
      onSubmit({ ...initialMeal, ...mealData }) // For editing
    } else {
      onSubmit(mealData) // For adding new
      // Clear form
      setName("")
      setDescription("")
      setPriceINR(0)
      setImageUrl("")
      setAvailability(true)
      setCategory("")
      setLocation("")
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{initialMeal ? "Edit Meal" : "Upload New Meal"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 col-span-full">
            <Label htmlFor="name">Meal Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="space-y-2 col-span-full">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price (INR)</Label>
            <Input
              id="price"
              type="number"
              step="1"
              value={priceINR}
              onChange={(e) => setPriceINR(Number(e.target.value))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="/hearty-vegetable-meal.png"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>

          <div className="flex items-center space-x-2 col-span-full">
            <Checkbox
              id="availability"
              checked={availability}
              onCheckedChange={(checked) => setAvailability(!!checked)}
            />
            <Label htmlFor="availability">Available</Label>
          </div>

          <Button type="submit" className="col-span-full">
            {initialMeal ? "Update Meal" : "Upload Meal"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
