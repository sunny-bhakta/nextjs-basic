# Metadata & SEO

> **Category**: Intermediate | **Priority**: 🟡 Medium | **Difficulty**: Beginner  
> **Related Concepts**: [App Router](../03-app-router/README.md)  
> **Status**: ⏳ Not Started

## Overview

Next.js provides powerful metadata APIs for managing SEO, Open Graph tags, and other metadata for your pages.

## Key Topics

- [Metadata API](./metadata-api.md) - Using `metadata` object
- [Dynamic Metadata](./dynamic-metadata.md) - Generating metadata dynamically
- Open Graph Tags - Social media sharing
- Structured Data - JSON-LD for SEO

## Quick Start

```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
}

export default function Page() {
  return <h1>Page</h1>
}
```

## Learning Path

1. Start with [Metadata API](./metadata-api.md)
2. Learn [Dynamic Metadata](./dynamic-metadata.md)
3. Add Open Graph tags
4. Implement structured data

## Detailed Guides

- **[Metadata API](./metadata-api.md)** - Static metadata
- **[Dynamic Metadata](./dynamic-metadata.md)** - Dynamic metadata generation

## Examples

See the [examples](./examples/) folder for working code samples:

- **[Static Metadata](./examples/01-static-metadata.tsx)** - Static metadata examples
- **[Dynamic Metadata](./examples/02-dynamic-metadata.tsx)** - Dynamic metadata examples

See [examples/README.md](./examples/README.md) for detailed descriptions.

## Resources

- [Metadata Docs](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)

---

**Previous**: [Styling](../10-styling/README.md) | **Next**: [Environment Variables](../12-environment-variables/README.md)

