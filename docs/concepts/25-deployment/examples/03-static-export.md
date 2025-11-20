# Static Export Guide

## Overview

Next.js can export a fully static site that can be hosted on any static hosting service like GitHub Pages, Netlify, or AWS S3.

## Configuration

### next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true // Required for static export
  },
  // Optional: Set base path
  // basePath: '/my-app',
  // Optional: Set trailing slash
  // trailingSlash: true,
}

module.exports = nextConfig
```

## Building Static Site

```bash
# Build static site
npm run build

# Output will be in 'out' directory
```

## Deployment Options

### GitHub Pages

```bash
# 1. Build the site
npm run build

# 2. Push 'out' directory to gh-pages branch
# Or use GitHub Actions for automatic deployment
```

### Netlify

```bash
# 1. Install Netlify CLI
npm i -g netlify-cli

# 2. Deploy
netlify deploy --prod --dir=out
```

### AWS S3 + CloudFront

```bash
# 1. Build
npm run build

# 2. Sync to S3
aws s3 sync out/ s3://your-bucket-name

# 3. Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

## Limitations

### What Doesn't Work

- API Routes (use external API)
- Server Components with dynamic data
- Image Optimization (use unoptimized)
- Incremental Static Regeneration
- Middleware

### Workarounds

- Use external API for data fetching
- Pre-render all pages at build time
- Use client-side data fetching
- Use external image hosting

## Example Configuration

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  // Generate static pages
  generateStaticParams: async () => {
    return [
      { slug: 'page1' },
      { slug: 'page2' }
    ]
  }
}

module.exports = nextConfig
```

## Best Practices

1. **Pre-render all pages**: At build time
2. **Use client-side fetching**: For dynamic data
3. **Optimize images**: Before build or use external hosting
4. **Test locally**: Before deploying
5. **Use CDN**: For better performance

