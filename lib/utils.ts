import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Approximate conversion rate: 1 USD = 83.3 INR (as of mid-2024, for demonstration)
const USD_TO_INR_RATE = 83

export function formatCurrency(amountUSD: number): string {
  const amountINR = amountUSD * USD_TO_INR_RATE
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amountINR)
}
