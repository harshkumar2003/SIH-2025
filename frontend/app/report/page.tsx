"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import Navbar from "@/components/navbar"
import LocationPicker from "@/components/location-picker"
import MediaUpload from "@/components/media-upload"
import { hazardTypes } from "@/lib/dummy-data"

interface ReportFormData {
  hazardType: string
  description: string
  location: {
    lat: number
    lng: number
    address: string
  } | null
  media: File[]
  severity: string
}

export default function ReportPage() {
  const [formData, setFormData] = useState<ReportFormData>({
    hazardType: "",
    description: "",
    location: null,
    media: [],
    severity: "medium",
  })
  const [isOnline, setIsOnline] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLocationLoading, setIsLocationLoading] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const { t } = useTranslation()

  // Check online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    setIsOnline(navigator.onLine)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  // Auto-detect location
  const getCurrentLocation = () => {
    setIsLocationLoading(true)
    setError("")

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser")
      setIsLocationLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords

        try {
          // Mock reverse geocoding (in real app, use proper geocoding service)
          const address = `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`

          setFormData((prev) => ({
            ...prev,
            location: {
              lat: latitude,
              lng: longitude,
              address,
            },
          }))

          setSuccessMessage("Location detected successfully")
          setTimeout(() => setSuccessMessage(""), 3000)
        } catch (err) {
          setError("Failed to get address for your location")
        } finally {
          setIsLocationLoading(false)
        }
      },
      (error) => {
        setError("Unable to retrieve your location. Please select manually on the map.")
        setIsLocationLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      },
    )
  }

  const handleLocationSelect = (location: { lat: number; lng: number; address: string }) => {
    setFormData((prev) => ({ ...prev, location }))
  }

  const handleMediaUpload = (files: File[]) => {
    setFormData((prev) => ({ ...prev, media: files }))
  }

  const saveToLocalStorage = (data: ReportFormData) => {
    const offlineReports = JSON.parse(localStorage.getItem("offlineReports") || "[]")
    const newReport = {
      ...data,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      status: "offline",
    }
    offlineReports.push(newReport)
    localStorage.setItem("offlineReports", JSON.stringify(offlineReports))
  }

  const syncOfflineReports = async () => {
    const offlineReports = JSON.parse(localStorage.getItem("offlineReports") || "[]")
    if (offlineReports.length === 0) return

    try {
      // Mock API sync (in real app, send to backend)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      localStorage.removeItem("offlineReports")
      setSuccessMessage(`${offlineReports.length} offline reports have been submitted`)
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (err) {
      console.error("Failed to sync offline reports:", err)
    }
  }

  // Sync offline reports when coming back online
  useEffect(() => {
    if (isOnline) {
      syncOfflineReports()
    }
  }, [isOnline])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    // Validation
    if (!formData.hazardType || !formData.description || !formData.location) {
      setError("Please fill in all required fields and select a location")
      setIsSubmitting(false)
      return
    }

    try {
      if (isOnline) {
        // Mock API submission
        await new Promise((resolve) => setTimeout(resolve, 2000))

        setSuccessMessage(t("report.success"))
        setTimeout(() => setSuccessMessage(""), 5000)

        // Reset form
        setFormData({
          hazardType: "",
          description: "",
          location: null,
          media: [],
          severity: "medium",
        })
      } else {
        // Save offline
        saveToLocalStorage(formData)

        setSuccessMessage(t("report.offline"))
        setTimeout(() => setSuccessMessage(""), 5000)

        // Reset form
        setFormData({
          hazardType: "",
          description: "",
          location: null,
          media: [],
          severity: "medium",
        })
      }
    } catch (err) {
      setError("Failed to submit report. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-ocean-700 mb-2">{t("report.title")}</h1>
          <p className="text-gray-600">Help protect coastal communities by reporting ocean hazards you observe</p>

          <div className="flex justify-center mt-4">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                isOnline ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
              }`}
            >
              {isOnline ? (
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {isOnline ? "Online" : "Offline Mode"}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Hazard Details</h2>
              <p className="text-gray-600">Provide information about the ocean hazard you observed</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {successMessage && (
                <div className="bg-green-50 border border-green-200 rounded-md p-3">
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-green-800 text-sm">{successMessage}</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="hazardType" className="block text-sm font-medium text-gray-700">
                  {t("report.hazardType")} <span className="text-red-500">*</span>
                </label>
                <select
                  id="hazardType"
                  value={formData.hazardType}
                  onChange={(e) => setFormData((prev) => ({ ...prev, hazardType: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                  required
                >
                  <option value="">Select hazard type</option>
                  {hazardTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="severity" className="block text-sm font-medium text-gray-700">
                  Severity Level
                </label>
                <select
                  id="severity"
                  value={formData.severity}
                  onChange={(e) => setFormData((prev) => ({ ...prev, severity: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                >
                  <option value="low">Low - Minor concern</option>
                  <option value="medium">Medium - Moderate risk</option>
                  <option value="high">High - Significant danger</option>
                  <option value="critical">Critical - Immediate threat</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  {t("report.description")} <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  placeholder="Describe what you observed in detail (e.g., wave height, water behavior, timing, etc.)"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {t("report.location")} <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    disabled={isLocationLoading}
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {isLocationLoading ? "Getting Location..." : "Use Current Location"}
                  </button>
                  {formData.location && (
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="h-4 w-4 mr-1 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Location set
                    </div>
                  )}
                </div>
                {formData.location && (
                  <div className="p-3 bg-gray-50 rounded-lg text-sm">
                    <p className="font-medium">Selected Location:</p>
                    <p>{formData.location.address}</p>
                    <p className="text-gray-500">
                      {formData.location.lat.toFixed(4)}, {formData.location.lng.toFixed(4)}
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">{t("report.media")}</label>
                <MediaUpload onFilesChange={handleMediaUpload} maxFiles={5} />
                {formData.media.length > 0 && (
                  <p className="text-sm text-gray-500">{formData.media.length} file(s) selected</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer w-full bg-ocean-600 text-black py-2 px-4 rounded-md hover:bg-ocean-700 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
                {isSubmitting ? "Submitting..." : isOnline ? t("report.submit") : "Save Offline"}
              </button>

              {!isOnline && (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-blue-800 text-sm">
                      You're offline. Your report will be saved locally and submitted automatically when you're back
                      online.
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Map */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Select Location</h2>
              <p className="text-gray-600">Click on the map to set the hazard location</p>
            </div>
            <LocationPicker onLocationSelect={handleLocationSelect} selectedLocation={formData.location} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Reporting Guidelines</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-medium mb-2">What to Report:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Unusual wave heights or patterns</li>
                <li>• Rapid changes in sea level</li>
                <li>• Abnormal sea behavior or color</li>
                <li>• Coastal flooding or erosion</li>
                <li>• Storm surge conditions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Safety First:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Report from a safe distance</li>
                <li>• Don't risk your safety for photos</li>
                <li>• Follow local evacuation orders</li>
                <li>• Contact emergency services if immediate danger</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
