"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import type { SocialMediaPost } from "@/lib/dummy-data"

interface SentimentChartProps {
  posts: SocialMediaPost[]
}

export default function SentimentChart({ posts }: SentimentChartProps) {
  // Calculate sentiment data
  const sentimentData = [
    {
      name: "Positive",
      value: posts.filter((p) => p.sentiment === "positive").length,
      color: "#22c55e",
    },
    {
      name: "Neutral",
      value: posts.filter((p) => p.sentiment === "neutral").length,
      color: "#6b7280",
    },
    {
      name: "Negative",
      value: posts.filter((p) => p.sentiment === "negative").length,
      color: "#ef4444",
    },
  ]

  // Calculate platform sentiment breakdown
  const platformSentiment = ["twitter", "facebook", "youtube"].map((platform) => {
    const platformPosts = posts.filter((p) => p.platform === platform)
    return {
      platform: platform.charAt(0).toUpperCase() + platform.slice(1),
      positive: platformPosts.filter((p) => p.sentiment === "positive").length,
      neutral: platformPosts.filter((p) => p.sentiment === "neutral").length,
      negative: platformPosts.filter((p) => p.sentiment === "negative").length,
    }
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Overall Sentiment Distribution</CardTitle>
          <CardDescription>Breakdown of sentiment across all posts</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              positive: {
                label: "Positive",
                color: "#22c55e",
              },
              neutral: {
                label: "Neutral",
                color: "#6b7280",
              },
              negative: {
                label: "Negative",
                color: "#ef4444",
              },
            }}
            className="h-64"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sentiment by Platform</CardTitle>
          <CardDescription>Compare sentiment distribution across social media platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              positive: {
                label: "Positive",
                color: "#22c55e",
              },
              neutral: {
                label: "Neutral",
                color: "#6b7280",
              },
              negative: {
                label: "Negative",
                color: "#ef4444",
              },
            }}
            className="h-64"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformSentiment}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="platform" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="positive" stackId="a" fill="var(--color-positive)" />
                <Bar dataKey="neutral" stackId="a" fill="var(--color-neutral)" />
                <Bar dataKey="negative" stackId="a" fill="var(--color-negative)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
