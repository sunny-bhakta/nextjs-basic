// Example 2: Google Analytics
// Demonstrates Google Analytics integration

// ============================================
// Example 1: Google Analytics Setup
// File: app/layout.tsx
// ============================================

import Script from 'next/script'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}

// ============================================
// Example 2: Page View Tracking
// File: app/components/GoogleAnalytics.tsx
// ============================================

'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

export function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
        page_path: url,
      })
    }
  }, [pathname, searchParams])

  return null
}

// ============================================
// Example 3: Event Tracking
// File: app/lib/gtag.ts
// ============================================

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || ''

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// ============================================
// Example 4: Usage in Components
// File: app/components/TrackedButton.tsx
// ============================================

'use client'

import { event } from '@/app/lib/gtag'

export function TrackedButton() {
  const handleClick = () => {
    // Track button click
    event({
      action: 'click',
      category: 'button',
      label: 'Sign Up Button',
    })
    
    // Your button logic
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
// Example 5: E-commerce Tracking
// File: app/components/PurchaseTracker.tsx
// ============================================

'use client'

import { event } from '@/app/lib/gtag'

export function PurchaseTracker() {
  const handlePurchase = (productId: string, price: number) => {
    // Track purchase
    event({
      action: 'purchase',
      category: 'ecommerce',
      label: productId,
      value: price,
    })
    
    // Additional GA4 ecommerce tracking
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: Date.now().toString(),
        value: price,
        currency: 'USD',
        items: [
          {
            item_id: productId,
            item_name: 'Product Name',
            price: price,
            quantity: 1,
          },
        ],
      })
    }
  }

  return (
    <button
      onClick={() => handlePurchase('product-123', 99.99)}
      className="px-4 py-2 bg-green-600 text-white rounded"
    >
      Buy Now
    </button>
  )
}

