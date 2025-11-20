# Configuration Examples

This directory contains practical code examples demonstrating Next.js configuration.

## Examples

### 1. next.config.js (`01-next-config.ts`)
Demonstrates next.config.js configuration:
- Basic configuration options
- Environment variables
- Redirects and rewrites
- Security headers
- Complete configuration example

### 2. Webpack Configuration (`02-webpack-config.ts`)
Shows Webpack customization:
- Basic webpack configuration
- SVG loader setup
- Custom loaders
- Webpack plugins
- Advanced webpack optimization

### 3. TypeScript Configuration (`03-typescript-config.ts`)
Demonstrates TypeScript setup:
- Basic TypeScript configuration
- Path aliases
- Strict type checking
- Type definitions
- Component and API types

### 4. Custom Server (`04-custom-server.ts`)
Shows custom server implementation:
- Basic custom server
- Express integration
- WebSocket support
- TypeScript custom server
- Authentication middleware
- Rate limiting

## How to Use

1. **Copy configuration files**: Copy relevant examples to your project root
2. **Customize settings**: Modify values according to your needs
3. **Install dependencies**: Some examples require additional packages:
   ```bash
   npm install express ws @svgr/webpack webpack-bundle-analyzer
   ```
4. **Restart dev server**: Configuration changes require restart

## Key Concepts

### next.config.js
- Main configuration file for Next.js
- Supports JavaScript and TypeScript
- Use TypeScript annotations for type safety
- Restart required after changes

### Webpack Customization
- Access webpack config via `webpack` function
- Modify rules, plugins, and optimization
- Server and client configs can differ
- Use `isServer` to conditionally configure

### TypeScript Configuration
- Configure in `tsconfig.json`
- Path aliases for cleaner imports
- Strict mode for better type safety
- Global type definitions

### Custom Server
- Override default Next.js server
- Add custom middleware
- Integrate WebSockets
- Handle authentication
- Implement rate limiting

## Best Practices

1. **Use TypeScript**: Add `/** @type {import('next').NextConfig} */` annotation
2. **Environment variables**: Use `NEXT_PUBLIC_` prefix for client-side vars
3. **Path aliases**: Use `@/` for cleaner imports
4. **Security headers**: Add security headers in production
5. **Restart server**: Always restart after config changes
6. **Test changes**: Verify in development before production
7. **Document custom config**: Comment complex configurations

