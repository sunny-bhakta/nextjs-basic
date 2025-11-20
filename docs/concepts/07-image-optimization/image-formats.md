# Image Formats

> **Category**: Core | **Related Concepts**: [next/image Component](./next-image-component.md), [Performance Optimization](../22-performance-optimization/README.md)  
> **Last Updated**: 2024

## 📖 Overview

Next.js automatically serves images in modern formats (WebP and AVIF) when supported by the browser, falling back to the original format if needed. This significantly reduces image file sizes and improves page load times.

**Key Points:**
- Automatic format conversion
- WebP support (smaller file sizes)
- AVIF support (even smaller file sizes)
- Automatic fallback to original format
- Browser detection
- No configuration needed

## 🎯 When to Use

- **All Images**: Works automatically with next/image
- **Performance**: When you need smaller file sizes
- **Modern Browsers**: When targeting modern browsers
- **Bandwidth**: When bandwidth is a concern
- **SEO**: When page speed affects SEO

## 💻 Basic Example

### Automatic Format Conversion

```typescript
// app/page.tsx
import Image from 'next/image'

export default function HomePage() {
  // Next.js automatically serves WebP/AVIF when supported
  return (
    <Image
      src="/photo.jpg"
      alt="Photo"
      width={800}
      height={600}
    />
  )
}
```

### Format Detection

```typescript
// app/components/OptimizedImage.tsx
import Image from 'next/image'

export default function OptimizedImage({ src, alt }: { src: string; alt: string }) {
  // Browser automatically receives best format:
  // - AVIF if supported (smallest)
  // - WebP if AVIF not supported (smaller)
  // - Original format as fallback
  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={600}
    />
  )
}
```

## 🔧 Advanced Example

### Custom Format Configuration

```typescript
// next.config.js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // Only serve AVIF and WebP, no fallback
  },
}
```

### Format with Quality Settings

```typescript
// app/components/HighQualityImage.tsx
import Image from 'next/image'

export default function HighQualityImage() {
  return (
    <Image
      src="/photo.jpg"
      alt="Photo"
      width={800}
      height={600}
      quality={100} // Maximum quality (default is 75)
    />
  )
}
```

### Format Comparison

```typescript
// app/components/FormatComparison.tsx
import Image from 'next/image'

export default function FormatComparison() {
  return (
    <div>
      <h2>Original (JPEG)</h2>
      <img src="/photo.jpg" alt="Original" width={800} height={600} />
      <p>Size: ~500KB</p>
      
      <h2>Optimized (WebP/AVIF)</h2>
      <Image
        src="/photo.jpg"
        alt="Optimized"
        width={800}
        height={600}
      />
      <p>Size: ~150KB (WebP) or ~100KB (AVIF)</p>
    </div>
  )
}
```

## 📋 Common Patterns

### Pattern 1: Default Format
```typescript
<Image src="/image.jpg" alt="Image" width={800} height={600} />
// Automatically serves best format
```
**When to use**: Most cases - automatic optimization

### Pattern 2: Quality Control
```typescript
<Image
  src="/image.jpg"
  alt="Image"
  width={800}
  height={600}
  quality={90}
/>
```
**When to use**: When you need specific quality

### Pattern 3: Format Restriction
```typescript
// next.config.js
images: {
  formats: ['image/webp'], // Only WebP, no AVIF
}
```
**When to use**: When you want to restrict formats

## ⚠️ Common Mistakes

### Mistake 1: Not Using next/image
```typescript
// ❌ Wrong: Regular img tag
<img src="/photo.jpg" alt="Photo" />
// No format optimization
```
**Why**: Regular img tags don't get format optimization.

```typescript
// ✅ Correct: Use next/image
<Image src="/photo.jpg" alt="Photo" width={800} height={600} />
// Automatic format optimization
```

### Mistake 2: Using Wrong Quality
```typescript
// ❌ Wrong: Too high quality
<Image src="/photo.jpg" alt="Photo" width={800} height={600} quality={100} />
// Large file size
```
**Why**: Quality 100 creates unnecessarily large files.

```typescript
// ✅ Correct: Balanced quality
<Image src="/photo.jpg" alt="Photo" width={800} height={600} quality={75} />
// Good balance of quality and size
```

### Mistake 3: Not Understanding Fallback
```typescript
// ❌ Wrong: Expecting AVIF everywhere
// AVIF might not be supported in all browsers
```
**Why**: Browsers without AVIF support get WebP or original.

```typescript
// ✅ Correct: Trust automatic fallback
// Next.js handles format selection automatically
```

## ✨ Best Practices

1. **Use next/image**: Automatic format optimization
2. **Trust defaults**: Default quality (75) is usually good
3. **Let Next.js decide**: Automatic format selection
4. **Test in browsers**: Verify format delivery
5. **Monitor file sizes**: Check actual delivered sizes
6. **Use appropriate quality**: Adjust quality based on needs

## 🔗 Related Concepts

- [next/image Component](./next-image-component.md) - Image component
- [Performance Optimization](../22-performance-optimization/README.md) - Performance

## 📚 Resources

### Official Documentation
- [Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)

## 🧪 Practice Exercises

### Exercise 1: Format Comparison
**Difficulty**: Beginner  
**Goal**: Understand format differences  
**Instructions**:
1. Create images with different formats
2. Compare file sizes
3. Test in different browsers
4. Verify format delivery

### Exercise 2: Quality Optimization
**Difficulty**: Intermediate  
**Goal**: Find optimal quality settings  
**Instructions**:
1. Test different quality values
2. Compare file sizes and visual quality
3. Find optimal balance
4. Document findings

## 🎓 Key Takeaways

- Next.js automatically serves modern formats
- WebP and AVIF are smaller than JPEG/PNG
- Automatic fallback to original format
- Quality setting affects file size
- No configuration needed for basic use
- Format selection is automatic

## ❓ FAQ

### Q: What formats does Next.js support?
**A**: Next.js automatically serves WebP and AVIF when supported, with fallback to original format.

### Q: Do I need to configure formats?
**A**: No, format selection is automatic. You can restrict formats in config if needed.

### Q: What's the default quality?
**A**: Default quality is 75, which provides a good balance of quality and file size.

### Q: Can I disable format conversion?
**A**: Yes, but not recommended. Format conversion significantly reduces file sizes.

### Q: Which format is best?
**A**: AVIF is smallest, WebP is widely supported, original format is fallback. Next.js chooses automatically.

---

**Next Steps**: 
- Review: [next/image Component](./next-image-component.md) for component usage
- Practice: Create images with different formats
- Build: Optimize images in your app

