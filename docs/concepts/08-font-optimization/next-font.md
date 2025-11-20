# next/font

> **Category**: Core | **Related Concepts**: [Google Fonts](./google-fonts.md), [Local Fonts](./local-fonts.md)  
> **Last Updated**: 2024

## 📖 Overview

`next/font` is Next.js's font optimization system that automatically optimizes fonts by self-hosting them, eliminating external network requests, and improving performance. It supports Google Fonts, local fonts, and variable fonts.

**Key Points:**
- Automatic font optimization
- Self-hosting fonts
- Zero layout shift
- Automatic subsetting
- Better performance
- No external requests

## 🎯 When to Use

- **All Fonts**: Use for all fonts in your app
- **Performance**: When you need optimal font loading
- **Google Fonts**: When using Google Fonts
- **Local Fonts**: When using local font files
- **Variable Fonts**: When using variable fonts

## 💻 Basic Example

### Google Fonts

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

### Local Fonts

```typescript
// app/layout.tsx
import localFont from 'next/font/local'

const myFont = localFont({
  src: './fonts/MyFont.woff2',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={myFont.className}>
      <body>{children}</body>
    </html>
  )
}
```

## 🔧 Advanced Example

### Multiple Fonts

```typescript
// app/layout.tsx
import { Inter, Roboto_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}

// app/page.tsx
export default function HomePage() {
  return (
    <div>
      <h1 className="font-inter">Inter font</h1>
      <code className="font-roboto-mono">Roboto Mono font</code>
    </div>
  )
}
```

### Variable Fonts

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
```

### Font with Custom Properties

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
```

## 📋 Common Patterns

### Pattern 1: Single Font
```typescript
const font = Inter({ subsets: ['latin'] })
<html className={font.className}>
```
**When to use**: Single font for entire app

### Pattern 2: Multiple Fonts
```typescript
const font1 = Inter({ variable: '--font-1' })
const font2 = Roboto({ variable: '--font-2' })
<html className={`${font1.variable} ${font2.variable}`}>
```
**When to use**: Multiple fonts with CSS variables

### Pattern 3: Local Font
```typescript
const font = localFont({ src: './font.woff2' })
```
**When to use**: Custom local fonts

## ⚠️ Common Mistakes

### Mistake 1: Not Using next/font
```typescript
// ❌ Wrong: External font link
<link href="https://fonts.googleapis.com/css2?family=Inter" />
// External request, no optimization
```
**Why**: External fonts add network requests and layout shift.

```typescript
// ✅ Correct: Use next/font
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
```

### Mistake 2: Not Applying Font
```typescript
// ❌ Wrong: Font not applied
const inter = Inter({ subsets: ['latin'] })
// Font defined but not used
```
**Why**: Font must be applied to HTML or body element.

```typescript
// ✅ Correct: Apply font
const inter = Inter({ subsets: ['latin'] })
<html className={inter.className}>
```

### Mistake 3: Multiple Font Instances
```typescript
// ❌ Wrong: Creating multiple instances
const inter1 = Inter({ subsets: ['latin'] })
const inter2 = Inter({ subsets: ['latin'] })
// Duplicate font loading
```
**Why**: Creates duplicate font files.

```typescript
// ✅ Correct: Single instance
const inter = Inter({ subsets: ['latin'] })
// Reuse the same instance
```

## ✨ Best Practices

1. **Use next/font**: For all fonts in your app
2. **Apply to root**: Apply font to html or body element
3. **Use variables**: For multiple fonts, use CSS variables
4. **Specify subsets**: Only include needed character subsets
5. **Use display swap**: For better perceived performance
6. **Optimize weights**: Only include needed font weights

## 🔗 Related Concepts

- [Google Fonts](./google-fonts.md) - Using Google Fonts
- [Local Fonts](./local-fonts.md) - Using local fonts
- [Performance Optimization](../22-performance-optimization/README.md) - Performance

## 📚 Resources

### Official Documentation
- [Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)

## 🧪 Practice Exercises

### Exercise 1: Basic Font
**Difficulty**: Beginner  
**Goal**: Understand next/font basics  
**Instructions**:
1. Import a Google Font
2. Apply to root layout
3. Use in components
4. Test font loading

### Exercise 2: Multiple Fonts
**Difficulty**: Intermediate  
**Goal**: Practice multiple fonts  
**Instructions**:
1. Import multiple fonts
2. Use CSS variables
3. Apply different fonts to different elements
4. Test font loading

## 🎓 Key Takeaways

- Use `next/font` for all fonts
- Fonts are self-hosted automatically
- Zero layout shift with font optimization
- Use CSS variables for multiple fonts
- Specify only needed subsets and weights
- Apply font to root element

## ❓ FAQ

### Q: Do I need to download fonts?
**A**: No, next/font automatically downloads and self-hosts fonts.

### Q: Can I use custom fonts?
**A**: Yes, use `localFont` for local font files.

### Q: How do I use multiple fonts?
**A**: Use CSS variables with the `variable` option.

### Q: Does it work with variable fonts?
**A**: Yes, next/font supports variable fonts.

### Q: What about font-display?
**A**: Use the `display` option (default is 'swap').

---

**Next Steps**: 
- Review: [Google Fonts](./google-fonts.md) for Google Fonts
- Practice: Add fonts to your app
- Build: Optimize fonts in your application

