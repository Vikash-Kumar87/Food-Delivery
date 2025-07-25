"use client"

import type React from "react"
import { createContext, useState, useContext, useCallback, useMemo } from "react"

// Mock data for meals
const initialMeals = [
  {
    id: "1",
    chefId: "chef1",
    name: "Spicy Chicken Curry",
    description: "A rich and flavorful chicken curry with aromatic spices, served with basmati rice.",
    priceUSD: 2,
    imageUrl: "/spicy-chicken-curry.png",
    availability: true,
    category: "Non-Vegetarian",
    location: "Mumbai",
  },
  {
    id: "2",
    chefId: "chef1",
    name: "Vegetable Biryani",
    description: "Fragrant basmati rice cooked with assorted fresh vegetables and traditional Indian spices.",
    priceUSD: 3.0,
    imageUrl: "/vegetable-biryani.png",
    availability: true,
    category: "Vegetarian",
    location: "Mumbai",
  },
  {
    id: "3",
    chefId: "chef2",
    name: "Paneer Butter Masala",
    description: "Creamy tomato-based gravy with soft paneer cubes, a classic North Indian dish.",
    priceUSD: 3.5,
    imageUrl: "/paneer-butter-masala.png",
    availability: true,
    category: "Vegetarian",
    location: "Delhi",
  },
  {
    id: "4",
    chefId: "chef2",
    name: "Dal Makhani",
    description: "Slow-cooked black lentils in a rich, buttery, and creamy gravy.",
    priceUSD: 2.5,
    imageUrl: "/creamy-dal-makhani.png",
    availability: true,
    category: "Vegetarian",
    location: "Delhi",
  },
]

// Mock user data
const mockUsers = {
  "user@example.com": { password: "password", role: "user", id: "user1" },
  "chef@example.com": { password: "password", role: "chef", id: "chef1" },
  "admin@example.com": { password: "password", role: "admin", id: "admin1" },
}

// Types
export type UserRole = "user" | "chef" | "admin" | null
export type Meal = {
  id: string
  chefId: string
  name: string
  description: string
  priceUSD: number
  imageUrl: string
  availability: boolean
  category: string
  location: string
}
export type CartItem = Meal & { quantity: number }

interface AppContextType {
  isLoggedIn: boolean
  userRole: UserRole
  userId: string | null
  login: (email: string, password: string) => boolean
  register: (email: string, password: string, role: UserRole) => boolean
  logout: () => void
  meals: Meal[]
  addMeal: (meal: Omit<Meal, "id" | "chefId">) => void
  updateMeal: (meal: Meal) => void
  deleteMeal: (id: string) => void
  cartItems: CartItem[]
  addToCart: (meal: Meal) => void
  removeFromCart: (mealId: string) => void
  updateCartItemQuantity: (mealId: string, quantity: number) => void
  clearCart: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<UserRole>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [meals, setMeals] = useState<Meal[]>(initialMeals)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const login = useCallback((email: string, password: string) => {
    const user = mockUsers[email as keyof typeof mockUsers]
    if (user && user.password === password) {
      setIsLoggedIn(true)
      setUserRole(user.role as UserRole)
      setUserId(user.id)
      return true
    }
    return false
  }, [])

  const register = useCallback((email: string, password: string, role: UserRole) => {
    if (mockUsers[email as keyof typeof mockUsers]) {
      console.log("User already exists.")
      return false
    }
    // In a real app, you'd persist this. For mock, just add to memory.
    mockUsers[email as keyof typeof mockUsers] = { password, role: role || "user", id: `newuser-${Date.now()}` }
    console.log("Registered new user:", email, role)
    return true
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
    setUserRole(null)
    setUserId(null)
  }, [])

  const addMeal = useCallback(
    (newMeal: Omit<Meal, "id" | "chefId">) => {
      if (!userId) return // Only chefs can add meals
      const mealWithId: Meal = { ...newMeal, id: String(meals.length + 1), chefId: userId }
      setMeals((prev) => [...prev, mealWithId])
    },
    [meals.length, userId],
  )

  const updateMeal = useCallback((updatedMeal: Meal) => {
    setMeals((prev) => prev.map((meal) => (meal.id === updatedMeal.id ? updatedMeal : meal)))
  }, [])

  const deleteMeal = useCallback((id: string) => {
    setMeals((prev) => prev.filter((meal) => meal.id !== id))
  }, [])

  const addToCart = useCallback((meal: Meal) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === meal.id)
      if (existingItem) {
        return prev.map((item) => (item.id === meal.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prev, { ...meal, quantity: 1 }]
      }
    })
  }, [])

  const removeFromCart = useCallback((mealId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== mealId))
  }, [])

  const updateCartItemQuantity = useCallback((mealId: string, quantity: number) => {
    setCartItems((prev) => prev.map((item) => (item.id === mealId ? { ...item, quantity } : item)))
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  const contextValue = useMemo(
    () => ({
      isLoggedIn,
      userRole,
      userId,
      login,
      register,
      logout,
      meals,
      addMeal,
      updateMeal,
      deleteMeal,
      cartItems,
      addToCart,
      removeFromCart,
      updateCartItemQuantity,
      clearCart,
    }),
    [
      isLoggedIn,
      userRole,
      userId,
      login,
      register,
      logout,
      meals,
      addMeal,
      updateMeal,
      deleteMeal,
      cartItems,
      addToCart,
      removeFromCart,
      updateCartItemQuantity,
      clearCart,
    ],
  )

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider")
  }
  return context
}
