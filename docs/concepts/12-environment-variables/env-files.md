# Environment Files

> **Category**: Intermediate | **Related Concepts**: [Server vs Client Variables](./server-client-variables.md), [Validation](./validation.md)  
> **Last Updated**: 2024

## 📖 Overview

Next.js supports multiple environment files for different environments. Environment variables are loaded from `.env` files and can be accessed in your application.

**Key Points:**
- Multiple environment files
- Environment-specific variables
- Automatic loading
- Priority order
- Security best practices
- Type safety

## 🎯 When to Use

- **Configuration**: App configuration values
- **API Keys**: Third-party API keys
- **Database URLs**: Database connection strings
- **Feature Flags**: Feature toggles
- **Environment-Specific**: Different values per environment

## 💻 Basic Example

### Basic Environment File

```bash
# .env.local
DATABASE_URL=postgresql://localhost:5432/mydb
API_KEY=your-api-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Using Environment Variables

```typescript
// app/api/data/route.ts
export async function GET() {
  const apiKey = process.env.API_KEY
  const dbUrl = process.env.DATABASE_URL
  
  // Use variables
  const data = await fetchData(apiKey, dbUrl)
  return Response.json({ data })
}
```

### Public Variables

```typescript
// .env.local
NEXT_PUBLIC_API_URL=https://api.example.com

// app/components/ClientComponent.tsx
'use client'

export default function ClientComponent() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  // Accessible in client components
}
```

## 🔧 Advanced Example

### Multiple Environment Files

```bash
# .env (default, all environments)
APP_NAME=My App

# .env.local (local, gitignored)
DATABASE_URL=postgresql://localhost:5432/mydb
API_KEY=local-api-key

# .env.development (development)
API_URL=http://localhost:3000/api

# .env.production (production)
API_URL=https://api.example.com
```

### Environment-Specific Configuration

```typescript
// lib/config.ts
export const config = {
  apiUrl: process.env.API_URL || 'http://localhost:3000',
  databaseUrl: process.env.DATABASE_URL!,
  apiKey: process.env.API_KEY!,
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
}
```

### Type-Safe Environment Variables

```typescript
// env.ts
export const env = {
  DATABASE_URL: process.env.DATABASE_URL!,
  API_KEY: process.env.API_KEY!,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL!,
} as const

// Usage
import { env } from '@/env'
const dbUrl = env.DATABASE_URL
```

## 📋 Common Patterns

### Pattern 1: Basic Usage
```typescript
const apiKey = process.env.API_KEY
```
**When to use**: Simple variable access

### Pattern 2: With Default
```typescript
const apiUrl = process.env.API_URL || 'http://localhost:3000'
```
**When to use**: When default value is acceptable

### Pattern 3: Required Variable
```typescript
const dbUrl = process.env.DATABASE_URL!
```
**When to use**: When variable is required

## ⚠️ Common Mistakes

### Mistake 1: Exposing Secrets
```typescript
// ❌ Wrong: No NEXT_PUBLIC_ prefix but used in client
const apiKey = process.env.API_KEY
// Used in client component - exposes secret
```
**Why**: Server variables shouldn't be used in client.

```typescript
// ✅ Correct: Use NEXT_PUBLIC_ for client
const apiUrl = process.env.NEXT_PUBLIC_API_URL
```

### Mistake 2: Committing .env.local
```bash
# ❌ Wrong: Committing .env.local
git add .env.local
```
**Why**: .env.local contains secrets.

```bash
# ✅ Correct: Add to .gitignore
echo ".env.local" >> .gitignore
```

### Mistake 3: Not Validating
```typescript
// ❌ Wrong: No validation
const dbUrl = process.env.DATABASE_URL
await connect(dbUrl) // Might be undefined
```
**Why**: Variables might be missing.

```typescript
// ✅ Correct: Validate
const dbUrl = process.env.DATABASE_URL
if (!dbUrl) throw new Error('DATABASE_URL is required')
```

## ✨ Best Practices

1. **Use .env.local**: For local development secrets
2. **Use NEXT_PUBLIC_**: Only for client-accessible variables
3. **Never commit secrets**: Add .env.local to .gitignore
4. **Validate variables**: Check required variables exist
5. **Use types**: Create type-safe env objects
6. **Document variables**: Document required variables

## 🔗 Related Concepts

- [Server vs Client Variables](./server-client-variables.md) - Variable scope
- [Validation](./validation.md) - Validating variables

## 📚 Resources

### Official Documentation
- [Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

## 🧪 Practice Exercises

### Exercise 1: Basic Setup
**Difficulty**: Beginner  
**Goal**: Understand environment variables  
**Instructions**:
1. Create .env.local file
2. Add variables
3. Use in code
4. Test access

### Exercise 2: Type-Safe Variables
**Difficulty**: Intermediate  
**Goal**: Practice type safety  
**Instructions**:
1. Create env.ts file
2. Define type-safe variables
3. Validate required variables
4. Use throughout app

## 🎓 Key Takeaways

- Use .env.local for local secrets
- NEXT_PUBLIC_ prefix for client variables
- Never commit .env.local
- Validate required variables
- Use type-safe env objects
- Document required variables

## ❓ FAQ

### Q: What's the difference between .env files?
**A**: .env is default, .env.local is gitignored, .env.development/.env.production are environment-specific.

### Q: Do I need NEXT_PUBLIC_ prefix?
**A**: Yes, for variables used in client components. Server-only variables don't need it.

### Q: Can I use .env in production?
**A**: Yes, but prefer environment variables from your hosting platform.

### Q: How do I validate variables?
**A**: Check if variables exist and throw errors if required variables are missing.

### Q: Are .env files secure?
**A**: .env.local is gitignored, but always use secure methods for production secrets.

---

**Next Steps**: 
- Review: [Server vs Client Variables](./server-client-variables.md) for scope
- Practice: Set up environment variables
- Build: Configure your application

