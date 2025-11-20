# Local Fonts

> **Category**: Core | **Related Concepts**: [next/font](./next-font.md), [Google Fonts](./google-fonts.md)  
> **Last Updated**: 2024

## 📖 Overview

Next.js supports local fonts using `next/font/local`, allowing you to use custom font files. Local fonts are optimized and self-hosted just like Google Fonts.

**Key Points:**
- Use custom font files
- Automatic optimization
- Self-hosted fonts
- Support for multiple formats
- Variable font support
- Better performance

## 🎯 When to Use

- **Custom Fonts**: When you have custom font files
- **Brand Fonts**: When using brand-specific fonts
- **Commercial Fonts**: When using licensed fonts
- **Variable Fonts**: When using variable font files
- **No Google Fonts**: When Google Fonts don't meet your needs

## 💻 Basic Example

### Single Local Font

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

### Multiple Font Files

```typescript
// app/layout.tsx
import localFont from 'next/font/local'

const myFont = localFont({
  src: [
    {
      path: './fonts/MyFont-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/MyFont-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/MyFont-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
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

### With CSS Variables

```typescript
// app/layout.tsx
import localFont from 'next/font/local'

const myFont = localFont({
  src: './fonts/MyFont.woff2',
  variable: '--font-myfont',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={myFont.variable}>
      <body>{children}</body>
    </html>
  )
}
```

## 🔧 Advanced Example

### Variable Font

```typescript
// app/layout.tsx
import localFont from 'next/font/local'

const variableFont = localFont({
  src: './fonts/VariableFont.woff2',
  variable: '--font-variable',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={variableFont.variable}>
      <body>{children}</body>
    </html>
  )
}
```

### Multiple Local Fonts

```typescript
// app/layout.tsx
import localFont from 'next/font/local'

const headingFont = localFont({
  src: './fonts/HeadingFont.woff2',
  variable: '--font-heading',
  display: 'swap',
})

const bodyFont = localFont({
  src: './fonts/BodyFont.woff2',
  variable: '--font-body',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

### Font with Fallback

```typescript
// app/layout.tsx
import localFont from 'next/font/local'

const myFont = localFont({
  src: './fonts/MyFont.woff2',
  display: 'swap',
  fallback: ['Arial', 'sans-serif'],
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

## 📋 Common Patterns

### Pattern 1: Single Font File
```typescript
const font = localFont({ src: './fonts/Font.woff2' })
```
**When to use**: Single font file

### Pattern 2: Multiple Weights
```typescript
const font = localFont({
  src: [
    { path: './fonts/Font-Regular.woff2', weight: '400' },
    { path: './fonts/Font-Bold.woff2', weight: '700' },
  ],
})
```
**When to use**: Multiple font weights

### Pattern 3: Variable Font
```typescript
const font = localFont({
  src: './fonts/VariableFont.woff2',
  variable: '--font-variable',
})
```
**When to use**: Variable font files

## ⚠️ Common Mistakes

### Mistake 1: Wrong Path
```typescript
// ❌ Wrong: Absolute path
const font = localFont({ src: '/fonts/Font.woff2' })
// Path should be relative to file
```
**Why**: Paths should be relative to the file location.

```typescript
// ✅ Correct: Relative path
const font = localFont({ src: './fonts/Font.woff2' })
```

### Mistake 2: Missing Font File
```typescript
// ❌ Wrong: Font file doesn't exist
const font = localFont({ src: './fonts/NonExistent.woff2' })
```
**Why**: Font file must exist in the specified location.

```typescript
// ✅ Correct: Ensure font file exists
// Place font in app/fonts/ or public/fonts/
```

### Mistake 3: Not Specifying Weight
```typescript
// ❌ Wrong: Multiple files without weight
const font = localFont({
  src: [
    './fonts/Font-Regular.woff2',
    './fonts/Font-Bold.woff2',
  ],
})
```
**Why**: Need to specify weight for each file.

```typescript
// ✅ Correct: Specify weight
const font = localFont({
  src: [
    { path: './fonts/Font-Regular.woff2', weight: '400' },
    { path: './fonts/Font-Bold.woff2', weight: '700' },
  ],
})
```

## ✨ Best Practices

1. **Use WOFF2 format**: Best compression and browser support
2. **Organize fonts**: Keep fonts in a dedicated folder
3. **Specify weights**: For multiple files, specify weight and style
4. **Use variables**: For multiple fonts, use CSS variables
5. **Set display**: Use 'swap' for better performance
6. **Include fallback**: Specify fallback fonts

## 🔗 Related Concepts

- [next/font](./next-font.md) - Font optimization
- [Google Fonts](./google-fonts.md) - Google Fonts

## 📚 Resources

### Official Documentation
- [Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)

## 🧪 Practice Exercises

### Exercise 1: Basic Local Font
**Difficulty**: Beginner  
**Goal**: Understand local fonts  
**Instructions**:
1. Add a font file to your project
2. Import using localFont
3. Apply to layout
4. Test font loading

### Exercise 2: Multiple Weights
**Difficulty**: Intermediate  
**Goal**: Practice multiple font weights  
**Instructions**:
1. Add multiple font files
2. Configure weights and styles
3. Use in components
4. Test all weights

## 🎓 Key Takeaways

- Use `localFont` for custom fonts
- Fonts are automatically optimized
- Use relative paths to font files
- Specify weight and style for multiple files
- Use CSS variables for multiple fonts
- WOFF2 format is recommended

## ❓ FAQ

### Q: Where should I put font files?
**A**: In `app/fonts/` or `public/fonts/` directory.

### Q: What format should I use?
**A**: WOFF2 is recommended for best compression and browser support.

### Q: Can I use variable fonts?
**A**: Yes, localFont supports variable font files.

### Q: Do I need to specify weight?
**A**: For single file, no. For multiple files, yes.

### Q: Can I use multiple local fonts?
**A**: Yes, use CSS variables for multiple fonts.

---

**Next Steps**: 
- Review: [next/font](./next-font.md) for font optimization
- Practice: Add local fonts to your app
- Build: Optimize fonts in your application

