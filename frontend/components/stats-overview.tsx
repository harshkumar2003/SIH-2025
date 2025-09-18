"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { HazardReport } from "@/lib/dummy-data"
import { AlertTriangle, CheckCircle, Clock, TrendingUp, MapPin, Users } from "lucide-react"

interface StatsOverviewProps {
  reports: HazardReport[]
}

export default function StatsOverview({ reports }: StatsOverviewProps) {
  const totalReports = reports.length
  const verifiedReports = reports.filter((r) => r.status === "verified").length
  const pendingReports = reports.filter((r) => r.status === "pending").length
  const criticalReports = reports.filter((r) => r.severity === "critical").length
  const citizenReports = reports.filter((r) => r.source === "citizen").length
  const socialMediaReports = reports.filter((r) => r.source === "social_media").length

  const stats = [
    {
      title: "Total Reports",
      value: totalReports,
      description: "All hazard reports",
      icon: AlertTriangle,
      color: "text-primary",
    },
    {
      title: "Verified",
      value: verifiedReports,
      description: "Confirmed hazards",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Pending Review",
      value: pendingReports,
      description: "Awaiting verification",
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      title: "Critical",
      value: criticalReports,
      description: "High priority alerts",
      icon: TrendingUp,
      color: "text-red-600",
    },
    {
      title: "Citizen Reports",
      value: citizenReports,
      description: "Community submitted",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Social Media",
      value: socialMediaReports,
      description: "From social platforms",
      icon: MapPin,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
