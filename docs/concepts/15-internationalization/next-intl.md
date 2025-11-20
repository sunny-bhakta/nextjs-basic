# next-intl

> **Category**: Intermediate | **Related Concepts**: [Routing](../01-routing/README.md), [Middleware](../13-middleware/README.md)  
> **Last Updated**: 2024

## 📖 Overview

`next-intl` is a popular library for internationalization in Next.js. It provides type-safe translations, locale routing, and seamless integration with Next.js App Router.

**Key Points:**
- Type-safe translations
- Locale routing
- Server and client components
- Automatic locale detection
- Formatting support
- Easy to use

## 🎯 When to Use

- **Multi-language Apps**: Apps with multiple languages
- **Type Safety**: When you need type-safe translations
- **App Router**: When using Next.js App Router
- **Locale Routing**: When you need locale-based routing
- **Formatting**: When you need number/date formatting

## 💻 Basic Example

### Setup

```typescript
// i18n.ts
import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

export const locales = ['en', 'fr', 'de']

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound()
  
  return {
    messages: (await import(`../messages/${locale}.json`)).default
  }
})
```

### Basic Usage

```typescript
// app/[locale]/page.tsx
import { useTranslations } from 'next-intl'

export default function HomePage() {
  const t = useTranslations('HomePage')
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  )
}
```

### Server Component

```typescript
// app/[locale]/about/page.tsx
import { getTranslations } from 'next-intl/server'

export default async function AboutPage() {
  const t = await getTranslations('AboutPage')
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  )
}
```

## 🔧 Advanced Example

### Locale Routing

```typescript
// middleware.ts
import createMiddleware from 'next-intl/middleware'
import { locales } from './i18n'

export default createMiddleware({
  locales,
  defaultLocale: 'en',
})

export const config = {
  matcher: ['/', '/(fr|de|en)/:path*']
}
```

### Formatting

```typescript
// app/[locale]/page.tsx
import { useTranslations, useFormatter } from 'next-intl'

export default function HomePage() {
  const t = useTranslations('HomePage')
  const format = useFormatter()
  
  const date = new Date()
  const price = 1234.56
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{format.dateTime(date, 'short')}</p>
      <p>{format.number(price, { style: 'currency', currency: 'USD' })}</p>
    </div>
  )
}
```

## 📋 Common Patterns

### Pattern 1: Basic Translation
```typescript
const t = useTranslations('Page')
<h1>{t('title')}</h1>
```
**When to use**: Simple translations

### Pattern 2: Nested Keys
```typescript
const t = useTranslations('Page')
<h1>{t('section.title')}</h1>
```
**When to use**: Organized translations

### Pattern 3: With Parameters
```typescript
const t = useTranslations('Page')
<p>{t('welcome', { name: 'John' })}</p>
```
**When to use**: Dynamic translations

## ⚠️ Common Mistakes

### Mistake 1: Not Setting Up Locale
```typescript
// ❌ Wrong: No locale setup
export default function Page() {
  const t = useTranslations() // Error
}
```
**Why**: Need to set up locale routing.

```typescript
// ✅ Correct: Set up locale routing
// Use [locale] in folder structure
```

### Mistake 2: Wrong Hook Usage
```typescript
// ❌ Wrong: useTranslations in Server Component
export default async function Page() {
  const t = useTranslations() // Error
}
```
**Why**: Use getTranslations in Server Components.

```typescript
// ✅ Correct: Use getTranslations
export default async function Page() {
  const t = await getTranslations()
}
```

### Mistake 3: Missing Messages
```typescript
// ❌ Wrong: Translation key doesn't exist
const t = useTranslations('Page')
<p>{t('nonexistent')}</p> // Shows key
```
**Why**: Translation key must exist.

```typescript
// ✅ Correct: Use existing keys
const t = useTranslations('Page')
<p>{t('title')}</p>
```

## ✨ Best Practices

1. **Type safety**: Use TypeScript for type-safe translations
2. **Organize messages**: Organize translation files logically
3. **Use formatting**: Use formatters for dates/numbers
4. **Locale routing**: Set up proper locale routing
5. **Fallback**: Provide fallback for missing translations
6. **Test all locales**: Test all supported languages

## 🔗 Related Concepts

- [Routing](../01-routing/README.md) - Locale routing
- [Middleware](../13-middleware/README.md) - Locale detection

## 📚 Resources

### Official Documentation
- [next-intl](https://next-intl-docs.vercel.app)

## 🧪 Practice Exercises

### Exercise 1: Basic Setup
**Difficulty**: Beginner  
**Goal**: Understand next-intl setup  
**Instructions**:
1. Install next-intl
2. Set up locale routing
3. Create translation files
4. Use translations

### Exercise 2: Advanced Features
**Difficulty**: Intermediate  
**Goal**: Practice advanced features  
**Instructions**:
1. Set up multiple locales
2. Use formatting
3. Add locale switching
4. Test all features

## 🎓 Key Takeaways

- Use next-intl for i18n
- Set up locale routing
- Use getTranslations in Server Components
- Use useTranslations in Client Components
- Organize translation files
- Test all locales

## ❓ FAQ

### Q: How do I install next-intl?
**A**: Run `npm install next-intl` and follow setup guide.

### Q: Can I use with App Router?
**A**: Yes, next-intl works great with App Router.

### Q: How do I switch languages?
**A**: Use Link component with locale or programmatic navigation.

### Q: Can I use in Server Components?
**A**: Yes, use `getTranslations` in Server Components.

### Q: How do I format dates/numbers?
**A**: Use `useFormatter` hook or `format` function.

---

**Next Steps**: 
- Review: [Routing](../01-routing/README.md) for locale routing
- Practice: Set up i18n in your app
- Build: Create multi-language application

