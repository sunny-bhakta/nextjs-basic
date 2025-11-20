# Script Optimization

> **Category**: Core | **Priority**: 🟢 Low | **Difficulty**: Beginner  
> **Related Concepts**: [Performance Optimization](../22-performance-optimization/README.md)  
> **Status**: ⏳ Not Started

## Overview

The `next/script` component allows you to optimize third-party scripts with different loading strategies.

## Key Topics

- [next/script](./next-script.md) - Optimized script component
- Loading Strategies - `beforeInteractive`, `afterInteractive`, `lazyOnload`
- Script Optimization - Automatic optimization

## Quick Start

```typescript
import Script from 'next/script'

export default function Page() {
  return (
    <>
      <Script src="https://example.com/script.js" />
      <h1>Page content</h1>
    </>
  )
}
```

## Learning Path

1. Understand [next/script](./next-script.md)
2. Learn loading strategies
3. Practice with analytics

## Detailed Guides

- **[next/script](./next-script.md)** - Optimized script component

## Examples

See the [examples](./examples/) folder for working code samples:

- **[Basic Script](./examples/01-basic-script.tsx)** - Basic script usage
- **[Analytics](./examples/02-analytics.tsx)** - Analytics integration

See [examples/README.md](./examples/README.md) for detailed descriptions.

## Resources

- [Script Optimization Docs](https://nextjs.org/docs/app/building-your-application/optimizing/scripts)

---

**Previous**: [Font Optimization](../08-font-optimization/README.md) | **Next**: [Styling](../10-styling/README.md)

