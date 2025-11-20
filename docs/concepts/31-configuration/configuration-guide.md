# Configuration

> **Category**: Advanced | **Related Concepts**: [Build & Production](../40-build-production/README.md), [Plugins & Extensions](../32-plugins-extensions/README.md)  
> **Last Updated**: 2024

## 📖 Overview

Configuration in Next.js allows you to customize build behavior, optimize performance, manage environment variables, and extend functionality through `next.config.js` and other configuration files.

**Key Points:**
- next.config.js for build and runtime configuration
- Webpack customization for advanced bundling
- TypeScript configuration for type safety
- ESLint/Prettier for code quality
- Environment variables for different environments
- Custom server for advanced use cases

## 🎯 When to Use

- **Custom Build Settings**: Modify webpack, add plugins
- **Image Optimization**: Configure image domains and formats
- **Environment Variables**: Manage different configs per environment
- **TypeScript**: Configure strict typing and path aliases
- **Code Quality**: Set up linting and formatting
- **Custom Server**: Need custom server logic
- **Performance**: Optimize bundle size and build times

## 💻 Basic Example

### next.config.js

```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Image optimization
  images: {
    domains: ['example.com', 'cdn.example.com'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true,
      },
    ]
  },
  
  // Rewrites
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ]
  },
}

module.exports = nextConfig
```

### TypeScript Configuration

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## 🔧 Advanced Example

### Webpack Customization

```typescript
// next.config.js
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add custom webpack plugin
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.CUSTOM_BUILD_ID': JSON.stringify(buildId),
      })
    )
    
    // Modify existing rules
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    
    return config
  },
}

module.exports = nextConfig
```

### Environment-Specific Configuration

```typescript
// next.config.js
const nextConfig = {
  // Production optimizations
  ...(process.env.NODE_ENV === 'production' && {
    compress: true,
    poweredByHeader: false,
    generateEtags: false,
  }),
  
  // Development settings
  ...(process.env.NODE_ENV === 'development' && {
    reactStrictMode: true,
  }),
  
  // Custom headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
```

### Custom Server

```typescript
// server.js
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
```

## 📋 Common Patterns

### Pattern 1: Path Aliases
```typescript
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/utils/*": ["./utils/*"]
    }
  }
}
```
**When to use**: Cleaner imports and better organization

### Pattern 2: Environment Variables
```typescript
// next.config.js
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY,
  },
}
```
**When to use**: Exposing environment variables to the client

### Pattern 3: Image Domains
```typescript
// next.config.js
const nextConfig = {
  images: {
    domains: ['example.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.example.com',
      },
    ],
  },
}
```
**When to use**: Loading images from external sources

## ⚠️ Common Mistakes

### Mistake 1: Exposing Sensitive Data
```typescript
// ❌ Wrong: Exposing secrets in env
const nextConfig = {
  env: {
    SECRET_KEY: process.env.SECRET_KEY, // Exposed to client!
  },
}
```

```typescript
// ✅ Correct: Use server-side only
// Only access in API routes or Server Components
const secret = process.env.SECRET_KEY // Server-side only
```
**Why**: Client-side env variables are exposed in the bundle.

### Mistake 2: Not Using TypeScript for Config
```typescript
// ❌ Wrong: No type safety
const nextConfig = {
  reactStrictMode: true,
  // Typo won't be caught
  reactStrictMod: true,
}
```

```typescript
// ✅ Correct: TypeScript config
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
```
**Why**: TypeScript catches configuration errors.

### Mistake 3: Not Restarting Dev Server
```typescript
// ❌ Wrong: Changes to next.config.js require restart
// But forgetting to restart
```

```typescript
// ✅ Correct: Always restart after config changes
// npm run dev (restart required)
```
**Why**: Config changes only take effect after restart.

## ✨ Best Practices

1. **Use TypeScript annotations**: `/** @type {import('next').NextConfig} */`
2. **Validate environment variables**: Check required vars at startup
3. **Optimize images**: Configure domains and formats
4. **Use path aliases**: Cleaner imports with `@/` paths
5. **Secure headers**: Add security headers in production
6. **Conditional config**: Different settings for dev/prod
7. **Document custom config**: Comment complex configurations
8. **Test config changes**: Verify in development first

## 🔗 Related Concepts

- [Plugins & Extensions](../32-plugins-extensions/README.md) - Extending Next.js
- [Environment Variables](../12-environment-variables/README.md) - Managing env vars
- [Build & Production](../40-build-production/README.md) - Production builds

## 📚 Resources

### Official Documentation
- [Next.js Configuration](https://nextjs.org/docs/app/api-reference/next-config-js)
- [TypeScript Configuration](https://nextjs.org/docs/app/building-your-application/configuring/typescript)
- [Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

### Tutorials
- [Next.js Config Deep Dive](https://nextjs.org/docs/app/api-reference/next-config-js) - Official guide

## 🎓 Key Takeaways

- next.config.js is the main configuration file
- TypeScript config enables type safety
- Webpack can be customized for advanced needs
- Environment variables need careful handling
- Custom servers enable advanced use cases
- Always restart dev server after config changes
- Use path aliases for cleaner imports

