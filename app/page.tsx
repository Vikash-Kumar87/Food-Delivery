"use client"

import { useState } from "react"
import { AppContextProvider, useAppContext } from "@/context/app-context"
import Header from "@/components/header"
import AuthForm from "@/components/auth-form"
import MealListingPage from "@/components/meal-listing-page"
import ChefDashboard from "@/components/chef-dashboard"
import CartPage from "@/components/cart-page"
import CheckoutForm from "@/components/checkout-form"
import HomePage from "@/components/home-page"
import Link from "next/link"
import { Facebook, Twitter, Instagram } from "lucide-react"

export default function AppWrapper() {
  return (
    <AppContextProvider>
      <App />
    </AppContextProvider>
  )
}

function App() {
  const [currentPage, setCurrentPage] = useState("home") // Default page
  const { isLoggedIn, userRole } = useAppContext()

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage setCurrentPage={setCurrentPage} />
      case "meals":
        return <MealListingPage setCurrentPage={setCurrentPage} />
      case "auth":
        return <AuthForm setCurrentPage={setCurrentPage} />
      case "chef-dashboard":
        return isLoggedIn && userRole === "chef" ? <ChefDashboard /> : <AuthForm setCurrentPage={setCurrentPage} />
      
      case "cart":
        return <CartPage setCurrentPage={setCurrentPage} />
      case "checkout":
        return <CheckoutForm setCurrentPage={setCurrentPage} />
     
      default:
        return <HomePage setCurrentPage={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header setCurrentPage={setCurrentPage} />
      <main className="flex-1">{renderPage()}</main>
      {/* Optional Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">FoodieExpress</h3>
            <p className="text-sm">Your go-to platform for delicious homemade meals from local chefs.</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-white" onClick={() => setCurrentPage("home")}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white" onClick={() => setCurrentPage("meals")}>
                  Browse Meals
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white" onClick={() => setCurrentPage("cart")}>
                  Cart
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white" onClick={() => setCurrentPage("auth")}>
                  Login / Register
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">For Chefs</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-white" onClick={() => setCurrentPage("chef-dashboard")}>
                  Chef Dashboard
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  How it Works
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Become a Chef
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: support@infotact.in</li>
              <li>Phone: +91 9124936538</li>
              <li>Address: Bengaluru, Karnataka, India</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          &copy; {new Date().getFullYear()} FoodieExpress. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
