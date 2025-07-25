"use client"

import type React from "react"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { CartItem as TCartItem } from "@/context/app-context"
import { formatCurrency } from "@/lib/utils"
import { Trash2 } from "lucide-react"

export default function CartItem({
  item,
  onRemove,
  onUpdateQuantity,
}: {
  item: TCartItem
  onRemove: (id: string) => void
  onUpdateQuantity: (id: string, quantity: number) => void
}) {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number.parseInt(e.target.value, 10)
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      onUpdateQuantity(item.id, newQuantity)
    }
  }

  return (
    <div className="flex items-center gap-4 p-4 border-b last:border-b-0">
      <div className="relative w-20 h-20 shrink-0 rounded-md overflow-hidden">
        <Image src={item.imageUrl || "/placeholder.svg"} alt={item.name} layout="fill" objectFit="cover" />
      </div>
      <div className="flex-grow grid gap-1">
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="text-sm text-gray-600">{formatCurrency(item.priceUSD)}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-transparent"
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          -
        </Button>
        <Input
          type="number"
          value={item.quantity}
          onChange={handleQuantityChange}
          className="w-16 text-center"
          min="1"
        />
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-transparent"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        >
          +
        </Button>
      </div>
      <Button variant="ghost" size="icon" onClick={() => onRemove(item.id)} className="shrink-0">
        <Trash2 className="h-5 w-5 text-red-500" />
        <span className="sr-only">Remove</span>
      </Button>
    </div>
  )
}
