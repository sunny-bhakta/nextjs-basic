# Image Optimization

> **Category**: Core | **Priority**: 🟡 Medium | **Difficulty**: Beginner  
> **Related Concepts**: [Performance Optimization](../22-performance-optimization/README.md)  
> **Status**: ⏳ Not Started

## Overview

Next.js provides automatic image optimization through the `next/image` component, which optimizes images on-demand and serves them in modern formats.

## Key Topics

- [next/image Component](./next-image-component.md) - Optimized image component
- [Image Formats](./image-formats.md) - WebP, AVIF support
- [Responsive Images](./responsive-images.md) - Srcset and sizes
- [Placeholders](./placeholders.md) - Blur and empty placeholders
- Image Domains - Configuring external image sources
- Lazy Loading - Automatic lazy loading

## Quick Start

```typescript
import Image from 'next/image'

export default function Page() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero image"
      width={800}
      height={600}
      priority // For above-the-fold images
    />
  )
}
```

## Learning Path

1. Start with [next/image Component](./next-image-component.md)
2. Learn [Image Formats](./image-formats.md)
3. Understand [Responsive Images](./responsive-images.md)
4. Explore [Placeholders](./placeholders.md)

## Detailed Guides

- **[next/image Component](./next-image-component.md)** - Using the optimized image component
- **[Image Formats](./image-formats.md)** - Modern image formats (WebP, AVIF)
- **[Responsive Images](./responsive-images.md)** - Responsive image handling
- **[Placeholders](./placeholders.md)** - Image placeholders for better UX

## Examples

See the [examples](./examples/) folder for working code samples:

- **[Basic Image](./examples/01-basic-image.tsx)** - Basic next/image usage
- **[Responsive Images](./examples/02-responsive-images.tsx)** - Responsive image handling
- **[Placeholders](./examples/03-placeholders.tsx)** - Image placeholders
- **[External Images](./examples/04-external-images.tsx)** - External image sources
- **[Image Gallery](./examples/05-image-gallery.tsx)** - Building image galleries
- **[Complete Example](./examples/06-complete-example.tsx)** - Comprehensive image optimization

See [examples/README.md](./examples/README.md) for detailed descriptions and usage instructions.

## Resources

- [Image Optimization Docs](https://nextjs.org/docs/app/building-your-application/optimizing/images)

---

**Previous**: [API Routes](../06-api-routes/README.md) | **Next**: [Font Optimization](../08-font-optimization/README.md)

