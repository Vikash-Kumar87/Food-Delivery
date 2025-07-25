"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAppContext, type UserRole } from "@/context/app-context"

export default function AuthForm({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<UserRole>("user")
  const { login, register } = useAppContext()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (isLogin) {
      const success = login(email, password)
      if (success) {
        setCurrentPage("home")
      } else {
        setError("Invalid email or password.")
      }
    } else {
      const success = register(email, password, role)
      if (success) {
        alert("Registration successful! Please log in.")
        setIsLogin(true)
        setEmail("")
        setPassword("")
      } else {
        setError("Registration failed. User might already exist.")
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>{isLogin ? "Login" : "Register"}</CardTitle>
          <CardDescription>
            {isLogin ? "Enter your credentials to access your account." : "Create a new account."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {!isLogin && (
              <div className="space-y-2">
                <Label>Register as</Label>
                <RadioGroup
                  value={role || "user"}
                  onValueChange={(value: string) => setRole(value as UserRole)}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="user" id="r1" />
                    <Label htmlFor="r1">User</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="chef" id="r2" />
                    <Label htmlFor="r2">Chef</Label>
                  </div>
                </RadioGroup>
              </div>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">
              {isLogin ? "Login" : "Register"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Need an account? Register" : "Already have an account? Login"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
