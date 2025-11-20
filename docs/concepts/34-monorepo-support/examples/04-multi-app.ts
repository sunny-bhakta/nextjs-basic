// Example 4: Multiple Next.js Apps
// Demonstrates managing multiple Next.js apps in a monorepo

// ============================================
// Example 1: App Structure
// Directory: apps/web/
// ============================================

/*
apps/
├── web/                    # Public-facing app
│   ├── package.json
│   ├── next.config.js
│   ├── tsconfig.json
│   └── app/
├── admin/                  # Admin dashboard
│   ├── package.json
│   ├── next.config.js
│   └── app/
└── marketing/              # Marketing site
    ├── package.json
    ├── next.config.js
    └── app/
*/

// ============================================
// Example 2: Web App Configuration
// File: apps/web/package.json
// ============================================

/*
{
  "name": "web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start -p 3000"
  },
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest",
    "@monorepo/ui": "*",
    "@monorepo/utils": "*"
  }
}
*/

// ============================================
// Example 3: Admin App Configuration
// File: apps/admin/package.json
// ============================================

/*
{
  "name": "admin",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3001",
    "build": "next build",
    "start": "next start -p 3001"
  },
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest",
    "@monorepo/ui": "*",
    "@monorepo/utils": "*",
    "@monorepo/admin-components": "*"
  }
}
*/

// ============================================
// Example 4: Shared Next.js Config
// File: packages/config/next.config.base.js
// ============================================

/*
const baseConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['example.com'],
  },
}

module.exports = baseConfig
*/

// ============================================
// Example 5: App-Specific Config
// File: apps/web/next.config.js
// ============================================

/*
const baseConfig = require('@monorepo/config/next.config.base.js')

module.exports = {
  ...baseConfig,
  // Web app specific config
  env: {
    NEXT_PUBLIC_APP_NAME: 'Web App',
  },
}
*/

// ============================================
// Example 6: TypeScript Config
// File: apps/web/tsconfig.json
// ============================================

/*
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@monorepo/ui": ["../../packages/ui"],
      "@monorepo/utils": ["../../packages/utils"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"]
}
*/

// ============================================
// Example 7: Using Shared Components
// File: apps/web/app/page.tsx
// ============================================

/*
import { Button } from '@monorepo/ui'
import { formatDate } from '@monorepo/utils'

export default function HomePage() {
  return (
    <div>
      <h1>Web App</h1>
      <Button onClick={() => console.log('Clicked')}>
        Click me
      </Button>
      <p>Today: {formatDate(new Date())}</p>
    </div>
  )
}
*/

// ============================================
// Example 8: Turborepo Scripts
// File: package.json (root)
// ============================================

/*
{
  "scripts": {
    "dev": "turbo run dev",
    "dev:web": "turbo run dev --filter=web",
    "dev:admin": "turbo run dev --filter=admin",
    "build": "turbo run build",
    "build:web": "turbo run build --filter=web",
    "build:admin": "turbo run build --filter=admin"
  }
}
*/

