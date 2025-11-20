# API Integration

> **Category**: Advanced | **Related Concepts**: [Data Fetching](../05-data-fetching/README.md), [API Routes](../06-api-routes/README.md)  
> **Last Updated**: 2024

## 📖 Overview

API integration in Next.js involves connecting to external APIs and services. This includes REST APIs, GraphQL, tRPC, and setting up API clients with proper error handling and type safety.

**Key Points:**
- REST API integration
- GraphQL with Apollo/Relay
- tRPC for type-safe APIs
- API client setup
- Error handling
- Request/response interceptors

## 🎯 When to Use

- **External APIs**: Third-party services
- **Backend APIs**: Your own API services
- **GraphQL**: Complex data requirements
- **tRPC**: Type-safe full-stack apps
- **Microservices**: Multiple API sources

## 💻 Basic Example

### REST API Client

```typescript
// app/lib/api/client.ts
class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  async get<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${this.baseURL}${endpoint}`)
    if (!res.ok) {
      throw new Error(`API Error: ${res.statusText}`)
    }
    return res.json()
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const res = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!res.ok) {
      throw new Error(`API Error: ${res.statusText}`)
    }
    return res.json()
  }
}

export const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL || '')
```

## 🔧 Advanced Example

### GraphQL Client

```typescript
// app/lib/graphql/client.ts
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL
})

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  ssrMode: typeof window === 'undefined'
})
```

## 📋 Common Patterns

### Pattern 1: API Client
```typescript
const api = new ApiClient(baseURL)
const data = await api.get('/users')
```
**When to use**: REST APIs

### Pattern 2: GraphQL Query
```typescript
const { data } = useQuery(GET_USERS)
```
**When to use**: GraphQL APIs

### Pattern 3: tRPC Call
```typescript
const users = await trpc.users.getAll.query()
```
**When to use**: Type-safe APIs

## ⚠️ Common Mistakes

### Mistake 1: No Error Handling
```typescript
// ❌ Wrong: No error handling
const data = await fetch('/api/users').then(r => r.json())
```

```typescript
// ✅ Correct: Handle errors
try {
  const data = await apiClient.get('/users')
} catch (error) {
  console.error('Failed to fetch users:', error)
}
```
**Why**: APIs can fail.

### Mistake 2: Exposing API Keys
```typescript
// ❌ Wrong: API key in client
const apiKey = 'secret-key'
```

```typescript
// ✅ Correct: Use environment variables
const apiKey = process.env.NEXT_PUBLIC_API_KEY
```
**Why**: Security risk.

## ✨ Best Practices

1. **Use API clients**: Centralized API logic
2. **Handle errors**: Proper error handling
3. **Type safety**: TypeScript types
4. **Environment variables**: Secure API keys
5. **Request interceptors**: Add auth headers
6. **Response interceptors**: Handle errors
7. **Caching**: Cache API responses

## 🔗 Related Concepts

- [Data Fetching](../05-data-fetching/README.md) - Data fetching patterns
- [API Routes](../06-api-routes/README.md) - Creating APIs

## 📚 Resources

### Official Documentation
- [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)

### Libraries
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [tRPC](https://trpc.io/)

## 🎓 Key Takeaways

- Use API clients for consistency
- Handle errors properly
- Use TypeScript for type safety
- Secure API keys
- Cache responses when appropriate
- Use interceptors for common logic

