"use client"

import { useState, useEffect } from "react"

export type UserRole = "citizen" | "official" | "admin" | null

interface User {
  email: string
  role: UserRole
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user data on mount
    const storedRole = localStorage.getItem("userRole") as UserRole
    const storedEmail = localStorage.getItem("userEmail")

    if (storedRole && storedEmail) {
      setUser({ email: storedEmail, role: storedRole })
    }

    setIsLoading(false)
  }, [])

  const login = (email: string, role: UserRole) => {
    localStorage.setItem("userRole", role || "")
    localStorage.setItem("userEmail", email)
    setUser({ email, role })
  }

  const logout = () => {
    localStorage.removeItem("userRole")
    localStorage.removeItem("userEmail")
    setUser(null)
  }

  return {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  }
}
