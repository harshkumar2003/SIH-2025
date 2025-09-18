"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { MapPin, Crosshair } from "lucide-react"

interface LocationPickerProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void
  selectedLocation: { lat: number; lng: number; address: string } | null
}

export default function LocationPicker({ onLocationSelect, selectedLocation }: LocationPickerProps) {
  const [mapCenter, setMapCenter] = useState({ lat: 13.0827, lng: 80.2707 }) // Chennai coordinates
  const [isMapLoaded, setIsMapLoaded] = useState(false)

  // 🔹 Reverse geocoding using OpenStreetMap Nominatim
  async function getAddress(lat: number, lng: number): Promise<string> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        { headers: { "User-Agent": "location-picker-app" } } 
      )
      const data = await response.json()
      return data.display_name || "Address not found"
    } catch (err) {
      console.error("Error fetching address:", err)
      return "Unable to fetch address"
    }
  }

  // Map click handler
  const handleMapClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Convert pixel to lat/lng (mock conversion)
    const lat = mapCenter.lat + (rect.height / 2 - y) * 0.001
    const lng = mapCenter.lng + (x - rect.width / 2) * 0.001

    // 🔹 Fetch actual address
    const address = await getAddress(lat, lng)

    onLocationSelect({ lat, lng, address })
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsMapLoaded(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-4">
      {/* Map Container */}
      <div
        className="relative w-full h-64 bg-muted rounded-lg border-2 border-dashed border-border cursor-crosshair overflow-hidden"
        onClick={handleMapClick}
      >
        {!isMapLoaded ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">Loading map...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Mock map background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200">
              {/* Mock coastline */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
                <path
                  d="M0,200 Q100,180 200,190 T400,200 L400,300 L0,300 Z"
                  fill="#e0f2fe"
                  stroke="#0369a1"
                  strokeWidth="2"
                />
                <path d="M0,200 Q100,180 200,190 T400,200" fill="none" stroke="#0369a1" strokeWidth="3" />
              </svg>

              {/* Mock cities */}
              <div className="absolute top-16 left-20 flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="ml-1 text-xs text-primary font-medium">Chennai</span>
              </div>
              <div className="absolute top-32 right-24 flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="ml-1 text-xs text-primary font-medium">Puducherry</span>
              </div>
            </div>

            {/* Selected location marker */}
            {selectedLocation && (
              <div
                className="absolute transform -translate-x-1/2 -translate-y-full"
                style={{
                  left: `${50 + (selectedLocation.lng - mapCenter.lng) * 1000}%`,
                  top: `${50 - (selectedLocation.lat - mapCenter.lat) * 1000}%`,
                }}
              >
                <MapPin className="h-6 w-6 text-accent drop-shadow-lg" fill="currentColor" />
              </div>
            )}

            {/* Click instruction */}
            <div className="absolute top-2 left-2 bg-background/90 px-2 py-1 rounded text-xs text-muted-foreground flex items-center">
              <Crosshair className="h-3 w-3 mr-1" />
              Click to set location
            </div>
          </>
        )}
      </div>

      {/* Location Info */}
      {selectedLocation && (
        <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-sm">Selected Location</p>
              <p className="text-sm text-muted-foreground">{selectedLocation.address}</p>
              <p className="text-xs text-muted-foreground">
                {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
              </p>
            </div>
            <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
          </div>
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Note: In the full version, this would be an interactive map powered by Mapbox or Leaflet.
      </p>
    </div>
  )
}
