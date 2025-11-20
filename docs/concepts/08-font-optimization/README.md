# Font Optimization

> **Category**: Core | **Priority**: 🟢 Low | **Difficulty**: Beginner  
> **Related Concepts**: [Performance Optimization](../22-performance-optimization/README.md)  
> **Status**: ⏳ Not Started

## Overview

Next.js automatically optimizes fonts using `next/font`, which eliminates external network requests and improves performance.

## Key Topics

- [next/font](./next-font.md) - Font optimization API
- [Google Fonts](./google-fonts.md) - Using Google Fonts with optimization
- [Local Fonts](./local-fonts.md) - Using local font files
- Variable Fonts - Using variable font files
- Font Display - Font display strategies

## Quick Start

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

## Learning Path

1. Start with [next/font](./next-font.md)
2. Learn [Google Fonts](./google-fonts.md)
3. Understand [Local Fonts](./local-fonts.md)

## Detailed Guides

- **[next/font](./next-font.md)** - Font optimization API
- **[Google Fonts](./google-fonts.md)** - Using Google Fonts
- **[Local Fonts](./local-fonts.md)** - Using local font files

## Examples

See the [examples](./examples/) folder for working code samples:

- **[Google Fonts](./examples/01-google-fonts.tsx)** - Using Google Fonts
- **[Local Fonts](./examples/02-local-fonts.tsx)** - Using local fonts

See [examples/README.md](./examples/README.md) for detailed descriptions.

## Resources

- [Font Optimization Docs](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)

---

**Previous**: [Image Optimization](../07-image-optimization/README.md) | **Next**: [Script Optimization](../09-script-optimization/README.md)

