import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import type React from "react"
import { Suspense } from "react"
import I18nProvider from "@/components/i18n-provider"

export const metadata: Metadata = {
  title: "INCOIS Ocean Hazard Reporting Platform",
  description: "Integrated Ocean Hazard Reporting Platform by Indian National Centre for Ocean Information Services",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <I18nProvider>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  )
}
