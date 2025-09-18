"use client"

import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertTriangle, X } from "lucide-react"

interface AlertBannerProps {
  message: string
  type?: "warning" | "danger" | "info"
  dismissible?: boolean
}

export default function AlertBanner({ message, type = "warning", dismissible = true }: AlertBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const getAlertStyles = () => {
    switch (type) {
      case "danger":
        return "border-accent bg-accent/10 text-accent-foreground"
      case "info":
        return "border-primary bg-primary/10 text-primary-foreground"
      default:
        return "border-yellow-500 bg-yellow-50 text-yellow-800"
    }
  }

  return (
    <Alert className={`${getAlertStyles()} mb-4`}>
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span>{message}</span>
        {dismissible && (
          <Button variant="ghost" size="sm" onClick={() => setIsVisible(false)} className="ml-4 h-auto p-1">
            <X className="h-4 w-4" />
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
}
