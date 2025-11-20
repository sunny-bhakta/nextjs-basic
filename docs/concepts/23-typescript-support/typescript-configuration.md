# TypeScript Configuration

> **Category**: Intermediate | **Related Concepts**: [Configuration](../31-configuration/README.md)  
> **Last Updated**: 2024

## 📖 Overview

Next.js provides excellent TypeScript support out of the box. With proper configuration, you can achieve full type safety across your application.

**Key Points:**
- Built-in TypeScript support
- Type-safe API routes
- Type-safe components
- Type definitions for Next.js APIs
- Strict mode support

## 🎯 When to Use

- **Type Safety**: Catch errors at compile time
- **Better DX**: Improved IDE support
- **Refactoring**: Safer code changes
- **Documentation**: Types serve as documentation
- **Large Projects**: Essential for large codebases

## 💻 Basic Example

### TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Basic Types

```typescript
// app/types.ts
export interface User {
  id: string
  name: string
  email: string
  age: number
}

export interface Post {
  id: string
  title: string
  content: string
  authorId: string
  createdAt: Date
}

export type Status = 'pending' | 'approved' | 'rejected'
```

### Typed Component Props

```typescript
// app/components/UserCard.tsx
import { User } from '@/app/types'

interface UserCardProps {
  user: User
  showEmail?: boolean
  onSelect?: (user: User) => void
}

export default function UserCard({ user, showEmail = false, onSelect }: UserCardProps) {
  return (
    <div className="p-4 border rounded">
      <h2 className="font-semibold">{user.name}</h2>
      {showEmail && <p className="text-gray-600">{user.email}</p>}
      {onSelect && (
        <button onClick={() => onSelect(user)}>
          Select
        </button>
      )}
    </div>
  )
}
```

## 🔧 Advanced Example

### Type-Safe API Routes

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { User } from '@/app/types'

export async function GET(request: NextRequest) {
  const users: User[] = await getUsers()
  return NextResponse.json(users)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  // Type-safe validation
  const user: Omit<User, 'id'> = {
    name: body.name,
    email: body.email,
    age: body.age
  }
  
  const created = await createUser(user)
  return NextResponse.json(created, { status: 201 })
}
```

### Type-Safe Server Actions

```typescript
// app/actions.ts
'use server'

import { User } from '@/app/types'

export async function createUser(data: Omit<User, 'id'>): Promise<User> {
  // Type-safe server action
  const user = await saveUser(data)
  return user
}

export async function getUser(id: string): Promise<User | null> {
  return await findUser(id)
}
```

### Typed Route Parameters

```typescript
// app/products/[id]/page.tsx
interface PageProps {
  params: {
    id: string
  }
  searchParams: {
    category?: string
    sort?: 'asc' | 'desc'
  }
}

export default async function ProductPage({ params, searchParams }: PageProps) {
  const product = await getProduct(params.id)
  
  return (
    <div>
      <h1>{product.name}</h1>
    </div>
  )
}
```

## 📋 Common Patterns

### Pattern 1: Type Aliases
```typescript
type ID = string
type Status = 'active' | 'inactive'
```
**When to use**: Simple type aliases

### Pattern 2: Interfaces
```typescript
interface User {
  id: string
  name: string
}
```
**When to use**: Object shapes, extensible types

### Pattern 3: Generics
```typescript
function fetchData<T>(url: string): Promise<T> {
  return fetch(url).then(res => res.json())
}
```
**When to use**: Reusable type-safe functions

## ⚠️ Common Mistakes

### Mistake 1: Using `any`
```typescript
// ❌ Wrong: Using any
function processData(data: any) {
  return data.value
}
```

```typescript
// ✅ Correct: Use proper types
interface Data {
  value: string
}
function processData(data: Data) {
  return data.value
}
```
**Why**: `any` defeats the purpose of TypeScript.

### Mistake 2: Not Typing Props
```typescript
// ❌ Wrong: No types
export default function Component(props) {
  return <div>{props.name}</div>
}
```

```typescript
// ✅ Correct: Type props
interface Props {
  name: string
}
export default function Component({ name }: Props) {
  return <div>{name}</div>
}
```
**Why**: Props should always be typed.

## ✨ Best Practices

1. **Enable strict mode**: Catch more errors
2. **Type everything**: Avoid `any`
3. **Use interfaces**: For object shapes
4. **Use type aliases**: For unions and primitives
5. **Type API routes**: Request and response types
6. **Type Server Actions**: Input and output types
7. **Use generics**: For reusable code

## 🔗 Related Concepts

- [Configuration](../31-configuration/README.md) - Next.js configuration
- [API Routes](../06-api-routes/README.md) - Typed API routes

## 📚 Resources

### Official Documentation
- [TypeScript](https://nextjs.org/docs/app/building-your-application/configuring/typescript)

## 🎓 Key Takeaways

- TypeScript is built into Next.js
- Enable strict mode for better type safety
- Type all props, functions, and API routes
- Use interfaces for object shapes
- Avoid `any` type
- Leverage TypeScript for better DX

