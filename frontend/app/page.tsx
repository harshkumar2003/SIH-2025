"use client"

import Link from "next/link"
import { useTranslation } from "react-i18next"
import Navbar from "@/components/navbar"
import AlertBanner from "@/components/alert-banner"

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alert Banner */}
        <AlertBanner
          message="High wave alert for Chennai and Puducherry coastlines. Exercise caution near beaches."
          type="warning"
        />

        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-ocean-100 p-4 rounded-full">
              <svg className="h-16 w-16 text-ocean-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.934 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732L9.854 7.2l1.179-4.456A1 1 0 0112 2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-ocean-700 mb-4 text-balance">{t("landing.title")}</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto text-pretty">
            {t("landing.subtitle")} - {t("landing.description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/report"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-black bg-ocean-600 hover:bg-ocean-700 rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {t("landing.reportButton")}
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-ocean-600 bg-white hover:bg-gray-50 border-2 border-ocean-600 rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {t("landing.dashboardButton")}
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <svg className="h-12 w-12 text-ocean-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("landing.features.realtime")}</h3>
            <p className="text-gray-600 mb-4">{t("landing.features.realtimeDesc")}</p>
            <p className="text-sm text-gray-500">
              Simple forms with GPS location, photo uploads, and offline support for reliable reporting
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <svg className="h-12 w-12 text-ocean-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("landing.features.community")}</h3>
            <p className="text-gray-600 mb-4">{t("landing.features.communityDesc")}</p>
            <p className="text-sm text-gray-500">
              Dynamic clustering, heatmaps, and filtering for comprehensive situational awareness
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <svg className="h-12 w-12 text-ocean-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t("landing.features.analytics")}</h3>
            <p className="text-gray-600 mb-4">{t("landing.features.analyticsDesc")}</p>
            <p className="text-sm text-gray-500">
              NLP-powered sentiment analysis and keyword tracking across social platforms
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <div className="flex items-center mb-6">
            <svg className="mr-2 h-5 w-5 text-ocean-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <p className="text-gray-600 mb-6">Latest hazard reports and system updates</p>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">High waves reported at Marina Beach</p>
                <p className="text-sm text-gray-500">Chennai, Tamil Nadu • 2 hours ago</p>
              </div>
              <div className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">High</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Coastal flooding in Puducherry</p>
                <p className="text-sm text-gray-500">Puducherry • 4 hours ago</p>
              </div>
              <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">Medium</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Abnormal sea behavior observed</p>
                <p className="text-sm text-gray-500">Kanyakumari • 6 hours ago</p>
              </div>
              <div className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">Critical</div>
            </div>
          </div>
        </div>

        {/* About INCOIS */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-ocean-700 mb-4">About INCOIS</h2>
          <p className="text-gray-600 max-w-4xl mx-auto text-pretty">
            The Indian National Centre for Ocean Information Services (INCOIS) is an autonomous organization under the
            Ministry of Earth Sciences, Government of India. We provide ocean information and advisory services to
            society, industry, government agencies, and the scientific community through sustained ocean observations
            and constant improvement in ocean modeling capabilities.
          </p>
        </div>
      </main>
    </div>
  )
}
