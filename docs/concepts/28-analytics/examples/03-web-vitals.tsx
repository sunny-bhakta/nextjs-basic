// Example 3: Web Vitals
// Demonstrates Web Vitals tracking

'use client'

import { useEffect } from 'react'
import { onCLS, onFID, onFCP, onLCP, onTTFB, onINP, Metric } from 'web-vitals'

// ============================================
// Example 1: Basic Web Vitals Tracking
// ============================================

export function WebVitals() {
  useEffect(() => {
    const handleMetric = (metric: Metric) => {
      console.log(metric)
      // Send to analytics
      sendToAnalytics(metric)
    }

    onCLS(handleMetric)
    onFID(handleMetric)
    onFCP(handleMetric)
    onLCP(handleMetric)
    onTTFB(handleMetric)
    onINP(handleMetric)
  }, [])

  return null
}

function sendToAnalytics(metric: Metric) {
  // Send to your analytics service
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    })
  }
}

// ============================================
// Example 2: Custom Web Vitals Reporting
// ============================================

interface WebVitalsReport {
  name: string
  value: number
  id: string
  rating: 'good' | 'needs-improvement' | 'poor'
}

export function CustomWebVitals() {
  useEffect(() => {
    const reportWebVitals = (metric: Metric) => {
      const report: WebVitalsReport = {
        name: metric.name,
        value: metric.value,
        id: metric.id,
        rating: metric.rating,
      }

      // Send to your API
      fetch('/api/web-vitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(report),
        keepalive: true,
      })
    }

    onCLS(reportWebVitals)
    onFID(reportWebVitals)
    onFCP(reportWebVitals)
    onLCP(reportWebVitals)
    onTTFB(reportWebVitals)
    onINP(reportWebVitals)
  }, [])

  return null
}

// ============================================
// Example 3: Web Vitals Display Component
// ============================================

'use client'

import { useState, useEffect } from 'react'
import { Metric } from 'web-vitals'

export function WebVitalsDisplay() {
  const [metrics, setMetrics] = useState<Record<string, Metric>>({})

  useEffect(() => {
    const handleMetric = (metric: Metric) => {
      setMetrics(prev => ({
        ...prev,
        [metric.name]: metric,
      }))
    }

    onCLS(handleMetric)
    onFID(handleMetric)
    onFCP(handleMetric)
    onLCP(handleMetric)
    onTTFB(handleMetric)
    onINP(handleMetric)
  }, [])

  const getRatingColor = (rating?: string) => {
    switch (rating) {
      case 'good':
        return 'text-green-600'
      case 'needs-improvement':
        return 'text-yellow-600'
      case 'poor':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-semibold mb-4">Web Vitals</h3>
      <div className="space-y-2">
        {Object.values(metrics).map((metric) => (
          <div key={metric.id} className="flex justify-between items-center">
            <span className="font-medium">{metric.name}:</span>
            <div className="flex items-center gap-2">
              <span>{Math.round(metric.value)}</span>
              <span className={`text-sm ${getRatingColor(metric.rating)}`}>
                {metric.rating}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// Example 4: API Route for Web Vitals
// File: app/api/web-vitals/route.ts
// ============================================

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const metric = await request.json()
    
    // Log or store the metric
    console.log('Web Vital:', metric)
    
    // Store in database or analytics service
    // await storeWebVital(metric)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error storing web vital:', error)
    return NextResponse.json(
      { error: 'Failed to store web vital' },
      { status: 500 }
    )
  }
}

