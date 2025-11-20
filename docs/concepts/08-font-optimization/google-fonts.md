# Google Fonts

> **Category**: Core | **Related Concepts**: [next/font](./next-font.md), [Local Fonts](./local-fonts.md)  
> **Last Updated**: 2024

## 📖 Overview

Next.js makes it easy to use Google Fonts with automatic optimization. Fonts are self-hosted, eliminating external network requests and improving performance.

**Key Points:**
- Automatic optimization
- Self-hosted fonts
- Subset support
- Weight and style options
- Variable font support
- Zero external requests

## 🎯 When to Use

- **Google Fonts**: When using fonts from Google Fonts
- **Performance**: When you need optimized font loading
- **Popular Fonts**: When using popular fonts like Inter, Roboto, etc.
- **Quick Setup**: When you want quick font setup

## 💻 Basic Example

### Single Google Font

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

### Multiple Weights

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

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

### With CSS Variables

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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

// app/globals.css
.font-inter {
  font-family: var(--font-inter);
}
```

## 🔧 Advanced Example

### Multiple Google Fonts

```typescript
// app/layout.tsx
import { Inter, Roboto_Mono, Playfair_Display } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
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

### Font with Display Strategy

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // 'auto' | 'block' | 'swap' | 'fallback' | 'optional'
})

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

## 📋 Common Patterns

### Pattern 1: Single Font
```typescript
const font = Inter({ subsets: ['latin'] })
<html className={font.className}>
```
**When to use**: Single font for entire app

### Pattern 2: Multiple Fonts with Variables
```typescript
const font1 = Inter({ variable: '--font-1' })
const font2 = Roboto({ variable: '--font-2' })
<html className={`${font1.variable} ${font2.variable}`}>
```
**When to use**: Multiple fonts

### Pattern 3: Specific Weights
```typescript
const font = Inter({ weight: ['400', '700'] })
```
**When to use**: When you only need specific weights

## ⚠️ Common Mistakes

### Mistake 1: Using External Link
```typescript
// ❌ Wrong: External Google Fonts link
<link href="https://fonts.googleapis.com/css2?family=Inter" />
```
**Why**: Adds external request and layout shift.

```typescript
// ✅ Correct: Use next/font
import { Inter } from 'next/font/google'
```

### Mistake 2: Not Specifying Subsets
```typescript
// ❌ Wrong: No subsets specified
const inter = Inter()
// May include unnecessary characters
```
**Why**: Includes all characters, increasing file size.

```typescript
// ✅ Correct: Specify subsets
const inter = Inter({ subsets: ['latin'] })
```

### Mistake 3: Including All Weights
```typescript
// ❌ Wrong: All weights
const inter = Inter({ weight: 'variable' })
// Includes all weights
```
**Why**: Increases bundle size unnecessarily.

```typescript
// ✅ Correct: Specific weights
const inter = Inter({ weight: ['400', '700'] })
```

## ✨ Best Practices

1. **Use next/font/google**: For Google Fonts
2. **Specify subsets**: Only include needed character sets
3. **Limit weights**: Only include needed font weights
4. **Use variables**: For multiple fonts
5. **Set display**: Use 'swap' for better performance
6. **Test loading**: Verify font loading behavior

## 🔗 Related Concepts

- [next/font](./next-font.md) - Font optimization
- [Local Fonts](./local-fonts.md) - Local fonts

## 📚 Resources

### Official Documentation
- [Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)

## 🧪 Practice Exercises

### Exercise 1: Basic Google Font
**Difficulty**: Beginner  
**Goal**: Understand Google Fonts  
**Instructions**:
1. Import a Google Font
2. Apply to layout
3. Test font loading
4. Verify optimization

### Exercise 2: Multiple Fonts
**Difficulty**: Intermediate  
**Goal**: Practice multiple fonts  
**Instructions**:
1. Import multiple Google Fonts
2. Use CSS variables
3. Apply to different elements
4. Test font loading

## 🎓 Key Takeaways

- Use `next/font/google` for Google Fonts
- Fonts are automatically self-hosted
- Specify subsets to reduce file size
- Use CSS variables for multiple fonts
- Limit weights to what you need
- Set display strategy for performance

## ❓ FAQ

### Q: How do I find font names?
**A**: Check Google Fonts website. Use the font name with underscores (e.g., `Roboto_Mono`).

### Q: Can I use variable fonts?
**A**: Yes, many Google Fonts support variable fonts.

### Q: Do I need to download fonts?
**A**: No, next/font automatically downloads and self-hosts fonts.

### Q: What subsets should I use?
**A**: Use 'latin' for English, add others as needed (e.g., 'latin-ext', 'cyrillic').

### Q: Can I use italic styles?
**A**: Yes, use the `style` option: `style: ['normal', 'italic']`.

---

**Next Steps**: 
- Review: [Local Fonts](./local-fonts.md) for custom fonts
- Practice: Add Google Fonts to your app
- Build: Optimize fonts in your application

