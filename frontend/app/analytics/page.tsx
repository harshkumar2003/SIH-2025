"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"
import ProtectedRoute from "@/components/protected-route"
import SocialFeed from "@/components/social-feed"
import SentimentChart from "@/components/sentiment-chart"
import KeywordCloud from "@/components/keyword-cloud"
import TrendingHashtags from "@/components/trending-hashtags"
import { dummySocialMediaPosts, hazardTypes, type SocialMediaPost } from "@/lib/dummy-data"
import { Search, RefreshCw, Download, TrendingUp, MessageCircle, Hash, BarChart3 } from "lucide-react"

interface AnalyticsFilters {
  platform: string
  location: string
  hazardType: string
  sentiment: string
  dateRange: string
}

export default function AnalyticsPage() {
  const [posts, setPosts] = useState<SocialMediaPost[]>(dummySocialMediaPosts)
  const [filteredPosts, setFilteredPosts] = useState<SocialMediaPost[]>(dummySocialMediaPosts)
  const [filters, setFilters] = useState<AnalyticsFilters>({
    platform: "all",
    location: "all",
    hazardType: "all",
    sentiment: "all",
    dateRange: "all",
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isRealTime, setIsRealTime] = useState(false)

  // Apply filters
  useEffect(() => {
    let filtered = posts

    if (filters.platform !== "all") {
      filtered = filtered.filter((post) => post.platform === filters.platform)
    }

    if (filters.sentiment !== "all") {
      filtered = filtered.filter((post) => post.sentiment === filters.sentiment)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.keywords.some((keyword) => keyword.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    setFilteredPosts(filtered)
  }, [posts, filters, searchTerm])

  // Mock real-time updates
  useEffect(() => {
    if (!isRealTime) return

    const interval = setInterval(() => {
      // Mock new post
      const newPost: SocialMediaPost = {
        id: Date.now().toString(),
        platform: ["twitter", "facebook", "youtube"][Math.floor(Math.random() * 3)] as any,
        content: "New social media post about ocean conditions...",
        author: `@user${Math.floor(Math.random() * 1000)}`,
        timestamp: new Date().toISOString(),
        sentiment: ["positive", "negative", "neutral"][Math.floor(Math.random() * 3)] as any,
        keywords: ["waves", "ocean", "weather"],
        engagement: {
          likes: Math.floor(Math.random() * 100),
          shares: Math.floor(Math.random() * 50),
          comments: Math.floor(Math.random() * 25),
        },
      }

      setPosts((prev) => [newPost, ...prev.slice(0, 49)]) // Keep only 50 posts
    }, 10000) // New post every 10 seconds

    return () => clearInterval(interval)
  }, [isRealTime])

  const handleFilterChange = (key: keyof AnalyticsFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const refreshData = async () => {
    setIsLoading(true)
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  const exportData = () => {
    const dataStr = JSON.stringify(filteredPosts, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = `social-media-analytics-${new Date().toISOString().split("T")[0]}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  // Calculate analytics
  const totalPosts = filteredPosts.length
  const totalEngagement = filteredPosts.reduce(
    (sum, post) => sum + post.engagement.likes + post.engagement.shares + post.engagement.comments,
    0,
  )
  const sentimentBreakdown = {
    positive: filteredPosts.filter((p) => p.sentiment === "positive").length,
    negative: filteredPosts.filter((p) => p.sentiment === "negative").length,
    neutral: filteredPosts.filter((p) => p.sentiment === "neutral").length,
  }

  return (
    <ProtectedRoute requiredRole={["official", "admin"]}>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-primary">Social Media Analytics</h1>
              <p className="text-muted-foreground">Monitor social media for early hazard detection and sentiment</p>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0">
              <Button
                variant={isRealTime ? "default" : "outline"}
                onClick={() => setIsRealTime(!isRealTime)}
                className="relative"
              >
                {isRealTime && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                )}
                <TrendingUp className="h-4 w-4 mr-2" />
                {isRealTime ? "Live" : "Start Live"}
              </Button>
              <Button onClick={refreshData} disabled={isLoading} variant="outline">
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button onClick={exportData} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalPosts}</div>
                <p className="text-xs text-muted-foreground">Across all platforms</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Engagement</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalEngagement.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Likes, shares, comments</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Negative Sentiment</CardTitle>
                <BarChart3 className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{sentimentBreakdown.negative}</div>
                <p className="text-xs text-muted-foreground">
                  {totalPosts > 0 ? Math.round((sentimentBreakdown.negative / totalPosts) * 100) : 0}% of posts
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top Keywords</CardTitle>
                <Hash className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {filteredPosts.flatMap((p) => p.keywords).filter((k, i, arr) => arr.indexOf(k) === i).length}
                </div>
                <p className="text-xs text-muted-foreground">Unique keywords detected</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="h-5 w-5 mr-2" />
                Filters & Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                <div className="space-y-2">
                  <Label>Search</Label>
                  <Input
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Platform</Label>
                  <Select value={filters.platform} onValueChange={(value) => handleFilterChange("platform", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Platforms</SelectItem>
                      <SelectItem value="twitter">Twitter/X</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="youtube">YouTube</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Sentiment</Label>
                  <Select value={filters.sentiment} onValueChange={(value) => handleFilterChange("sentiment", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sentiments</SelectItem>
                      <SelectItem value="positive">Positive</SelectItem>
                      <SelectItem value="neutral">Neutral</SelectItem>
                      <SelectItem value="negative">Negative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <Select value={filters.location} onValueChange={(value) => handleFilterChange("location", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="chennai">Chennai</SelectItem>
                      <SelectItem value="mumbai">Mumbai</SelectItem>
                      <SelectItem value="kolkata">Kolkata</SelectItem>
                      <SelectItem value="kochi">Kochi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Hazard Type</Label>
                  <Select value={filters.hazardType} onValueChange={(value) => handleFilterChange("hazardType", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {hazardTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Date Range</Label>
                  <Select value={filters.dateRange} onValueChange={(value) => handleFilterChange("dateRange", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredPosts.length} of {posts.length} posts
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFilters({
                      platform: "all",
                      location: "all",
                      hazardType: "all",
                      sentiment: "all",
                      dateRange: "all",
                    })
                    setSearchTerm("")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="feed" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="feed">Social Feed</TabsTrigger>
              <TabsTrigger value="sentiment">Sentiment Analysis</TabsTrigger>
              <TabsTrigger value="keywords">Keywords</TabsTrigger>
              <TabsTrigger value="trends">Trending</TabsTrigger>
            </TabsList>

            <TabsContent value="feed">
              <SocialFeed posts={filteredPosts} />
            </TabsContent>

            <TabsContent value="sentiment">
              <div className="grid lg:grid-cols-2 gap-6">
                <SentimentChart posts={filteredPosts} />
                <Card>
                  <CardHeader>
                    <CardTitle>Sentiment Breakdown</CardTitle>
                    <CardDescription>Distribution of sentiment across posts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Positive</span>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{sentimentBreakdown.positive}</div>
                          <div className="text-xs text-muted-foreground">
                            {totalPosts > 0 ? Math.round((sentimentBreakdown.positive / totalPosts) * 100) : 0}%
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                          <span className="text-sm">Neutral</span>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{sentimentBreakdown.neutral}</div>
                          <div className="text-xs text-muted-foreground">
                            {totalPosts > 0 ? Math.round((sentimentBreakdown.neutral / totalPosts) * 100) : 0}%
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-sm">Negative</span>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{sentimentBreakdown.negative}</div>
                          <div className="text-xs text-muted-foreground">
                            {totalPosts > 0 ? Math.round((sentimentBreakdown.negative / totalPosts) * 100) : 0}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="keywords">
              <KeywordCloud posts={filteredPosts} />
            </TabsContent>

            <TabsContent value="trends">
              <TrendingHashtags posts={filteredPosts} />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </ProtectedRoute>
  )
}
