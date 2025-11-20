# File System

> **Category**: Advanced | **Related Concepts**: [App Router](../03-app-router/README.md)  
> **Last Updated**: 2024

## 📖 Overview

Next.js file system conventions determine routing, static file serving, and code organization. Understanding these conventions is essential for building Next.js applications.

**Key Points:**
- App Router file conventions
- Public folder for static assets
- Static file serving
- Asset optimization
- File organization

## 🎯 When to Use

- **Static Assets**: Images, fonts, icons
- **Public Files**: Files served at root
- **Route Organization**: File-based routing
- **Asset Management**: Organizing assets

## 💻 Basic Example

### Public Folder

```
public/
  images/
    logo.png
    hero.jpg
  icons/
    favicon.ico
  documents/
    guide.pdf
```

```typescript
// Usage
<img src="/images/logo.png" alt="Logo" />
<link rel="icon" href="/icons/favicon.ico" />
```

### Static Assets

```typescript
// app/components/Logo.tsx
import Image from 'next/image'

export default function Logo() {
  return (
    <Image
      src="/images/logo.png"
      alt="Company Logo"
      width={200}
      height={50}
    />
  )
}
```

## 🔧 Advanced Example

### Dynamic Asset Loading

```typescript
// app/components/DynamicImage.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'

export function DynamicImage({ imageName }: { imageName: string }) {
  const [error, setError] = useState(false)

  if (error) {
    return <div>Image not found</div>
  }

  return (
    <Image
      src={`/images/${imageName}`}
      alt={imageName}
      width={400}
      height={300}
      onError={() => setError(true)}
    />
  )
}
```

## 📋 Common Patterns

### Pattern 1: Public Folder
```
public/
  images/
  fonts/
  icons/
```
**When to use**: Static assets

### Pattern 2: Next.js Image
```typescript
<Image src="/image.jpg" alt="..." width={800} height={600} />
```
**When to use**: Optimized images

### Pattern 3: Static Files
```typescript
<a href="/documents/guide.pdf">Download Guide</a>
```
**When to use**: PDFs, documents

## ⚠️ Common Mistakes

### Mistake 1: Wrong Path
```typescript
// ❌ Wrong: Absolute path
<img src="/public/images/logo.png" />
```

```typescript
// ✅ Correct: Relative to public
<img src="/images/logo.png" />
```
**Why**: Public folder is served at root.

### Mistake 2: Not Using Next.js Image
```typescript
// ❌ Wrong: Regular img tag
<img src="/image.jpg" alt="Image" />
```

```typescript
// ✅ Correct: Next.js Image
<Image src="/image.jpg" alt="Image" width={800} height={600} />
```
**Why**: Next.js Image provides optimization.

## ✨ Best Practices

1. **Use public folder**: For static assets
2. **Use Next.js Image**: For images
3. **Organize assets**: Logical folder structure
4. **Optimize assets**: Compress images
5. **Use CDN**: For large assets
6. **Cache assets**: Set cache headers
7. **Version assets**: For cache busting

## 🔗 Related Concepts

- [App Router](../03-app-router/README.md) - File-based routing
- [Image Optimization](../07-image-optimization/README.md) - Image handling

## 📚 Resources

### Official Documentation
- [Static File Serving](https://nextjs.org/docs/app/building-your-application/optimizing/static-assets)

## 🎓 Key Takeaways

- Public folder serves files at root
- Use Next.js Image for optimization
- Organize assets logically
- Optimize file sizes
- Use appropriate file formats

