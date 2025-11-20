# Prisma ORM

> **Category**: Intermediate | **Related Concepts**: [Data Fetching](../05-data-fetching/README.md), [API Routes](../06-api-routes/README.md)  
> **Last Updated**: 2024

## 📖 Overview

Prisma is a modern TypeScript ORM that provides type-safe database access, migrations, and a powerful query API. It's one of the most popular ORMs for Next.js applications.

**Key Points:**
- Type-safe database access
- Auto-generated types
- Database migrations
- Query builder
- Works with PostgreSQL, MySQL, SQLite, MongoDB
- Excellent TypeScript support

## 🎯 When to Use

- **Type Safety**: When you need type-safe database access
- **TypeScript**: When using TypeScript
- **Migrations**: When you need schema migrations
- **Modern ORM**: When you want a modern ORM
- **Multiple Databases**: When supporting multiple databases
- **Developer Experience**: When you want great DX

## 💻 Basic Example

### Setup

```bash
npm install prisma @prisma/client
npx prisma init
```

### Schema Definition

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        String   @id @default(uuid())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Client Setup

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### Basic Usage

```typescript
// app/api/users/route.ts
import { prisma } from '@/lib/prisma'

export async function GET() {
  const users = await prisma.user.findMany({
    include: {
      posts: true,
    },
  })
  
  return Response.json(users)
}

export async function POST(request: Request) {
  const { email, name } = await request.json()
  
  const user = await prisma.user.create({
    data: {
      email,
      name,
    },
  })
  
  return Response.json(user)
}
```

## 🔧 Advanced Example

### Complex Queries

```typescript
// app/api/posts/route.ts
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const published = searchParams.get('published')
  const search = searchParams.get('search')
  
  const posts = await prisma.post.findMany({
    where: {
      published: published === 'true',
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { content: { contains: search, mode: 'insensitive' } },
        ],
      }),
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 10,
  })
  
  return Response.json(posts)
}
```

### Transactions

```typescript
// app/api/users/[id]/posts/route.ts
import { prisma } from '@/lib/prisma'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { title, content } = await request.json()
  
  const result = await prisma.$transaction(async (tx) => {
    // Create post
    const post = await tx.post.create({
      data: {
        title,
        content,
        authorId: params.id,
      },
    })
    
    // Update user's post count (if you have such a field)
    await tx.user.update({
      where: { id: params.id },
      data: {
        // Update logic
      },
    })
    
    return post
  })
  
  return Response.json(result)
}
```

### Server Actions

```typescript
// app/actions/user-actions.ts
'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createUser(formData: FormData) {
  const email = formData.get('email') as string
  const name = formData.get('name') as string
  
  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    })
    
    revalidatePath('/users')
    return { success: true, user }
  } catch (error) {
    return { success: false, error: 'Failed to create user' }
  }
}
```

## 📋 Common Patterns

### Pattern 1: Find Many
```typescript
const users = await prisma.user.findMany()
```
**When to use**: Get all records

### Pattern 2: Find Unique
```typescript
const user = await prisma.user.findUnique({ where: { id } })
```
**When to use**: Get single record by unique field

### Pattern 3: Create
```typescript
const user = await prisma.user.create({ data: {...} })
```
**When to use**: Create new record

### Pattern 4: Update
```typescript
const user = await prisma.user.update({ where: { id }, data: {...} })
```
**When to use**: Update existing record

### Pattern 5: Delete
```typescript
const user = await prisma.user.delete({ where: { id } })
```
**When to use**: Delete record

## ⚠️ Common Mistakes

### Mistake 1: Not Reusing Client
```typescript
// ❌ Wrong: Creating new client each time
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient() // New instance each time
```
**Why**: Creates too many connections.

```typescript
// ✅ Correct: Reuse client
import { prisma } from '@/lib/prisma'
```

### Mistake 2: Not Handling Errors
```typescript
// ❌ Wrong: No error handling
const user = await prisma.user.create({ data: {...} })
```
**Why**: Database operations can fail.

```typescript
// ✅ Correct: Handle errors
try {
  const user = await prisma.user.create({ data: {...} })
} catch (error) {
  // Handle error
}
```

### Mistake 3: Not Using Transactions
```typescript
// ❌ Wrong: Multiple operations without transaction
await prisma.user.create({...})
await prisma.post.create({...})
// If second fails, first still created
```
**Why**: Need atomicity.

```typescript
// ✅ Correct: Use transaction
await prisma.$transaction([
  prisma.user.create({...}),
  prisma.post.create({...}),
])
```

## ✨ Best Practices

1. **Reuse client**: Create single PrismaClient instance
2. **Handle errors**: Always handle database errors
3. **Use transactions**: For multiple related operations
4. **Select fields**: Use `select` to limit returned data
5. **Use indexes**: Add indexes for frequently queried fields
6. **Type safety**: Leverage generated types

## 🔗 Related Concepts

- [Data Fetching](../05-data-fetching/README.md) - Data fetching patterns
- [API Routes](../06-api-routes/README.md) - API endpoints

## 📚 Resources

### Official Documentation
- [Prisma](https://www.prisma.io)

## 🧪 Practice Exercises

### Exercise 1: Basic CRUD
**Difficulty**: Beginner  
**Goal**: Understand Prisma basics  
**Instructions**:
1. Set up Prisma
2. Create schema
3. Implement CRUD operations
4. Test all operations

### Exercise 2: Complex Queries
**Difficulty**: Intermediate  
**Goal**: Practice complex queries  
**Instructions**:
1. Create complex queries
2. Use transactions
3. Handle relations
4. Test performance

## 🎓 Key Takeaways

- Prisma provides type-safe database access
- Auto-generated types from schema
- Powerful query API
- Database migrations included
- Works with multiple databases
- Excellent TypeScript support

## ❓ FAQ

### Q: How do I install Prisma?
**A**: Run `npm install prisma @prisma/client` and `npx prisma init`.

### Q: How do I generate the client?
**A**: Run `npx prisma generate` after schema changes.

### Q: How do I run migrations?
**A**: Run `npx prisma migrate dev` for development, `npx prisma migrate deploy` for production.

### Q: Can I use with Server Components?
**A**: Yes, Prisma works great with Server Components.

### Q: How do I handle connections?
**A**: Reuse a single PrismaClient instance across your app.

---

**Next Steps**: 
- Review: [Migrations](./migrations.md) for schema management
- Practice: Set up Prisma
- Build: Integrate database

