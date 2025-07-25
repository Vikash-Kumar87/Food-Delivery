"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { UtensilsCrossed, ChefHat, Package } from "lucide-react"

export default function HomePage({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-64px)] bg-gray-50 p-4">
      {/* Hero Section */}
      <section className="w-full max-w-5xl bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-lg shadow-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Fresh Homemade Food, Delivered to Your Door!
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Discover delicious meals from talented home chefs in your neighborhood.
          </p>
          <Button
            size="lg"
            className="bg-white text-orange-600 hover:bg-gray-100"
            onClick={() => setCurrentPage("meals")}
          >
            Browse Meals
          </Button>
        </div>
        <div className="relative w-64 h-64 md:w-80 md:h-80 shrink-0">
          <Image
  src="/homemade-meal.png"
  alt="Homemade meal"
  fill
  style={{ objectFit: "cover" }}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="text-center p-6">
          <CardHeader className="flex flex-col items-center p-0 mb-4">
            <UtensilsCrossed className="h-12 w-12 text-primary mb-2" />
            <CardTitle className="text-xl font-semibold">Diverse Menus</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            Explore a wide variety of daily changing menus from local home chefs.
          </CardContent>
        </Card>
        <Card className="text-center p-6">
          <CardHeader className="flex flex-col items-center p-0 mb-4">
            <ChefHat className="h-12 w-12 text-primary mb-2" />
            <CardTitle className="text-xl font-semibold">Support Local Chefs</CardTitle>
          </CardHeader>
          <CardContent className="p-0">Order directly from talented home chefs and support your community.</CardContent>
        </Card>
        <Card className="text-center p-6">
          <CardHeader className="flex flex-col items-center p-0 mb-4">
            <Package className="h-12 w-12 text-primary mb-2" />
            <CardTitle className="text-xl font-semibold">Easy Delivery</CardTitle>
          </CardHeader>
          <CardContent className="p-0">Enjoy convenient pickup or delivery options right to your doorstep.</CardContent>
        </Card>
      </section>

      {/* Call to Action */}
      <section className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Taste Homemade Goodness?</h2>
        <p className="text-lg text-gray-700 mb-6">
          Sign up as a user to start ordering, or as a chef to share your culinary creations!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" onClick={() => setCurrentPage("auth")}>
            Join as a User
          </Button>
          <Button size="lg" variant="outline" onClick={() => setCurrentPage("auth")}>
            Become a Chef
          </Button>
        </div>
      </section>
    </div>
  )
}
