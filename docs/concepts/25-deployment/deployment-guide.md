# Deployment Guide

> **Category**: Intermediate | **Related Concepts**: [Build & Production](../40-build-production/README.md)  
> **Last Updated**: 2024

## 📖 Overview

Deploying Next.js applications involves building the application and deploying it to a hosting platform. Next.js supports multiple deployment options, from serverless platforms to traditional servers.

**Key Points:**
- Vercel (recommended) - Zero-config deployment
- Docker - Containerized deployment
- Static export - Static site generation
- Serverless - AWS Lambda, etc.
- Custom servers - Node.js server

## 🎯 When to Use

- **Vercel**: Easiest deployment, best for Next.js
- **Docker**: Need containerization, Kubernetes
- **Static Export**: Fully static sites
- **Serverless**: Cost-effective, auto-scaling
- **Custom Server**: Need full control

## 💻 Basic Example

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod

# Or connect GitHub repo for automatic deployments
```

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### Static Export

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

```bash
# Build static site
npm run build

# Output in 'out' directory
```

## 🔧 Advanced Example

### Environment-Specific Builds

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // Different configs for different environments
  ...(process.env.NODE_ENV === 'production' && {
    compress: true,
    swcMinify: true,
  }),
}

module.exports = nextConfig
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
    volumes:
      - ./.env.local:/app/.env.local
```

## 📋 Common Patterns

### Pattern 1: Vercel Deployment
```bash
vercel --prod
```
**When to use**: Easiest option, recommended for Next.js

### Pattern 2: Docker
```dockerfile
FROM node:18-alpine
# ... build steps
```
**When to use**: Need containerization

### Pattern 3: Static Export
```javascript
output: 'export'
```
**When to use**: Fully static sites

## ⚠️ Common Mistakes

### Mistake 1: Not Setting Environment Variables
```bash
# ❌ Wrong: Missing env vars
vercel --prod
```

```bash
# ✅ Correct: Set environment variables
vercel env add DATABASE_URL
vercel --prod
```
**Why**: Application needs environment variables.

### Mistake 2: Not Optimizing Build
```javascript
// ❌ Wrong: No optimization
const nextConfig = {}
```

```javascript
// ✅ Correct: Enable optimizations
const nextConfig = {
  swcMinify: true,
  compress: true
}
```
**Why**: Optimizations improve performance.

## ✨ Best Practices

1. **Use Vercel**: Easiest and best for Next.js
2. **Set environment variables**: In deployment platform
3. **Enable optimizations**: Compression, minification
4. **Test production build**: Before deploying
5. **Monitor deployments**: Check logs and metrics
6. **Use CI/CD**: Automate deployments
7. **Backup data**: Before major deployments

## 🔗 Related Concepts

- [Build & Production](../40-build-production/README.md) - Build configuration
- [Environment Variables](../12-environment-variables/README.md) - Environment setup

## 📚 Resources

### Official Documentation
- [Deployment](https://nextjs.org/docs/app/building-your-application/deploying)

### Platforms
- [Vercel](https://vercel.com/)
- [Docker](https://www.docker.com/)
- [AWS](https://aws.amazon.com/)

## 🎓 Key Takeaways

- Vercel is the easiest deployment option
- Docker for containerized deployments
- Static export for fully static sites
- Set environment variables properly
- Test production builds locally
- Monitor deployments after going live

