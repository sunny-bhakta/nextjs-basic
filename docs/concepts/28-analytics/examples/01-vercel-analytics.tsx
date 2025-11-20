// Example 1: Vercel Analytics
// Demonstrates Vercel Analytics integration

// ============================================
// Example 1: Basic Vercel Analytics Setup
// File: app/layout.tsx
// ============================================

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

// ============================================
// Example 2: Custom Event Tracking
// File: app/components/AnalyticsButton.tsx
// ============================================

'use client'

import { track } from '@vercel/analytics'

export function AnalyticsButton() {
  const handleClick = () => {
    // Track custom event
    track('button_click', {
      button_name: 'Sign Up',
      location: 'header'
    })
    
    // Your button logic here
    console.log('Button clicked')
  }

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      Sign Up
    </button>
  )
}

// ============================================
// Example 3: Page View Tracking
// File: app/components/PageViewTracker.tsx
// ============================================

'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { track } from '@vercel/analytics'

export function PageViewTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Track page view
    track('page_view', {
      path: pathname,
      timestamp: new Date().toISOString()
    })
  }, [pathname])

  return null
}

// ============================================
// Example 4: Conversion Tracking
// File: app/components/ConversionTracker.tsx
// ============================================

'use client'

import { track } from '@vercel/analytics'

export function ConversionTracker() {
  const handlePurchase = (amount: number, productId: string) => {
    // Track conversion
    track('purchase', {
      value: amount,
      currency: 'USD',
      product_id: productId
    })
  }

  return (
    <button
      onClick={() => handlePurchase(99.99, 'product-123')}
      className="px-4 py-2 bg-green-600 text-white rounded"
    >
      Buy Now
    </button>
  )
}

