# Build & Production

> **Category**: Advanced | **Related Concepts**: [Deployment](../25-deployment/README.md), [Configuration](../31-configuration/README.md)  
> **Last Updated**: 2024

## 📖 Overview

The Next.js build process compiles your application for production. Understanding build configuration, optimizations, and production best practices ensures optimal performance.

**Key Points:**
- Build process and stages
- Production optimizations
- Bundle size optimization
- Tree shaking
- Code minification
- Performance monitoring

## 🎯 When to Use

- **Production Builds**: Before deployment
- **Performance**: Optimizing for speed
- **Bundle Size**: Reducing JavaScript size
- **Monitoring**: Tracking production metrics
- **Debugging**: Production error tracking

## 💻 Basic Example

### Build Command

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start
```

### Build Configuration

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production optimizations
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  
  // Output configuration
  output: 'standalone', // For Docker
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
  }
}

module.exports = nextConfig
```

## 🔧 Advanced Example

### Bundle Analysis

```bash
# Install analyzer
npm install @next/bundle-analyzer

# Analyze bundle
ANALYZE=true npm run build
```

### Production Environment

```javascript
// next.config.js
const nextConfig = {
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // Different configs for production
  ...(process.env.NODE_ENV === 'production' && {
    compress: true,
    swcMinify: true,
  }),
}
```

## 📋 Common Patterns

### Pattern 1: Environment-Specific Builds
```javascript
const isProd = process.env.NODE_ENV === 'production'
```
**When to use**: Different configs per environment

### Pattern 2: Bundle Optimization
```javascript
webpack: (config) => {
  config.optimization.minimize = true
  return config
}
```
**When to use**: Custom optimization

### Pattern 3: Output Configuration
```javascript
output: 'standalone'
```
**When to use**: Docker deployments

## ⚠️ Common Mistakes

### Mistake 1: Not Testing Production Build
```bash
# ❌ Wrong: Deploy without testing
npm run build
# Deploy immediately
```

```bash
# ✅ Correct: Test production build
npm run build
npm start
# Test locally, then deploy
```
**Why**: Production builds can differ from development.

### Mistake 2: Not Optimizing Images
```typescript
// ❌ Wrong: Unoptimized images
<img src="/large-image.jpg" />
```

```typescript
// ✅ Correct: Optimized images
<Image src="/large-image.jpg" width={800} height={600} />
```
**Why**: Images are often the largest assets.

## ✨ Best Practices

1. **Test production builds**: Before deploying
2. **Optimize bundle size**: Remove unused code
3. **Use production mode**: Set NODE_ENV
4. **Monitor performance**: Track metrics
5. **Enable compression**: Gzip/Brotli
6. **Optimize images**: Use Next.js Image
7. **Cache assets**: Set cache headers

## 🔗 Related Concepts

- [Deployment](../25-deployment/README.md) - Deployment strategies
- [Performance Optimization](../22-performance-optimization/README.md) - Performance

## 📚 Resources

### Official Documentation
- [Build & Production](https://nextjs.org/docs/app/building-your-application/configuring/build)

## 🎓 Key Takeaways

- Test production builds locally
- Optimize bundle size
- Enable production optimizations
- Monitor performance
- Use compression
- Optimize images
- Set proper cache headers

