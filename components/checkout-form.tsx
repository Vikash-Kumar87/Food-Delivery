"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAppContext } from "@/context/app-context"
import { formatCurrency } from "@/lib/utils"
import { CreditCard, MapPin, Truck } from "lucide-react"

export default function CheckoutForm({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const { cartItems, clearCart } = useAppContext()
  const [address, setAddress] = useState("")
  const [deliveryMode, setDeliveryMode] = useState("delivery")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isProcessing, setIsProcessing] = useState(false)

  const totalAmount = cartItems.reduce((sum, item) => sum + item.priceUSD * item.quantity, 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    // Simulate order processing
    setTimeout(() => {
      alert("Order placed successfully!")
      clearCart()
      setIsProcessing(false)
      setCurrentPage("order-tracking")
    }, 1500)
  }

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-64px)] bg-gray-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5" /> Delivery Address
            </h3>
            <Textarea
              placeholder="Enter your full delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Truck className="h-5 w-5" /> Delivery Mode
            </h3>
            <RadioGroup value={deliveryMode} onValueChange={setDeliveryMode} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="delivery" id="delivery" />
                <Label htmlFor="delivery">Delivery</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pickup" id="pickup" />
                <Label htmlFor="pickup">Pickup</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <CreditCard className="h-5 w-5" /> Payment Method
            </h3>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card">Credit/Debit Card</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="upi" id="upi" />
                <Label htmlFor="upi">UPI</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod">Cash on Delivery</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex justify-between text-xl font-bold border-t pt-4">
            <span>Order Total:</span>
            <span>{formatCurrency(totalAmount)}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} className="w-full" disabled={isProcessing || cartItems.length === 0}>
            {isProcessing ? "Processing Order..." : "Place Order"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
