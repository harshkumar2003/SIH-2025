"use client"

import { useState, useEffect, useRef } from "react"
import type { HazardReport } from "@/lib/dummy-data"
import { Layers, Zap } from "lucide-react"

interface HazardMapProps {
  reports: HazardReport[]
  onReportSelect: (report: HazardReport) => void
}

export default function HazardMap({ reports, onReportSelect }: HazardMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [showHeatmap, setShowHeatmap] = useState(false)
  const [showClusters, setShowClusters] = useState(true)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [leafletLoaded, setLeafletLoaded] = useState(false)

  // Load Leaflet dynamically
  useEffect(() => {
    const loadLeaflet = async () => {
      if (typeof window === "undefined") return

      // Check if Leaflet is already loaded
      if ((window as any).L) {
        setLeafletLoaded(true)
        return
      }

      try {
        // Load Leaflet CSS
        const cssLink = document.createElement("link")
        cssLink.rel = "stylesheet"
        cssLink.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        cssLink.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        cssLink.crossOrigin = ""
        document.head.appendChild(cssLink)

        // Load Leaflet JS
        const script = document.createElement("script")
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        script.crossOrigin = ""

        script.onload = () => {
          setLeafletLoaded(true)
        }

        script.onerror = () => {
          console.error("Failed to load Leaflet")
        }

        document.head.appendChild(script)
      } catch (error) {
        console.error("Error loading Leaflet:", error)
      }
    }

    loadLeaflet()
  }, [])

  // Initialize map
  useEffect(() => {
    if (!leafletLoaded || !mapRef.current || mapInstanceRef.current) return

    const L = (window as any).L
    if (!L) return

    try {
      const map = L.map(mapRef.current).setView([13.0827, 80.2707], 10)

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map)

      mapInstanceRef.current = map
      setIsMapLoaded(true)
    } catch (error) {
      console.error("Error initializing map:", error)
    }
  }, [leafletLoaded])

  // Update markers when reports change
  useEffect(() => {
    if (!mapInstanceRef.current || !leafletLoaded) return

    const L = (window as any).L
    if (!L) return

    markersRef.current.forEach((marker) => {
      mapInstanceRef.current.removeLayer(marker)
    })
    markersRef.current = []

    const getSeverityColor = (severity: string) => {
      switch (severity) {
        case "low":
          return "#22c55e"
        case "medium":
          return "#eab308"
        case "high":
          return "#f97316"
        case "critical":
          return "#ef4444"
        default:
          return "#6b7280"
      }
    }

    reports.forEach((report) => {
      const marker = L.circleMarker([report.location.lat, report.location.lng], {
        radius: 8,
        fillColor: getSeverityColor(report.severity),
        color: "#fff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8,
      })

      const popupContent = `
        <div class="p-2">
          <h3 class="font-semibold text-sm mb-1">${report.type}</h3>
          <p class="text-xs text-gray-600 mb-2">${report.description}</p>
          <div class="flex gap-2 text-xs">
            <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded">${report.severity}</span>
            <span class="px-2 py-1 bg-gray-100 text-gray-800 rounded">${report.status}</span>
          </div>
          <p class="text-xs text-gray-500 mt-1">${report.location.address}</p>
        </div>
      `

      marker.bindPopup(popupContent)
      marker.on("click", () => {
        onReportSelect(report)
      })

      marker.addTo(mapInstanceRef.current)
      markersRef.current.push(marker)
    })
  }, [reports, leafletLoaded, onReportSelect])

  const toggleHeatmap = () => {
    setShowHeatmap(!showHeatmap)
    // In a real implementation, this would toggle a heatmap layer
  }

  const toggleClusters = () => {
    setShowClusters(!showClusters)
    // In a real implementation, this would toggle marker clustering
  }

  return (
    <div className="space-y-4">
      {/* Map Controls */}
      <div className="flex flex-wrap gap-2">
        <button
          className={`px-3 py-1 text-sm rounded-md border transition-colors ${
            showClusters
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
          onClick={toggleClusters}
        >
          <Layers className="h-4 w-4 mr-2 inline" />
          Clustering
        </button>
        <button
          className={`px-3 py-1 text-sm rounded-md border transition-colors ${
            showHeatmap
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
          onClick={toggleHeatmap}
        >
          <Zap className="h-4 w-4 mr-2 inline" />
          Heatmap
        </button>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-96 bg-gray-100 rounded-lg border overflow-hidden">
        {!isMapLoaded ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">
                {!leafletLoaded ? "Loading map library..." : "Initializing map..."}
              </p>
            </div>
          </div>
        ) : null}

        <div ref={mapRef} className="w-full h-full" />
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="font-medium">Severity:</span>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Low</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span>High</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Critical</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        Interactive map powered by Leaflet and OpenStreetMap. Click on markers to view report details.
      </p>
    </div>
  )
}
