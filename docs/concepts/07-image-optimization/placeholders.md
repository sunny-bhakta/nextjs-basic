# Image Placeholders

> **Category**: Core | **Related Concepts**: [next/image Component](./next-image-component.md), [Performance Optimization](../22-performance-optimization/README.md)  
> **Last Updated**: 2024

## 📖 Overview

Image placeholders improve user experience by showing a placeholder while images load. Next.js supports blur placeholders and empty placeholders, helping prevent layout shift and providing visual feedback.

**Key Points:**
- Blur placeholders
- Empty placeholders
- Base64 encoded blur data
- Automatic blur generation
- Better perceived performance
- Prevents layout shift

## 🎯 When to Use

- **All Images**: Improve loading experience
- **Above-the-fold**: Critical images
- **User Experience**: Better perceived performance
- **Layout Stability**: Prevent layout shift
- **Slow Connections**: Helpful on slow networks

## 💻 Basic Example

### Blur Placeholder

```typescript
// app/components/ImageWithBlur.tsx
import Image from 'next/image'

export default function ImageWithBlur() {
  return (
    <Image
      src="/photo.jpg"
      alt="Photo"
      width={800}
      height={600}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..." // Base64 encoded small image
    />
  )
}
```

### Empty Placeholder

```typescript
// app/components/ImageWithEmpty.tsx
import Image from 'next/image'

export default function ImageWithEmpty() {
  return (
    <Image
      src="/photo.jpg"
      alt="Photo"
      width={800}
      height={600}
      placeholder="empty" // No placeholder
    />
  )
}
```

### Automatic Blur (with next/image)

```typescript
// app/components/AutoBlurImage.tsx
import Image from 'next/image'

export default function AutoBlurImage() {
  // When using static imports, Next.js can generate blur automatically
  return (
    <Image
      src="/photo.jpg"
      alt="Photo"
      width={800}
      height={600}
      placeholder="blur"
      // blurDataURL is optional when using static imports
    />
  )
}
```

## 🔧 Advanced Example

### Generating Blur Data URL

```typescript
// lib/image-utils.ts
import { getPlaiceholder } from 'plaiceholder'

export async function getBlurDataURL(src: string) {
  const buffer = await fetch(src).then(res => res.arrayBuffer())
  const { base64 } = await getPlaiceholder(Buffer.from(buffer))
  return base64
}

// app/components/ImageWithGeneratedBlur.tsx
import Image from 'next/image'
import { getBlurDataURL } from '@/lib/image-utils'

export default async function ImageWithGeneratedBlur() {
  const blurDataURL = await getBlurDataURL('/photo.jpg')
  
  return (
    <Image
      src="/photo.jpg"
      alt="Photo"
      width={800}
      height={600}
      placeholder="blur"
      blurDataURL={blurDataURL}
    />
  )
}
```

### Placeholder with Loading State

```typescript
// app/components/ImageWithLoading.tsx
'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function ImageWithLoading({ src, alt }: { src: string; alt: string }) {
  const [isLoading, setIsLoading] = useState(true)
  
  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        width={800}
        height={600}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,..."
        onLoad={() => setIsLoading(false)}
        className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity'}
      />
    </div>
  )
}
```

### Placeholder for External Images

```typescript
// app/components/ExternalImageWithPlaceholder.tsx
import Image from 'next/image'

export default function ExternalImageWithPlaceholder() {
  // For external images, provide your own blur data URL
  return (
    <Image
      src="https://example.com/image.jpg"
      alt="External image"
      width={800}
      height={600}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..." // Generate from external image
    />
  )
}
```

## 📋 Common Patterns

### Pattern 1: Static Blur
```typescript
<Image
  src="/image.jpg"
  alt="Image"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```
**When to use**: Static images with known blur data

### Pattern 2: Empty Placeholder
```typescript
<Image
  src="/image.jpg"
  alt="Image"
  width={800}
  height={600}
  placeholder="empty"
/>
```
**When to use**: When you don't want a placeholder

### Pattern 3: Generated Blur
```typescript
// Generate blur at build time or runtime
const blur = await generateBlur(imageSrc)
<Image placeholder="blur" blurDataURL={blur} />
```
**When to use**: Dynamic images or external images

## ⚠️ Common Mistakes

### Mistake 1: Missing blurDataURL
```typescript
// ❌ Wrong: placeholder="blur" without blurDataURL
<Image
  src="/image.jpg"
  alt="Image"
  width={800}
  height={600}
  placeholder="blur"
  // Missing blurDataURL
/>
```
**Why**: blurDataURL is required when using placeholder="blur".

```typescript
// ✅ Correct: Provide blurDataURL
<Image
  src="/image.jpg"
  alt="Image"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### Mistake 2: Large Blur Data URL
```typescript
// ❌ Wrong: Full-size image as blur
const blurDataURL = await getFullImageBase64(image) // Too large
```
**Why**: Blur data should be small (10px width recommended).

```typescript
// ✅ Correct: Small image for blur
const blurDataURL = await getSmallImageBase64(image, 10) // Small
```

### Mistake 3: Not Using Placeholders
```typescript
// ❌ Wrong: No placeholder
<Image src="/image.jpg" alt="Image" width={800} height={600} />
// Layout shift when image loads
```
**Why**: Placeholders prevent layout shift and improve UX.

```typescript
// ✅ Correct: Use placeholder
<Image
  src="/image.jpg"
  alt="Image"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

## ✨ Best Practices

1. **Use blur placeholders**: For better UX
2. **Keep blur small**: 10px width recommended
3. **Generate at build time**: For static images
4. **Use for critical images**: Above-the-fold images
5. **Match aspect ratio**: Blur should match image aspect ratio
6. **Test loading states**: Verify placeholder behavior

## 🔗 Related Concepts

- [next/image Component](./next-image-component.md) - Image component
- [Performance Optimization](../22-performance-optimization/README.md) - Performance

## 📚 Resources

### Libraries
- [plaiceholder](https://github.com/joe-bell/plaiceholder) - Generate blur placeholders

### Official Documentation
- [Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)

## 🧪 Practice Exercises

### Exercise 1: Basic Placeholder
**Difficulty**: Beginner  
**Goal**: Understand placeholders  
**Instructions**:
1. Create an image with blur placeholder
2. Generate blur data URL
3. Test loading behavior
4. Verify placeholder display

### Exercise 2: Dynamic Placeholders
**Difficulty**: Intermediate  
**Goal**: Generate placeholders dynamically  
**Instructions**:
1. Create function to generate blur
2. Use with dynamic images
3. Cache blur data
4. Test performance

## 🎓 Key Takeaways

- Use placeholders for better UX
- Blur placeholders are most common
- Keep blur data small (10px)
- Generate at build time when possible
- Match aspect ratio
- Prevents layout shift

## ❓ FAQ

### Q: Do I need blurDataURL?
**A**: Yes, when using placeholder="blur", you need to provide blurDataURL.

### Q: How do I generate blur data?
**A**: Use libraries like plaiceholder or generate a small base64 version of your image.

### Q: What size should blur be?
**A**: 10px width is recommended for optimal performance.

### Q: Can I use placeholders for external images?
**A**: Yes, but you need to generate the blur data yourself.

### Q: Do placeholders affect performance?
**A**: Small blur placeholders improve perceived performance with minimal impact.

---

**Next Steps**: 
- Review: [next/image Component](./next-image-component.md) for component usage
- Practice: Create images with placeholders
- Build: Optimize image loading in your app

