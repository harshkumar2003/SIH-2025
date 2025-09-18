"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { SocialMediaPost } from "@/lib/dummy-data"
import { Heart, Share, MessageCircle, ExternalLink, MapPin, Clock } from "lucide-react"

interface SocialFeedProps {
  posts: SocialMediaPost[]
}

export default function SocialFeed({ posts }: SocialFeedProps) {
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "twitter":
        return "𝕏"
      case "facebook":
        return "f"
      case "youtube":
        return "▶"
      default:
        return "📱"
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "twitter":
        return "bg-black text-white"
      case "facebook":
        return "bg-blue-600 text-white"
      case "youtube":
        return "bg-red-600 text-white"
      default:
        return "bg-gray-600 text-white"
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-600 bg-green-50 border-green-200"
      case "negative":
        return "text-red-600 bg-red-50 border-red-200"
      case "neutral":
        return "text-gray-600 bg-gray-50 border-gray-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k"
    }
    return num.toString()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Social Media Feed</h2>
        <p className="text-sm text-muted-foreground">{posts.length} posts</p>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getPlatformColor(post.platform)}`}
                  >
                    {getPlatformIcon(post.platform)}
                  </div>
                  <div>
                    <p className="font-medium">{post.author}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {new Date(post.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getSentimentColor(post.sentiment)}>{post.sentiment}</Badge>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="mb-3">
                <p className="text-sm leading-relaxed">{post.content}</p>
              </div>

              {/* Location */}
              {post.location && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                  <MapPin className="h-3 w-3" />
                  {post.location.address}
                </div>
              )}

              {/* Keywords */}
              <div className="flex flex-wrap gap-1 mb-3">
                {post.keywords.map((keyword, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    #{keyword}
                  </Badge>
                ))}
              </div>

              {/* Engagement */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground border-t pt-3">
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  {formatNumber(post.engagement.likes)}
                </div>
                <div className="flex items-center gap-1">
                  <Share className="h-4 w-4" />
                  {formatNumber(post.engagement.shares)}
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  {formatNumber(post.engagement.comments)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {posts.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No social media posts match your current filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
