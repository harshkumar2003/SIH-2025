"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { SocialMediaPost } from "@/lib/dummy-data"

interface KeywordCloudProps {
  posts: SocialMediaPost[]
}

export default function KeywordCloud({ posts }: KeywordCloudProps) {
  // Extract and count keywords
  const keywordCounts = posts
    .flatMap((post) => post.keywords)
    .reduce(
      (acc, keyword) => {
        acc[keyword] = (acc[keyword] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

  // Sort keywords by frequency
  const sortedKeywords = Object.entries(keywordCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 50) // Top 50 keywords

  // Get font size based on frequency
  const getFontSize = (count: number, maxCount: number) => {
    const minSize = 12
    const maxSize = 24
    const ratio = count / maxCount
    return Math.floor(minSize + ratio * (maxSize - minSize))
  }

  const maxCount = Math.max(...Object.values(keywordCounts))

  // Get color based on frequency
  const getColor = (count: number, maxCount: number) => {
    const ratio = count / maxCount
    if (ratio > 0.7) return "text-red-600 bg-red-50 border-red-200"
    if (ratio > 0.4) return "text-orange-600 bg-orange-50 border-orange-200"
    if (ratio > 0.2) return "text-yellow-600 bg-yellow-50 border-yellow-200"
    return "text-blue-600 bg-blue-50 border-blue-200"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Keyword Cloud</CardTitle>
          <CardDescription>Most frequently mentioned keywords in social media posts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {sortedKeywords.map(([keyword, count]) => (
              <Badge
                key={keyword}
                className={`${getColor(count, maxCount)} cursor-pointer hover:scale-105 transition-transform`}
                style={{ fontSize: `${getFontSize(count, maxCount)}px` }}
              >
                #{keyword} ({count})
              </Badge>
            ))}
          </div>

          {sortedKeywords.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No keywords found in current posts</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Keywords</CardTitle>
          <CardDescription>Most mentioned keywords with frequency counts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {sortedKeywords.slice(0, 10).map(([keyword, count], index) => (
              <div key={keyword} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                  <span className="font-medium">#{keyword}</span>
                </div>
                <Badge variant="outline">{count} mentions</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
