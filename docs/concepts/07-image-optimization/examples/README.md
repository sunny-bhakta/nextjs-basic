# Image Optimization Examples

This directory contains practical code examples demonstrating Next.js image optimization concepts.

## Examples

### 1. Basic Image (`01-basic-image.tsx`)
Demonstrates basic next/image usage:
- Simple image
- Product image component
- Priority image (above-the-fold)
- Fill image (fills container)

### 2. Responsive Images (`02-responsive-images.tsx`)
Shows responsive image handling:
- Full-width responsive image
- Images in responsive grid
- Complex responsive sizes
- Responsive image with fill

### 3. Placeholders (`03-placeholders.tsx`)
Demonstrates image placeholders:
- Blur placeholder
- Empty placeholder
- Loading state with placeholder
- Gallery image with placeholder

### 4. External Images (`04-external-images.tsx`)
Shows external image handling:
- External image with domain config
- CDN images
- External image with placeholder
- Dynamic external images

### 5. Image Gallery (`05-image-gallery.tsx`)
Demonstrates building image galleries:
- Responsive image gallery
- Product image gallery
- Lightbox gallery

### 6. Complete Example (`06-complete-example.tsx`)
A comprehensive example combining:
- All image optimization concepts
- Hero image with priority
- Product grid
- Image gallery
- Reusable optimized image component

## How to Use

1. **Copy the code** from any example file
2. **Create the corresponding files** in your `app/` directory
3. **Add images** to your `public/` folder
4. **Configure external domains** in `next.config.js` if needed
5. **Run your Next.js app**: `npm run dev`
6. **Test images**:
   - Check image loading
   - Verify responsive behavior
   - Test placeholders
   - Check network tab for optimized formats

## File Structure

When implementing these examples, your structure should look like:

```
app/
├── page.tsx                    # Home page
├── components/
│   ├── hero-image.tsx          # Hero image component
│   ├── product-grid.tsx        # Product grid
│   ├── image-gallery.tsx       # Image gallery
│   └── optimized-image.tsx    # Reusable component
public/
├── hero.jpg                    # Hero image
├── products/
│   ├── product1.jpg
│   └── product2.jpg
└── gallery/
    ├── image1.jpg
    └── image2.jpg
next.config.js                  # Image domain configuration
```

## Key Concepts Demonstrated

### next/image Component
- Automatic image optimization
- Modern format support (WebP, AVIF)
- Lazy loading by default
- Responsive images with srcset

### Responsive Images
- `sizes` prop for responsive sizing
- Automatic srcset generation
- Viewport-based image selection
- Mobile-first optimization

### Placeholders
- Blur placeholders
- Empty placeholders
- Loading states
- Base64 encoded blur data

### External Images
- Domain configuration
- Remote patterns
- CDN support
- Security considerations

## Configuration

### next.config.js

```javascript
module.exports = {
  images: {
    // External image domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/images/**',
      },
    ],
    // Image formats
    formats: ['image/avif', 'image/webp'],
    // Device sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}
```

## Best Practices

1. **Always use next/image**: For all images in your app
2. **Provide dimensions**: Width and height (or use fill)
3. **Use priority**: For above-the-fold images
4. **Add sizes prop**: For responsive images
5. **Use placeholders**: For better UX
6. **Configure domains**: For external images
7. **Optimize quality**: Balance quality and file size

## Testing

1. **Check Network Tab**:
   - Verify WebP/AVIF delivery
   - Check image sizes
   - Verify lazy loading

2. **Test Responsiveness**:
   - Resize browser window
   - Check on mobile devices
   - Verify correct image sizes

3. **Test Placeholders**:
   - Slow down network (DevTools)
   - Verify placeholder display
   - Check loading states

## Common Issues

### Issue 1: Missing width/height
**Solution**: Always provide width and height (or use fill prop)

### Issue 2: External images not loading
**Solution**: Configure domain in `next.config.js`

### Issue 3: Layout shift
**Solution**: Use placeholders and provide dimensions

### Issue 4: Large file sizes
**Solution**: Adjust quality prop and use modern formats

## Next Steps

After trying these examples:
1. Optimize images in your app
2. Add placeholders to all images
3. Configure external image domains
4. Test on different devices
5. Monitor image performance
6. Explore the [detailed guides](../README.md) for more information

