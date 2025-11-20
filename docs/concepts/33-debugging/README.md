# Debugging

> **Category**: Advanced | **Priority**: 🟡 Medium | **Difficulty**: Intermediate  
> **Related Concepts**: [Error Handling](../26-error-handling/README.md)  
> **Status**: ✅ In Progress

## Overview

Debugging Next.js applications using development tools, source maps, logging strategies, and browser DevTools to identify and fix issues efficiently.

## Key Topics

- [Debugging Guide](./debugging-guide.md) - Comprehensive debugging guide
- VS Code Debugging - Setting up debugger in VS Code
- Source Maps - Configuring source maps for debugging
- Logging Strategies - Effective logging patterns
- Network Debugging - Debugging API calls and requests
- Chrome DevTools - Using browser DevTools
- React DevTools - Debugging React components

## Documentation

### Detailed Guides

1. **[Debugging Guide](./debugging-guide.md)**
   - VS Code debugging configuration
   - Source maps setup
   - Logging strategies
   - Network debugging
   - React DevTools

## Examples

See the [examples directory](./examples/) for complete code examples:

- `01-vscode-debugging.ts` - VS Code debugging configuration
- `02-source-maps.ts` - Source maps configuration
- `03-logging-strategies.ts` - Logging patterns
- `04-network-debugging.tsx` - API debugging

## Quick Start

### VS Code Debugging

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    }
  ]
}
```

### Console Logging

```typescript
// app/page.tsx
export default function Page() {
  console.log('Server-side log')
  console.error('Error log')
  console.warn('Warning log')
  
  return <div>Page</div>
}
```

## Resources

- [Debugging Guide](https://nextjs.org/docs/app/building-your-application/configuring/debugging)

---

**Previous**: [Plugins & Extensions](../32-plugins-extensions/README.md) | **Next**: [Monorepo Support](../34-monorepo-support/README.md)

