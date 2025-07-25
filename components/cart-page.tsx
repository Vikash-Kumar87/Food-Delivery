"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppContext } from "@/context/app-context"
import CartItem from "./cart-item"
import { formatCurrency } from "@/lib/utils"
import { ShoppingCart } from "lucide-react"

export default function CartPage({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const { cartItems, removeFromCart, updateCartItemQuantity } = useAppContext()

  const totalAmount = cartItems.reduce((sum, item) => sum + item.priceUSD * item.quantity, 0)

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-64px)] bg-gray-50 p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-6 w-6" /> Your Cart
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {cartItems.length === 0 ? (
            <div className="p-6 text-center text-gray-600">Your cart is empty.</div>
          ) : (
            <div className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={removeFromCart}
                  onUpdateQuantity={updateCartItemQuantity}
                />
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4 p-6">
          <div className="flex justify-between w-full text-lg font-bold">
            <span>Total:</span>
            <span>{formatCurrency(totalAmount)}</span>
          </div>
          <Button onClick={() => setCurrentPage("checkout")} className="w-full" disabled={cartItems.length === 0}>
            Proceed to Checkout
          </Button>
          <Button onClick={() => setCurrentPage("meals")} variant="outline" className="w-full">
            Continue Shopping
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
