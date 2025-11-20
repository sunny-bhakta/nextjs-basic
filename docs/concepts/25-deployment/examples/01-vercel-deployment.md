# Vercel Deployment Guide

## Overview

Vercel is the recommended platform for deploying Next.js applications. It provides zero-configuration deployment with automatic optimizations.

## Prerequisites

- Next.js application
- Vercel account (free tier available)
- Git repository (optional, for automatic deployments)

## Deployment Methods

### Method 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Method 2: GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure project settings
6. Deploy

## Configuration

### vercel.json

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "DATABASE_URL": "@database-url"
  }
}
```

## Environment Variables

### Setting Environment Variables

```bash
# Via CLI
vercel env add DATABASE_URL

# Via Dashboard
# Go to Project Settings > Environment Variables
```

### Environment-Specific Variables

- **Production**: `vercel env add VARIABLE production`
- **Preview**: `vercel env add VARIABLE preview`
- **Development**: `vercel env add VARIABLE development`

## Custom Domains

1. Go to Project Settings > Domains
2. Add your domain
3. Configure DNS records
4. Wait for verification

## Deployment Workflow

```bash
# 1. Build locally (optional)
npm run build

# 2. Deploy to preview
vercel

# 3. Test preview deployment

# 4. Deploy to production
vercel --prod
```

## Automatic Deployments

With GitHub integration:
- **Push to main**: Deploys to production
- **Pull requests**: Creates preview deployments
- **Branch pushes**: Creates preview deployments

## Monitoring

- View deployment logs in Vercel dashboard
- Check build logs for errors
- Monitor function execution
- View analytics and performance

## Troubleshooting

### Build Failures

```bash
# Check build logs
vercel logs

# Test build locally
npm run build
```

### Environment Variables

```bash
# List environment variables
vercel env ls

# Pull environment variables
vercel env pull .env.local
```

## Best Practices

1. **Use preview deployments**: Test before production
2. **Set environment variables**: In Vercel dashboard
3. **Monitor deployments**: Check logs regularly
4. **Use custom domains**: For production
5. **Enable analytics**: Track performance

