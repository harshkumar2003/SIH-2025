"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import ProtectedRoute from "@/components/protected-route"
import HazardMap from "@/components/hazard-map"
import ReportDetails from "@/components/report-details"
import StatsOverview from "@/components/stats-overview"
import { dummyHazardReports, hazardTypes, severityLevels, type HazardReport } from "@/lib/dummy-data"
import { Filter, RefreshCw, Download, MapPin } from "lucide-react"

interface FilterState {
  hazardType: string
  severity: string
  source: string
  dateRange: string
  status: string
}

export default function DashboardPage() {
  const [reports, setReports] = useState<HazardReport[]>(dummyHazardReports)
  const [filteredReports, setFilteredReports] = useState<HazardReport[]>(dummyHazardReports)
  const [selectedReport, setSelectedReport] = useState<HazardReport | null>(null)
  const [filters, setFilters] = useState<FilterState>({
    hazardType: "all",
    severity: "all",
    source: "all",
    dateRange: "all",
    status: "all",
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Apply filters
  useEffect(() => {
    let filtered = reports

    if (filters.hazardType !== "all") {
      filtered = filtered.filter((report) => report.type === filters.hazardType)
    }

    if (filters.severity !== "all") {
      filtered = filtered.filter((report) => report.severity === filters.severity)
    }

    if (filters.source !== "all") {
      filtered = filtered.filter((report) => report.source === filters.source)
    }

    if (filters.status !== "all") {
      filtered = filtered.filter((report) => report.status === filters.status)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (report) =>
          report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.reportedBy.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredReports(filtered)
  }, [reports, filters, searchTerm])

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const refreshData = async () => {
    setIsLoading(true)
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  const exportData = () => {
    const dataStr = JSON.stringify(filteredReports, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = `hazard-reports-${new Date().toISOString().split("T")[0]}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "text-green-600 bg-green-50 border-green-200"
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "high":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "critical":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "text-green-600 bg-green-50 border-green-200"
      case "pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "false_alarm":
        return "text-gray-600 bg-gray-50 border-gray-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  return (
    <ProtectedRoute requiredRole={["official", "admin"]}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">Dashboard</h1>
              <p className="text-gray-600">Monitor and analyze ocean hazard reports</p>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0">
              <button
                onClick={refreshData}
                disabled={isLoading}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 flex items-center"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </button>
              <button
                onClick={exportData}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <StatsOverview reports={filteredReports} />

          <div className="space-y-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button className="border-b-2 border-blue-500 py-2 px-1 text-sm font-medium text-blue-600">
                  Map View
                </button>
                <button className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  List View
                </button>
              </nav>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Search</label>
                    <input
                      type="text"
                      placeholder="Search reports..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Hazard Type</label>
                    <select
                      value={filters.hazardType}
                      onChange={(e) => handleFilterChange("hazardType", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Types</option>
                      {hazardTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Severity</label>
                    <select
                      value={filters.severity}
                      onChange={(e) => handleFilterChange("severity", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Levels</option>
                      {severityLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Source</label>
                    <select
                      value={filters.source}
                      onChange={(e) => handleFilterChange("source", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Sources</option>
                      <option value="citizen">Citizen</option>
                      <option value="official">Official</option>
                      <option value="social_media">Social Media</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      value={filters.status}
                      onChange={(e) => handleFilterChange("status", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="verified">Verified</option>
                      <option value="false_alarm">False Alarm</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Date Range</label>
                    <select
                      value={filters.dateRange}
                      onChange={(e) => handleFilterChange("dateRange", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-gray-600">
                    Showing {filteredReports.length} of {reports.length} reports
                  </p>
                  <button
                    onClick={() => {
                      setFilters({
                        hazardType: "all",
                        severity: "all",
                        source: "all",
                        dateRange: "all",
                        status: "all",
                      })
                      setSearchTerm("")
                    }}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Map View */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Map */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Hazard Map</h3>
                    <p className="text-sm text-gray-600">Interactive map showing hazard reports and hotspots</p>
                  </div>
                  <div className="p-6">
                    <HazardMap reports={filteredReports} onReportSelect={setSelectedReport} />
                  </div>
                </div>
              </div>

              {/* Report Details */}
              <div>
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Report Details</h3>
                    <p className="text-sm text-gray-600">
                      {selectedReport ? "Click on map markers to view details" : "Select a report to view details"}
                    </p>
                  </div>
                  <div className="p-6">
                    {selectedReport ? (
                      <ReportDetails report={selectedReport} />
                    ) : (
                      <div className="text-center py-8">
                        <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Select a report from the map to view details</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
