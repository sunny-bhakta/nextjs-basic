# Responsive Images

> **Category**: Core | **Related Concepts**: [next/image Component](./next-image-component.md), [Image Formats](./image-formats.md)  
> **Last Updated**: 2024

## 📖 Overview

Next.js automatically generates responsive images with srcset, serving appropriately sized images based on the device and viewport. This ensures fast loading times and optimal image quality across all devices.

**Key Points:**
- Automatic srcset generation
- Responsive sizing based on viewport
- Multiple image sizes
- Optimal image delivery
- Better performance on mobile
- Reduced bandwidth usage

## 🎯 When to Use

- **All Images**: Works automatically with next/image
- **Mobile Optimization**: When targeting mobile devices
- **Bandwidth**: When bandwidth is a concern
- **Performance**: When page speed is critical
- **Responsive Design**: When images need to adapt

## 💻 Basic Example

### Simple Responsive Image

```typescript
// app/page.tsx
import Image from 'next/image'

export default function HomePage() {
  return (
    <Image
      src="/banner.jpg"
      alt="Banner"
      width={1920}
      height={1080}
      sizes="100vw" // Full viewport width
    />
  )
}
```

### Responsive Image with Breakpoints

```typescript
// app/components/ResponsiveImage.tsx
import Image from 'next/image'

export default function ResponsiveImage() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero image"
      width={1920}
      height={1080}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="w-full h-auto"
    />
  )
}
```

### Responsive Image in Grid

```typescript
// app/components/ImageGrid.tsx
import Image from 'next/image'

export default function ImageGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image) => (
        <Image
          key={image.id}
          src={image.src}
          alt={image.alt}
          width={800}
          height={600}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-auto"
        />
      ))}
    </div>
  )
}
```

## 🔧 Advanced Example

### Complex Responsive Sizes

```typescript
// app/components/ComplexResponsiveImage.tsx
import Image from 'next/image'

export default function ComplexResponsiveImage() {
  return (
    <Image
      src="/featured.jpg"
      alt="Featured image"
      width={2400}
      height={1600}
      sizes="
        (max-width: 640px) 100vw,
        (max-width: 768px) 90vw,
        (max-width: 1024px) 80vw,
        (max-width: 1280px) 70vw,
        60vw
      "
      className="w-full h-auto"
    />
  )
}
```

### Responsive Image with Fill

```typescript
// app/components/ResponsiveFillImage.tsx
import Image from 'next/image'

export default function ResponsiveFillImage() {
  return (
    <div className="relative w-full aspect-video">
      <Image
        src="/video-thumbnail.jpg"
        alt="Video thumbnail"
        fill
        sizes="100vw"
        className="object-cover"
      />
    </div>
  )
}
```

### Responsive Image Gallery

```typescript
// app/components/ImageGallery.tsx
import Image from 'next/image'

interface ImageItem {
  id: number
  src: string
  alt: string
}

export default function ImageGallery({ images }: { images: ImageItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {images.map((image) => (
        <div key={image.id} className="relative aspect-square">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover rounded-lg"
          />
        </div>
      ))}
    </div>
  )
}
```

## 📋 Common Patterns

### Pattern 1: Full Width
```typescript
<Image
  src="/image.jpg"
  alt="Image"
  width={1920}
  height={1080}
  sizes="100vw"
/>
```
**When to use**: Full-width images

### Pattern 2: Container Width
```typescript
<Image
  src="/image.jpg"
  alt="Image"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```
**When to use**: Images in containers

### Pattern 3: Grid Layout
```typescript
<Image
  src="/image.jpg"
  alt="Image"
  width={600}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```
**When to use**: Images in grid layouts

## ⚠️ Common Mistakes

### Mistake 1: Not Using sizes Prop
```typescript
// ❌ Wrong: Missing sizes
<Image
  src="/image.jpg"
  alt="Image"
  width={1920}
  height={1080}
/>
// May load larger image than needed
```
**Why**: Without sizes, Next.js can't optimize for viewport.

```typescript
// ✅ Correct: Include sizes
<Image
  src="/image.jpg"
  alt="Image"
  width={1920}
  height={1080}
  sizes="100vw"
/>
```

### Mistake 2: Wrong sizes Values
```typescript
// ❌ Wrong: Incorrect sizes
<Image
  src="/image.jpg"
  alt="Image"
  width={800}
  height={600}
  sizes="800px" // Fixed size, not responsive
/>
```
**Why**: Fixed sizes don't adapt to viewport.

```typescript
// ✅ Correct: Responsive sizes
<Image
  src="/image.jpg"
  alt="Image"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### Mistake 3: Not Matching Layout
```typescript
// ❌ Wrong: sizes doesn't match CSS
// CSS: grid-cols-3 (33.33% each)
<Image sizes="50vw" />
```
**Why**: sizes should match actual rendered size.

```typescript
// ✅ Correct: Match sizes to layout
// CSS: grid-cols-3
<Image sizes="(max-width: 768px) 100vw, 33vw" />
```

## ✨ Best Practices

1. **Always use sizes**: For responsive images
2. **Match CSS layout**: sizes should match actual rendered size
3. **Use viewport units**: vw units in sizes prop
4. **Test on devices**: Verify on different screen sizes
5. **Optimize breakpoints**: Match your design breakpoints
6. **Consider aspect ratios**: Use aspect-ratio for containers

## 🔗 Related Concepts

- [next/image Component](./next-image-component.md) - Image component
- [Image Formats](./image-formats.md) - Image formats

## 📚 Resources

### Official Documentation
- [Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)

## 🧪 Practice Exercises

### Exercise 1: Basic Responsive Image
**Difficulty**: Beginner  
**Goal**: Understand responsive images  
**Instructions**:
1. Create a responsive image
2. Add sizes prop
3. Test on different screen sizes
4. Verify srcset generation

### Exercise 2: Complex Layout
**Difficulty**: Intermediate  
**Goal**: Practice complex responsive layouts  
**Instructions**:
1. Create a grid layout
2. Add responsive images
3. Match sizes to layout
4. Test on all breakpoints

## 🎓 Key Takeaways

- Use sizes prop for responsive images
- Match sizes to actual rendered size
- Next.js generates srcset automatically
- Test on different devices
- Optimize for mobile first
- Consider bandwidth usage

## ❓ FAQ

### Q: Do I need to provide sizes?
**A**: Yes, for responsive images. It helps Next.js serve the right size.

### Q: How do I know what sizes to use?
**A**: Match sizes to your CSS layout. If image is 50% width, use "50vw".

### Q: What if I don't provide sizes?
**A**: Next.js will still optimize, but may serve larger images than needed.

### Q: Can I use fixed sizes?
**A**: Yes, but responsive sizes are better for performance.

### Q: How does srcset work?
**A**: Next.js automatically generates srcset with multiple image sizes based on your sizes prop.

---

**Next Steps**: 
- Review: [next/image Component](./next-image-component.md) for component usage
- Practice: Create responsive image layouts
- Build: Optimize images in your app

