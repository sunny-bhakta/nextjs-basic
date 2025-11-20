# Analytics

> **Category**: Advanced | **Related Concepts**: [Performance Optimization](../22-performance-optimization/README.md)  
> **Last Updated**: 2024

## 📖 Overview

Analytics in Next.js helps track user behavior, measure performance, and understand how users interact with your application. Multiple analytics solutions can be integrated.

**Key Points:**
- Vercel Analytics for built-in tracking
- Google Analytics for comprehensive tracking
- Web Vitals for performance metrics
- Custom analytics for specific needs
- Privacy-compliant tracking

## 🎯 When to Use

- **User Behavior**: Track page views, clicks, events
- **Performance**: Monitor Core Web Vitals
- **Conversion**: Track conversions and goals
- **A/B Testing**: Measure test results
- **Business Metrics**: Track KPIs

## 💻 Basic Example

### Vercel Analytics

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

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
      </body>
    </html>
  )
}
```

### Google Analytics

```typescript
// app/layout.tsx
import Script from 'next/script'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

## 🔧 Advanced Example

### Web Vitals Tracking

```typescript
// app/components/WebVitals.tsx
'use client'

import { useEffect } from 'react'
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals'

export function WebVitals() {
  useEffect(() => {
    onCLS(console.log)
    onFID(console.log)
    onFCP(console.log)
    onLCP(console.log)
    onTTFB(console.log)
  }, [])

  return null
}
```

### Custom Analytics

```typescript
// app/lib/analytics.ts
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined') {
    // Send to analytics service
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: eventName, properties })
    })
  }
}
```

## 📋 Common Patterns

### Pattern 1: Page View Tracking
```typescript
useEffect(() => {
  gtag('config', 'GA_MEASUREMENT_ID', {
    page_path: window.location.pathname
  })
}, [pathname])
```
**When to use**: Track page navigation

### Pattern 2: Event Tracking
```typescript
gtag('event', 'click', {
  event_category: 'button',
  event_label: 'Sign Up'
})
```
**When to use**: Track user interactions

### Pattern 3: Custom Events
```typescript
trackEvent('purchase', { value: 100, currency: 'USD' })
```
**When to use**: Track business events

## ⚠️ Common Mistakes

### Mistake 1: Not Using Script Component
```typescript
// ❌ Wrong: Regular script tag
<script src="https://analytics.js"></script>
```

```typescript
// ✅ Correct: Next.js Script component
<Script src="https://analytics.js" strategy="afterInteractive" />
```
**Why**: Script component optimizes loading.

### Mistake 2: Tracking Before Consent
```typescript
// ❌ Wrong: Track without consent
useEffect(() => {
  gtag('config', 'GA_ID')
}, [])
```

```typescript
// ✅ Correct: Check consent first
useEffect(() => {
  if (hasConsent()) {
    gtag('config', 'GA_ID')
  }
}, [])
```
**Why**: GDPR/privacy compliance.

## ✨ Best Practices

1. **Use Vercel Analytics**: Easiest for Vercel deployments
2. **Optimize loading**: Use Script component
3. **Respect privacy**: Get user consent
4. **Track Web Vitals**: Monitor performance
5. **Custom events**: Track business metrics
6. **Error tracking**: Monitor errors
7. **Test tracking**: Verify events fire correctly

## 🔗 Related Concepts

- [Performance Optimization](../22-performance-optimization/README.md) - Performance metrics
- [Script Component](../09-script-component/README.md) - Script optimization

## 📚 Resources

### Official Documentation
- [Analytics](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)

### Analytics Services
- [Vercel Analytics](https://vercel.com/analytics)
- [Google Analytics](https://analytics.google.com/)

## 🎓 Key Takeaways

- Use Vercel Analytics for easy setup
- Use Script component for third-party scripts
- Track Web Vitals for performance
- Respect user privacy and consent
- Customize tracking for your needs
- Test analytics implementation

