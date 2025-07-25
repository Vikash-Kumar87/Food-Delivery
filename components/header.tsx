"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, UtensilsCrossed } from "lucide-react"
import { useAppContext } from "@/context/app-context"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"

export default function Header({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const { isLoggedIn, userRole, logout, cartItems } = useAppContext()
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const navLinks = [
    { name: "Home", page: "home" },
    { name: "Meals", page: "meals" },
  ]

  if (isLoggedIn) {
    if (userRole === "chef") {
      navLinks.push({ name: "Chef Dashboard", page: "chef-dashboard" })
    } else if (userRole === "admin") {
      navLinks.push({ name: "Admin Panel", page: "admin-panel" })
    }
  }

  return (
    <header className="bg-white shadow-sm py-4 px-4 md:px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-bold text-primary"
          onClick={() => setCurrentPage("home")}
        >
          <UtensilsCrossed className="h-6 w-6" />
          <span>FoodieExpress</span>
        </Link>
      </div>
      <nav className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <Button key={link.name} variant="ghost" onClick={() => setCurrentPage(link.page)}>
            {link.name}
          </Button>
        ))}
        <Button variant="ghost" onClick={() => setCurrentPage("cart")} className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalCartItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs">
              {totalCartItems}
            </span>
          )}
          <span className="sr-only">Cart</span>
        </Button>
        {isLoggedIn ? (
          <Button onClick={logout} variant="outline">
            Logout
          </Button>
        ) : (
          <Button onClick={() => setCurrentPage("auth")} variant="default">
            Login / Register
          </Button>
        )}
      </nav>
      <Sheet>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-64 p-4">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Button
                key={link.name}
                variant="ghost"
                className="justify-start"
                onClick={() => setCurrentPage(link.page)}
              >
                {link.name}
              </Button>
            ))}
            <Button variant="ghost" className="justify-start relative" onClick={() => setCurrentPage("cart")}>
              <ShoppingCart className="h-5 w-5 mr-2" />
              Cart
              {totalCartItems > 0 && (
                <span className="absolute right-4 bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {totalCartItems}
                </span>
              )}
            </Button>
            {isLoggedIn ? (
              <Button onClick={logout} variant="outline" className="justify-start bg-transparent">
                Logout
              </Button>
            ) : (
              <Button onClick={() => setCurrentPage("auth")} variant="default" className="justify-start">
                Login / Register
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
