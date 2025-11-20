# Turborepo Setup

This guide demonstrates setting up Turborepo for optimized builds in a monorepo.

## Installation

```bash
npm install -D turbo
# or
yarn add -D turbo
# or
pnpm add -D turbo
```

## Basic Configuration

### turbo.json

```json
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
    }
  }
}
```

## Advanced Configuration

### Complete turbo.json

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["tsconfig.json"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"],
      "env": ["NEXT_PUBLIC_API_URL"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"],
      "outputs": []
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": ["coverage/**"],
      "inputs": ["src/**/*.tsx", "src/**/*.ts", "test/**/*.ts"]
    },
    "type-check": {
      "dependsOn": ["^build"],
      "outputs": []
    }
  }
}
```

## Package.json Scripts

### Root package.json

```json
{
  "name": "monorepo",
  "private": true,
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "clean": "turbo run clean && rm -rf node_modules"
  },
  "devDependencies": {
    "turbo": "latest"
  }
}
```

### App package.json

```json
// apps/web/package.json
{
  "name": "web",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

## Running Commands

```bash
# Run dev for all apps
turbo run dev

# Run build for specific app
turbo run build --filter=web

# Run build for app and dependencies
turbo run build --filter=web...

# Run with cache
turbo run build --force

# Clear cache
turbo run build --force --no-cache
```

## Remote Caching

### Setup

```bash
# Login to Vercel
npx turbo login

# Link to remote cache
npx turbo link
```

### Configuration

```json
// turbo.json
{
  "remoteCache": {
    "enabled": true
  }
}
```

## Environment Variables

### turbo.json

```json
{
  "pipeline": {
    "build": {
      "env": [
        "NEXT_PUBLIC_API_URL",
        "DATABASE_URL"
      ]
    }
  }
}
```

## Filtering

```bash
# Run for specific package
turbo run build --filter=web

# Run for package and dependencies
turbo run build --filter=web...

# Run for package and dependents
turbo run build --filter=...web

# Run for changed packages
turbo run build --filter='[HEAD^1]'

# Run for packages matching pattern
turbo run build --filter='./apps/*'
```

## Outputs Configuration

```json
{
  "pipeline": {
    "build": {
      "outputs": [
        ".next/**",
        "!.next/cache/**",
        "dist/**",
        "build/**"
      ]
    }
  }
}
```

## Dependencies

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],  // Dependencies must build first
      "outputs": [".next/**"]
    },
    "test": {
      "dependsOn": ["build"],    // This package must build first
      "outputs": []
    }
  }
}
```

