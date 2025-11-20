# Monorepo Support Examples

This directory contains practical code examples demonstrating monorepo setup with Next.js.

## Examples

### 1. Workspaces Setup (`01-workspaces-setup.md`)
Demonstrates workspace configuration:
- npm workspaces
- Yarn workspaces
- pnpm workspaces
- Directory structure
- TypeScript configuration

### 2. Turborepo Setup (`02-turborepo-setup.md`)
Shows Turborepo configuration:
- Basic setup
- Advanced configuration
- Remote caching
- Environment variables
- Filtering and dependencies

### 3. Shared Packages (`03-shared-packages.ts`)
Demonstrates sharing code:
- Shared UI components
- Shared utilities
- Shared types
- Shared hooks
- Shared API client
- Shared configuration

### 4. Multiple Next.js Apps (`04-multi-app.ts`)
Shows managing multiple apps:
- App structure
- App-specific configurations
- Shared configurations
- TypeScript setup
- Using shared components

## How to Use

1. **Set up workspaces**: Configure package.json or pnpm-workspace.yaml
2. **Install Turborepo**: Add turbo as dev dependency
3. **Configure turbo.json**: Set up build pipeline
4. **Create shared packages**: Set up packages directory
5. **Create apps**: Set up apps directory with Next.js apps

## Key Concepts

### Workspaces
- Manage multiple packages in one repo
- Automatic linking between packages
- Shared dependencies
- Consistent tooling

### Turborepo
- Optimized builds with caching
- Parallel execution
- Remote caching
- Build dependencies

### Shared Packages
- Reusable code across apps
- Components, utilities, types
- Shared configuration
- Version consistency

### Multiple Apps
- Separate Next.js applications
- Shared codebase
- Independent deployments
- Consistent tooling

## Best Practices

1. **Use workspaces**: npm/yarn/pnpm workspaces
2. **Use Turborepo**: For build optimization
3. **Shared packages**: Reuse code across apps
4. **Define dependencies**: In Turborepo pipeline
5. **Cache outputs**: Speed up builds
6. **Consistent tooling**: Same tools across apps
7. **TypeScript paths**: Configure path aliases
8. **Clear structure**: Organize apps and packages

