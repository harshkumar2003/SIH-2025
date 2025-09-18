"use client"

import type React from "react"

import { useAuth, type UserRole } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: UserRole[]
  redirectTo?: string
}

export default function ProtectedRoute({ children, requiredRole = [], redirectTo = "/login" }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push(redirectTo)
        return
      }

      if (requiredRole.length > 0 && !requiredRole.includes(user.role)) {
        router.push("/unauthorized")
        return
      }
    }
  }, [user, isLoading, router, requiredRole, redirectTo])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || (requiredRole.length > 0 && !requiredRole.includes(user.role))) {
    return null
  }

  return <>{children}</>
}
