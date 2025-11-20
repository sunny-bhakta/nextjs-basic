# Configuration

> **Category**: Advanced | **Priority**: 🟡 Medium | **Difficulty**: Intermediate  
> **Related Concepts**: [Build & Production](../40-build-production/README.md), [Plugins & Extensions](../32-plugins-extensions/README.md)  
> **Status**: ✅ In Progress

## Overview

Configuring Next.js applications through `next.config.js` and other configuration files to customize build behavior, optimize performance, and extend functionality.

## Key Topics

- [Configuration Guide](./configuration-guide.md) - Comprehensive configuration guide
- `next.config.js` - Main configuration file
- Webpack Configuration - Customizing Webpack
- TypeScript Configuration - TypeScript settings
- ESLint Configuration - Linting configuration
- Custom Server Setup - Custom Node.js server
- Environment Variables - Managing environment configuration

## Documentation

### Detailed Guides

1. **[Configuration Guide](./configuration-guide.md)**
   - next.config.js options
   - Webpack customization
   - TypeScript configuration
   - ESLint/Prettier setup
   - Custom server implementation

## Examples

See the [examples directory](./examples/) for complete code examples:

- `01-next-config.ts` - next.config.js examples
- `02-webpack-config.ts` - Webpack customization
- `03-typescript-config.ts` - TypeScript configuration
- `04-custom-server.ts` - Custom server setup

## Quick Start

### Basic next.config.js

```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['example.com'],
  },
  env: {
    CUSTOM_KEY: 'my-value',
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

## Resources

- [Configuration Docs](https://nextjs.org/docs/app/api-reference/next-config-js)

---

**Previous**: [Advanced Features](../30-advanced-features/README.md) | **Next**: [Plugins & Extensions](../32-plugins-extensions/README.md)

