# Monorepo Support

> **Category**: Advanced | **Priority**: 🟢 Low | **Difficulty**: Advanced  
> **Related Concepts**: [Configuration](../31-configuration/README.md)  
> **Status**: ✅ In Progress

## Overview

Setting up Next.js in monorepo architectures using workspaces and tools like Turborepo to manage multiple packages and applications in a single repository.

## Key Topics

- [Monorepo Guide](./monorepo-guide.md) - Comprehensive monorepo guide
- Workspaces - npm/yarn/pnpm workspaces
- Turborepo - Monorepo build system
- Shared Packages - Sharing code between apps
- Multi-App Setup - Multiple Next.js apps in one repo
- Build Optimization - Optimizing builds in monorepos

## Documentation

### Detailed Guides

1. **[Monorepo Guide](./monorepo-guide.md)**
   - Workspaces setup
   - Turborepo configuration
   - Shared packages
   - Multiple Next.js apps
   - Build optimization

## Examples

See the [examples directory](./examples/) for complete code examples:

- `01-workspaces-setup.md` - npm/yarn/pnpm workspaces
- `02-turborepo-setup.md` - Turborepo configuration
- `03-shared-packages.ts` - Shared code patterns
- `04-multi-app.ts` - Multiple Next.js apps

## Quick Start

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

### Turborepo Setup

```json
// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**"]
    },
    "dev": {
      "cache": false
    }
  }
}
```

## Resources

- [Monorepo Guide](https://nextjs.org/docs/app/building-your-application/configuring/monorepos)

---

**Previous**: [Debugging](../33-debugging/README.md) | **Next**: [Progressive Web App](../35-pwa/README.md)

