# Deployment

> **Category**: Intermediate | **Priority**: 🔴 High | **Difficulty**: Intermediate  
> **Related Concepts**: [Build & Production](../40-build-production/README.md)  
> **Status**: ✅ In Progress

## Overview

Deploying Next.js applications to various platforms and environments.

## Key Topics

- [Deployment Guide](./deployment-guide.md) - Comprehensive deployment guide
- Vercel Deployment - Deploying to Vercel
- Static Export - Exporting static site
- Docker Deployment - Containerized deployment
- Serverless Deployment - Deploying to serverless platforms
- Environment-Specific Builds - Different builds for different environments

## Documentation

### Detailed Guides

1. **[Deployment Guide](./deployment-guide.md)**
   - Vercel deployment
   - Docker deployment
   - Static export
   - Serverless deployment

## Examples

See the [examples directory](./examples/) for complete deployment examples:

- `01-vercel-deployment.md` - Vercel deployment guide
- `02-docker-deployment.md` - Docker setup and deployment
- `03-static-export.md` - Static site export

## Quick Start

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

## Resources

- [Deployment Docs](https://nextjs.org/docs/app/building-your-application/deploying)

---

**Previous**: [Testing](../24-testing/README.md) | **Next**: [Error Handling](../26-error-handling/README.md)

