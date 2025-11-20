# Monorepo Support

> **Category**: Advanced | **Related Concepts**: [Configuration](../31-configuration/README.md)  
> **Last Updated**: 2024

## 📖 Overview

Monorepo support in Next.js allows you to manage multiple packages and applications in a single repository, enabling code sharing, consistent tooling, and optimized builds.

**Key Points:**
- Workspaces for package management
- Turborepo for build optimization
- Shared packages for code reuse
- Multiple Next.js apps in one repo
- Optimized builds with caching

## 🎯 When to Use

- **Multiple Apps**: Managing multiple Next.js applications
- **Shared Code**: Sharing components, utilities, types
- **Consistent Tooling**: Same tooling across projects
- **Faster Builds**: Optimized builds with caching
- **Code Reuse**: Reusable packages across apps
- **Team Collaboration**: Easier collaboration on shared code

## 💻 Basic Example

### Workspaces Setup

```json
// package.json (root)
{
  "name": "monorepo",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
```

### Next.js App in Monorepo

```json
// apps/web/package.json
{
  "name": "web",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest",
    "@monorepo/ui": "*",
    "@monorepo/utils": "*"
  }
}
```

### Shared Package

```json
// packages/ui/package.json
{
  "name": "@monorepo/ui",
  "version": "0.1.0",
  "main": "./index.ts",
  "types": "./index.ts"
}
```

## 🔧 Advanced Example

### Turborepo Configuration

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "outputs": []
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": []
    }
  }
}
```

### Multiple Next.js Apps

```
monorepo/
├── apps/
│   ├── web/          # Next.js app 1
│   ├── admin/         # Next.js app 2
│   └── marketing/     # Next.js app 3
├── packages/
│   ├── ui/           # Shared components
│   ├── utils/         # Shared utilities
│   └── types/         # Shared types
└── package.json
```

### Shared Components

```typescript
// packages/ui/components/Button.tsx
export function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>
}

// apps/web/app/page.tsx
import { Button } from '@monorepo/ui/components/Button'

export default function Page() {
  return <Button>Click me</Button>
}
```

## 📋 Common Patterns

### Pattern 1: Workspace Dependencies
```json
{
  "dependencies": {
    "@monorepo/ui": "*"
  }
}
```
**When to use**: Referencing packages in the same monorepo

### Pattern 2: Turborepo Pipeline
```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"]
    }
  }
}
```
**When to use**: Defining build dependencies

### Pattern 3: Shared Config
```typescript
// packages/config/next.config.js
module.exports = {
  reactStrictMode: true,
}
```
**When to use**: Sharing configuration across apps

## ⚠️ Common Mistakes

### Mistake 1: Not Using Workspaces
```json
// ❌ Wrong: Manual linking
{
  "dependencies": {
    "@monorepo/ui": "file:../packages/ui"
  }
}
```

```json
// ✅ Correct: Use workspaces
{
  "workspaces": ["packages/*"],
  "dependencies": {
    "@monorepo/ui": "*"
  }
}
```
**Why**: Workspaces handle linking automatically.

### Mistake 2: Missing Build Dependencies
```json
// ❌ Wrong: No dependency order
{
  "pipeline": {
    "build": {}
  }
}
```

```json
// ✅ Correct: Define dependencies
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"]
    }
  }
}
```
**Why**: Ensures correct build order.

### Mistake 3: Not Caching Builds
```json
// ❌ Wrong: No caching
{
  "pipeline": {
    "build": {}
  }
}
```

```json
// ✅ Correct: Cache outputs
{
  "pipeline": {
    "build": {
      "outputs": [".next/**"]
    }
  }
}
```
**Why**: Caching speeds up builds.

## ✨ Best Practices

1. **Use workspaces**: npm/yarn/pnpm workspaces
2. **Use Turborepo**: For build optimization
3. **Shared packages**: Reuse code across apps
4. **Define dependencies**: In Turborepo pipeline
5. **Cache outputs**: Speed up builds
6. **Consistent tooling**: Same tools across apps
7. **TypeScript paths**: Configure path aliases
8. **Document structure**: Clear monorepo structure

## 🔗 Related Concepts

- [Configuration](../31-configuration/README.md) - Next.js configuration
- [TypeScript Support](../23-typescript-support/README.md) - TypeScript setup

## 📚 Resources

### Official Documentation
- [Monorepos](https://nextjs.org/docs/app/building-your-application/configuring/monorepos)
- [Turborepo](https://turbo.build/repo/docs)

### Tools
- [Turborepo](https://turbo.build/repo) - Build system
- [Nx](https://nx.dev) - Monorepo tooling
- [pnpm](https://pnpm.io) - Package manager

## 🎓 Key Takeaways

- Workspaces enable package management
- Turborepo optimizes builds
- Shared packages enable code reuse
- Define build dependencies
- Cache build outputs
- Consistent tooling across apps
- Clear monorepo structure

