# next/image Component

> **Category**: Core | **Related Concepts**: [Image Formats](./image-formats.md), [Responsive Images](./responsive-images.md)  
> **Last Updated**: 2024

## 📖 Overview

The `next/image` component is Next.js's built-in image optimization component. It automatically optimizes images, serves them in modern formats, and provides lazy loading, responsive sizing, and placeholder support.

**Key Points:**
- Automatic image optimization
- Modern format support (WebP, AVIF)
- Lazy loading by default
- Responsive images with srcset
- Placeholder support
- Built-in performance optimizations

## 🎯 When to Use

- **All Images**: Use for all images in your app
- **Performance**: When you need optimized images
- **Responsive Design**: When images need to adapt to screen sizes
- **SEO**: When images are important for SEO
- **User Experience**: When you want fast-loading images

## 💻 Basic Example

### Simple Image

```typescript
// app/page.tsx
import Image from 'next/image'

export default function HomePage() {
  return (
    <div>
      <Image
        src="/hero.jpg"
        alt="Hero image"
        width={800}
        height={600}
      />
    </div>
  )
}
```

### Image with Priority

```typescript
// app/page.tsx
import Image from 'next/image'

export default function HomePage() {
  return (
    <div>
      <Image
        src="/hero.jpg"
        alt="Hero image"
        width={800}
        height={600}
        priority // Load immediately, don't lazy load
      />
    </div>
  )
}
```

### Image with Fill

```typescript
// app/components/HeroImage.tsx
import Image from 'next/image'

export default function HeroImage() {
  return (
    <div className="relative w-full h-96">
      <Image
        src="/hero.jpg"
        alt="Hero image"
        fill
        className="object-cover"
      />
    </div>
  )
}
```

## 🔧 Advanced Example

### Image with Placeholder

```typescript
// app/components/ProductImage.tsx
import Image from 'next/image'

export default function ProductImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={500}
      height={500}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..." // Base64 encoded blur placeholder
    />
  )
}
```

### Responsive Image

```typescript
// app/components/ResponsiveImage.tsx
import Image from 'next/image'

export default function ResponsiveImage() {
  return (
    <Image
      src="/banner.jpg"
      alt="Banner"
      width={1920}
      height={1080}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="w-full h-auto"
    />
  )
}
```

### External Image

```typescript
// app/components/ExternalImage.tsx
import Image from 'next/image'

export default function ExternalImage() {
  return (
    <Image
      src="https://example.com/image.jpg"
      alt="External image"
      width={800}
      height={600}
      // Must configure domain in next.config.js
    />
  )
}
```

## 📋 Common Patterns

### Pattern 1: Static Image
```typescript
<Image src="/image.jpg" alt="Image" width={800} height={600} />
```
**When to use**: Local images in public folder

### Pattern 2: Fill Container
```typescript
<div className="relative w-full h-64">
  <Image src="/image.jpg" alt="Image" fill className="object-cover" />
</div>
```
**When to use**: Images that fill their container

### Pattern 3: Responsive Image
```typescript
<Image
  src="/image.jpg"
  alt="Image"
  width={1920}
  height={1080}
  sizes="100vw"
/>
```
**When to use**: Full-width responsive images

## ⚠️ Common Mistakes

### Mistake 1: Not Providing Width/Height
```typescript
// ❌ Wrong: Missing dimensions
<Image src="/image.jpg" alt="Image" />
```
**Why**: Width and height are required (except with fill).

```typescript
// ✅ Correct: Provide dimensions
<Image src="/image.jpg" alt="Image" width={800} height={600} />
```

### Mistake 2: Using Regular img Tag
```typescript
// ❌ Wrong: Using regular img
<img src="/image.jpg" alt="Image" />
```
**Why**: Doesn't get Next.js optimizations.

```typescript
// ✅ Correct: Use next/image
<Image src="/image.jpg" alt="Image" width={800} height={600} />
```

### Mistake 3: Not Configuring External Domains
```typescript
// ❌ Wrong: External image without config
<Image src="https://example.com/image.jpg" alt="Image" width={800} height={600} />
```
**Why**: External images need domain configuration.

```typescript
// ✅ Correct: Configure in next.config.js
// next.config.js
module.exports = {
  images: {
    domains: ['example.com'],
  },
}
```

## ✨ Best Practices

1. **Always use next/image**: For all images in your app
2. **Provide dimensions**: Width and height (or use fill)
3. **Use priority**: For above-the-fold images
4. **Add alt text**: For accessibility
5. **Use placeholders**: For better UX
6. **Configure domains**: For external images
7. **Optimize sizes**: Use appropriate sizes prop

## 🔗 Related Concepts

- [Image Formats](./image-formats.md) - Modern image formats
- [Responsive Images](./responsive-images.md) - Responsive image handling
- [Placeholders](./placeholders.md) - Image placeholders

## 📚 Resources

### Official Documentation
- [Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)

## 🧪 Practice Exercises

### Exercise 1: Basic Image
**Difficulty**: Beginner  
**Goal**: Understand next/image basics  
**Instructions**:
1. Create a page with an image
2. Add width and height
3. Add alt text
4. Test the image

### Exercise 2: Responsive Images
**Difficulty**: Intermediate  
**Goal**: Practice responsive images  
**Instructions**:
1. Create responsive images
2. Use sizes prop
3. Test on different screen sizes
4. Verify srcset generation

## 🎓 Key Takeaways

- Use `next/image` for all images
- Provide width and height (or use fill)
- Use priority for above-the-fold images
- Configure external image domains
- Use placeholders for better UX
- Add alt text for accessibility

## ❓ FAQ

### Q: Do I need to provide width and height?
**A**: Yes, unless you use the `fill` prop. This prevents layout shift.

### Q: Can I use external images?
**A**: Yes, but you need to configure the domain in `next.config.js`.

### Q: How do I make images load immediately?
**A**: Use the `priority` prop for above-the-fold images.

### Q: What formats are supported?
**A**: Next.js automatically serves WebP and AVIF when supported by the browser.

### Q: Can I use CSS to style images?
**A**: Yes, use the `className` prop to add CSS classes.

---

**Next Steps**: 
- Review: [Image Formats](./image-formats.md) for format details
- Practice: Create pages with optimized images
- Build: A gallery with optimized images

