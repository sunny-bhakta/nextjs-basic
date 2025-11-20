# Internationalization (i18n)

> **Category**: Intermediate | **Priority**: 🟢 Low | **Difficulty**: Intermediate  
> **Related Concepts**: [Routing](../01-routing/README.md)  
> **Status**: ⏳ Not Started

## Overview

Internationalization allows you to create multi-language applications with locale detection and routing.

## Key Topics

- [next-intl](./next-intl.md) - Popular i18n library
- Locale Detection - Detecting user's language
- Locale Routing - Routing based on locale
- Language Switching - Allowing users to change language

## Quick Start

```typescript
// app/[locale]/page.tsx
import { useTranslations } from 'next-intl'

export default function Page() {
  const t = useTranslations('Page')
  return <h1>{t('title')}</h1>
}
```

## Learning Path

1. Understand [next-intl](./next-intl.md)
2. Set up locale routing
3. Create translation files
4. Implement language switching

## Detailed Guides

- **[next-intl](./next-intl.md)** - Using next-intl for i18n

## Examples

See the [examples](./examples/) folder for working code samples:

- **[next-intl Setup](./examples/01-next-intl.tsx)** - next-intl setup and usage

See [examples/README.md](./examples/README.md) for detailed descriptions.

## Resources

- [i18n Routing Docs](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [next-intl](https://next-intl-docs.vercel.app)

---

**Previous**: [Redirects & Rewrites](../14-redirects-rewrites/README.md) | **Next**: [Authentication](../16-authentication/README.md)

