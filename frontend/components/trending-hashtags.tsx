"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import type { SocialMediaPost } from "@/lib/dummy-data"
import { TrendingUp, Hash, Clock } from "lucide-react"

interface TrendingHashtagsProps {
  posts: SocialMediaPost[]
}

export default function TrendingHashtags({ posts }: TrendingHashtagsProps) {
  // Mock trending data (in real app, this would come from time-series analysis)
  const trendingHashtags = [
    { hashtag: "#ChennaiFloods", mentions: 245, trend: "+15%", color: "text-red-600 bg-red-50 border-red-200" },
    { hashtag: "#Tsunami", mentions: 189, trend: "+8%", color: "text-orange-600 bg-orange-50 border-orange-200" },
    { hashtag: "#HighWaves", mentions: 156, trend: "+12%", color: "text-yellow-600 bg-yellow-50 border-yellow-200" },
    { hashtag: "#CoastalAlert", mentions: 134, trend: "+5%", color: "text-blue-600 bg-blue-50 border-blue-200" },
    { hashtag: "#WeatherWarning", mentions: 98, trend: "+3%", color: "text-green-600 bg-green-50 border-green-200" },
  ]

  // Mock time series data for trending chart
  const trendData = [
    { time: "00:00", ChennaiFloods: 20, Tsunami: 15, HighWaves: 12 },
    { time: "04:00", ChennaiFloods: 35, Tsunami: 22, HighWaves: 18 },
    { time: "08:00", ChennaiFloods: 45, Tsunami: 28, HighWaves: 25 },
    { time: "12:00", ChennaiFloods: 65, Tsunami: 35, HighWaves: 32 },
    { time: "16:00", ChennaiFloods: 85, Tsunami: 45, HighWaves: 38 },
    { time: "20:00", ChennaiFloods: 95, Tsunami: 52, HighWaves: 42 },
  ]

  // Recent trending topics
  const recentTrends = [
    {
      topic: "Abnormal sea behavior in Kanyakumari",
      mentions: 67,
      timeAgo: "2 hours ago",
      sentiment: "negative",
    },
    {
      topic: "High tide warnings for Mumbai coast",
      mentions: 45,
      timeAgo: "4 hours ago",
      sentiment: "negative",
    },
    {
      topic: "Fishermen safety advisory issued",
      mentions: 38,
      timeAgo: "6 hours ago",
      sentiment: "neutral",
    },
    {
      topic: "Coastal evacuation procedures",
      mentions: 29,
      timeAgo: "8 hours ago",
      sentiment: "neutral",
    },
  ]

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-600"
      case "negative":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Hash className="h-5 w-5 mr-2" />
              Trending Hashtags
            </CardTitle>
            <CardDescription>Most popular hashtags in the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {trendingHashtags.map((item, index) => (
                <div key={item.hashtag} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                    <div>
                      <Badge className={item.color}>{item.hashtag}</Badge>
                      <p className="text-xs text-muted-foreground mt-1">{item.mentions} mentions</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-medium">{item.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Recent Trends
            </CardTitle>
            <CardDescription>Emerging topics and discussions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTrends.map((trend, index) => (
                <div key={index} className="p-3 bg-muted rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{trend.topic}</h4>
                    <Badge variant="outline" className="text-xs">
                      {trend.mentions}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{trend.timeAgo}</span>
                    <span className={getSentimentColor(trend.sentiment)}>{trend.sentiment}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hashtag Trends Over Time</CardTitle>
          <CardDescription>Trending hashtag mentions throughout the day</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              ChennaiFloods: {
                label: "#ChennaiFloods",
                color: "#ef4444",
              },
              Tsunami: {
                label: "#Tsunami",
                color: "#f97316",
              },
              HighWaves: {
                label: "#HighWaves",
                color: "#eab308",
              },
            }}
            className="h-64"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="ChennaiFloods"
                  stroke="var(--color-ChennaiFloods)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line type="monotone" dataKey="Tsunami" stroke="var(--color-Tsunami)" strokeWidth={2} dot={{ r: 4 }} />
                <Line
                  type="monotone"
                  dataKey="HighWaves"
                  stroke="var(--color-HighWaves)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
