# Optimization Techniques

## Bundle Optimization

### Dynamic Imports

```typescript
// Lazy load heavy components
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: false
})
```

### Tree Shaking

```typescript
// Import only what you need
import { debounce } from 'lodash-es' // ✅ Good
// import _ from 'lodash' // ❌ Bad - imports everything
```

## Code Splitting

### Route-Based Splitting

```typescript
// Automatic with App Router
// Each route is code-split automatically
```

### Component Splitting

```typescript
// Use dynamic imports for heavy components
const Chart = dynamic(() => import('./Chart'))
```

## Performance Optimizations

### Image Optimization

```typescript
// Use Next.js Image component
import Image from 'next/image'

<Image
  src="/image.jpg"
  alt="Image"
  width={800}
  height={600}
  priority // For above-the-fold images
/>
```

### Font Optimization

```typescript
// Use next/font
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
```

## Build Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "analyze": "ANALYZE=true next build"
  }
}
```

