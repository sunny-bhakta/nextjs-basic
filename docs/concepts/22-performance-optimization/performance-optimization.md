# Performance Optimization

> **Category**: Intermediate | **Related Concepts**: [Image Optimization](../07-image-optimization/README.md), [Caching](../21-caching/README.md)  
> **Last Updated**: 2024

## 📖 Overview

Performance optimization in Next.js involves code splitting, dynamic imports, bundle optimization, and monitoring Web Vitals to create fast, responsive applications.

**Key Points:**
- Automatic code splitting
- Dynamic imports for lazy loading
- Bundle size optimization
- Web Vitals monitoring
- Image and font optimization

## 🎯 When to Use

- **Large Applications**: Apps with many components
- **Heavy Components**: Components with large dependencies
- **Third-party Libraries**: Large external libraries
- **Performance Issues**: Slow page loads
- **Bundle Size**: Large JavaScript bundles

## 💻 Basic Example

### Dynamic Import

```typescript
// app/components/HeavyComponent.tsx
export default function HeavyComponent() {
  return (
    <div>
      <h1>Heavy Component</h1>
      {/* Large component with heavy dependencies */}
    </div>
  )
}

// app/page.tsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./components/HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false // Disable SSR if needed
})

export default function HomePage() {
  return (
    <div>
      <h1>Home</h1>
      <HeavyComponent />
    </div>
  )
}
```

### Code Splitting with Suspense

```typescript
// app/dashboard/page.tsx
import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('./components/Chart'), {
  loading: () => <div>Loading chart...</div>
})

const Stats = dynamic(() => import('./components/Stats'), {
  loading: () => <div>Loading stats...</div>
})

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Chart />
        <Stats />
      </Suspense>
    </div>
  )
}
```

## 🔧 Advanced Example

### Conditional Dynamic Import

```typescript
'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const Modal = dynamic(() => import('./Modal'), {
  loading: () => <div>Loading modal...</div>
})

export default function Page() {
  const [showModal, setShowModal] = useState(false)
  
  return (
    <div>
      <button onClick={() => setShowModal(true)}>
        Open Modal
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}
```

### Bundle Analysis

```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Analyze bundle in development
      if (process.env.ANALYZE === 'true') {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            openAnalyzer: true
          })
        )
      }
    }
    return config
  }
}

module.exports = nextConfig
```

## 📋 Common Patterns

### Pattern 1: Dynamic Import with Loading
```typescript
const Component = dynamic(() => import('./Component'), {
  loading: () => <Loading />
})
```
**When to use**: Heavy components that load slowly

### Pattern 2: Disable SSR
```typescript
const Component = dynamic(() => import('./Component'), {
  ssr: false
})
```
**When to use**: Client-only components (charts, maps)

### Pattern 3: Named Exports
```typescript
const Component = dynamic(() => import('./Component').then(mod => mod.Component))
```
**When to use**: Named exports instead of default

## ⚠️ Common Mistakes

### Mistake 1: Not Using Dynamic Imports
```typescript
// ❌ Wrong: Importing heavy component directly
import HeavyChart from './HeavyChart'
```

```typescript
// ✅ Correct: Use dynamic import
const HeavyChart = dynamic(() => import('./HeavyChart'))
```
**Why**: Heavy components increase initial bundle size.

### Mistake 2: Loading Everything
```typescript
// ❌ Wrong: Loading all components upfront
import Component1 from './Component1'
import Component2 from './Component2'
import Component3 from './Component3'
```

```typescript
// ✅ Correct: Load on demand
const Component1 = dynamic(() => import('./Component1'))
```
**Why**: Reduces initial bundle size.

## ✨ Best Practices

1. **Use dynamic imports**: For heavy components
2. **Monitor bundle size**: Use bundle analyzer
3. **Optimize images**: Use Next.js Image component
4. **Code split routes**: Automatic with App Router
5. **Lazy load**: Components below the fold
6. **Monitor Web Vitals**: Track performance metrics
7. **Optimize fonts**: Use next/font

## 🔗 Related Concepts

- [Image Optimization](../07-image-optimization/README.md) - Image performance
- [Caching](../21-caching/README.md) - Caching strategies
- [Font Optimization](../08-font-optimization/README.md) - Font loading

## 📚 Resources

### Official Documentation
- [Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Dynamic Imports](https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading)

## 🎓 Key Takeaways

- Use dynamic imports for heavy components
- Code splitting is automatic in App Router
- Monitor bundle size regularly
- Optimize images and fonts
- Track Web Vitals
- Lazy load below-the-fold content

