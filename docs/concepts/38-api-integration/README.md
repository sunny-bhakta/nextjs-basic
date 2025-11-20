# API Integration

> **Category**: Advanced | **Priority**: 🟡 Medium | **Difficulty**: Intermediate  
> **Related Concepts**: [Data Fetching](../05-data-fetching/README.md), [API Routes](../06-api-routes/README.md)  
> **Status**: ✅ In Progress

## Overview

Integrating external APIs and third-party services into Next.js applications.

## Key Topics

- [API Integration Guide](./api-integration.md) - Comprehensive API integration guide
- REST APIs - Consuming REST APIs
- GraphQL - Apollo, Relay integration
- tRPC - End-to-end typesafe APIs
- API Client Setup - Setting up API clients
- Error Handling - Handling API errors

## Documentation

### Detailed Guides

1. **[API Integration Guide](./api-integration.md)**
   - REST API integration
   - GraphQL setup
   - tRPC integration
   - API client patterns

## Examples

See the [examples directory](./examples/) for complete code examples:

- `01-rest-api.ts` - REST API client
- `02-graphql.ts` - GraphQL integration
- `03-trpc.ts` - tRPC setup

## Quick Start

### REST API Client

```typescript
// app/lib/api/client.ts
const apiClient = {
  get: async (url: string) => {
    const res = await fetch(url)
    return res.json()
  }
}
```

## Resources

- [API Integration Patterns](https://nextjs.org/docs/app/building-your-application/data-fetching)

---

**Previous**: [Code Organization](../37-code-organization/README.md) | **Next**: [File System](../39-file-system/README.md)

