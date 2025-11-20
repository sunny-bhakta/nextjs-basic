# Workspaces Setup

This guide demonstrates setting up workspaces with npm, yarn, and pnpm.

## npm Workspaces

### Root package.json

```json
{
  "name": "monorepo",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "npm run dev --workspace=apps/web",
    "build": "npm run build --workspaces",
    "lint": "npm run lint --workspaces"
  }
}
```

### App package.json

```json
// apps/web/package.json
{
  "name": "web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
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
  "types": "./index.ts",
  "exports": {
    ".": "./index.ts",
    "./components": "./components/index.ts"
  }
}
```

## Yarn Workspaces

### Root package.json

```json
{
  "name": "monorepo",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
```

### Usage

```bash
# Install dependencies
yarn install

# Run command in specific workspace
yarn workspace web dev

# Run command in all workspaces
yarn workspaces run build
```

## pnpm Workspaces

### pnpm-workspace.yaml

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### Root package.json

```json
{
  "name": "monorepo",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "pnpm --filter web dev",
    "build": "pnpm -r build"
  }
}
```

### Usage

```bash
# Install dependencies
pnpm install

# Run command in specific workspace
pnpm --filter web dev

# Run command in all workspaces
pnpm -r build
```

## Directory Structure

```
monorepo/
├── apps/
│   ├── web/
│   │   ├── package.json
│   │   ├── next.config.js
│   │   └── app/
│   └── admin/
│       ├── package.json
│       └── app/
├── packages/
│   ├── ui/
│   │   ├── package.json
│   │   └── index.ts
│   └── utils/
│       ├── package.json
│       └── index.ts
├── package.json
└── pnpm-workspace.yaml (or workspaces in package.json)
```

## TypeScript Configuration

### Root tsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@monorepo/ui": ["./packages/ui"],
      "@monorepo/utils": ["./packages/utils"]
    }
  }
}
```

### App tsconfig.json

```json
// apps/web/tsconfig.json
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
```

