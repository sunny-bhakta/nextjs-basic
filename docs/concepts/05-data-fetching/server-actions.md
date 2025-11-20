# Server Actions

> **Category**: Core | **Related Concepts**: [Server Component Fetching](./server-fetching.md), [Client Component Fetching](./client-fetching.md)  
> **Last Updated**: 2024

## 📖 Overview

Server Actions are functions that run on the server and can be called from Client Components or Server Components. They're perfect for form submissions, mutations, and server-side operations. Server Actions provide a type-safe way to perform server-side operations without creating API routes.

**Key Points:**
- Functions that run on the server
- Can be called from Client or Server Components
- Perfect for mutations and form submissions
- Type-safe with TypeScript
- No need for API routes
- Automatic revalidation support

## 🎯 When to Use

- **Form Submissions**: Handle form data on the server
- **Mutations**: Create, update, delete operations
- **Server Operations**: Database writes, file operations
- **Type Safety**: Type-safe server operations
- **Simplified Code**: No need for separate API routes

## 💻 Basic Example

### Simple Server Action

```typescript
// app/actions.ts
'use server'

export async function createPost(title: string, content: string) {
  // This runs on the server
  const res = await fetch('https://api.example.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content })
  })
  
  if (!res.ok) {
    throw new Error('Failed to create post')
  }
  
  return res.json()
}
```

### Using Server Action in Client Component

```typescript
// app/components/CreatePost.tsx
'use client'

import { createPost } from '@/app/actions'
import { useState } from 'react'

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      await createPost(title, content)
      setTitle('')
      setContent('')
      alert('Post created!')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Post'}
      </button>
    </form>
  )
}
```

### Form with Server Action

```typescript
// app/actions.ts
'use server'

export async function submitContactForm(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const message = formData.get('message') as string
  
  // Validate
  if (!name || !email || !message) {
    return { error: 'All fields are required' }
  }
  
  // Process form data
  // Save to database, send email, etc.
  
  return { success: true, message: 'Form submitted successfully' }
}

// app/contact/page.tsx
import { submitContactForm } from './actions'

export default function ContactPage() {
  return (
    <form action={submitContactForm}>
      <input type="text" name="name" placeholder="Name" required />
      <input type="email" name="email" placeholder="Email" required />
      <textarea name="message" placeholder="Message" required />
      <button type="submit">Submit</button>
    </form>
  )
}
```

## 🔧 Advanced Example

### Server Action with Revalidation

```typescript
// app/actions.ts
'use server'

import { revalidatePath } from 'next/cache'

export async function updatePost(id: string, data: { title: string, content: string }) {
  // Update post in database
  await db.post.update({
    where: { id },
    data
  })
  
  // Revalidate the post page
  revalidatePath(`/blog/${id}`)
  
  // Revalidate blog listing
  revalidatePath('/blog')
  
  return { success: true }
}
```

### Server Action with Database

```typescript
// app/actions.ts
'use server'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function createProduct(data: {
  name: string
  price: number
  description: string
}) {
  try {
    const product = await db.product.create({
      data: {
        name: data.name,
        price: data.price,
        description: data.description
      }
    })
    
    revalidatePath('/products')
    
    return { success: true, product }
  } catch (error) {
    return { error: 'Failed to create product' }
  }
}

export async function deleteProduct(id: string) {
  try {
    await db.product.delete({
      where: { id }
    })
    
    revalidatePath('/products')
    
    return { success: true }
  } catch (error) {
    return { error: 'Failed to delete product' }
  }
}
```

### Server Action with Validation

```typescript
// app/actions.ts
'use server'

import { z } from 'zod'

const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  age: z.number().min(18, 'Must be 18 or older')
})

export async function createUser(formData: FormData) {
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    age: Number(formData.get('age'))
  }
  
  // Validate with Zod
  const result = createUserSchema.safeParse(rawData)
  
  if (!result.success) {
    return {
      error: 'Validation failed',
      issues: result.error.issues
    }
  }
  
  // Create user
  const user = await db.user.create({
    data: result.data
  })
  
  return { success: true, user }
}
```

### Progressive Enhancement with Server Actions

```typescript
// app/actions.ts
'use server'

export async function addToCart(productId: string, quantity: number) {
  // Server-side cart logic
  // Works even if JavaScript is disabled
  return { success: true }
}

// app/components/AddToCart.tsx
'use client'

import { addToCart } from '@/app/actions'
import { useState, useTransition } from 'react'

export default function AddToCartButton({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition()
  const [quantity, setQuantity] = useState(1)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    startTransition(async () => {
      await addToCart(productId, quantity)
    })
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        min="1"
      />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Adding...' : 'Add to Cart'}
      </button>
    </form>
  )
}
```

## 📋 Common Patterns

### Pattern 1: Simple Form Action
```typescript
'use server'

export async function submitForm(formData: FormData) {
  const data = Object.fromEntries(formData)
  // Process data
  return { success: true }
}
```
**When to use**: Simple form submissions

### Pattern 2: Action with Revalidation
```typescript
'use server'

import { revalidatePath } from 'next/cache'

export async function updateData(id: string, data: any) {
  await updateInDatabase(id, data)
  revalidatePath(`/items/${id}`)
}
```
**When to use**: Mutations that affect cached pages

### Pattern 3: Action with Validation
```typescript
'use server'

export async function createItem(data: FormData) {
  // Validate
  const validated = validate(data)
  if (!validated.success) {
    return { error: validated.error }
  }
  // Create
  return { success: true }
}
```
**When to use**: When you need server-side validation

## ⚠️ Common Mistakes

### Mistake 1: Missing 'use server'
```typescript
// ❌ Wrong: Missing directive
export async function myAction() {
  // This won't work as Server Action
}
```
**Why**: Server Actions need the `'use server'` directive.

```typescript
// ✅ Correct: Include directive
'use server'

export async function myAction() {
  // This is a Server Action
}
```

### Mistake 2: Not Handling Errors
```typescript
// ❌ Wrong: No error handling
'use server'

export async function createPost(data: FormData) {
  const res = await fetch('/api/posts', {
    method: 'POST',
    body: data
  })
  return res.json() // Might fail
}
```
**Why**: API calls can fail.

```typescript
// ✅ Correct: Handle errors
'use server'

export async function createPost(data: FormData) {
  try {
    const res = await fetch('/api/posts', {
      method: 'POST',
      body: data
    })
    if (!res.ok) throw new Error('Failed to create')
    return { success: true, data: await res.json() }
  } catch (error) {
    return { error: error.message }
  }
}
```

### Mistake 3: Not Revalidating
```typescript
// ❌ Wrong: Not revalidating after mutation
'use server'

export async function updatePost(id: string, data: any) {
  await updateInDatabase(id, data)
  // Cache won't update
}
```
**Why**: Cached pages won't reflect changes.

```typescript
// ✅ Correct: Revalidate after mutation
'use server'

import { revalidatePath } from 'next/cache'

export async function updatePost(id: string, data: any) {
  await updateInDatabase(id, data)
  revalidatePath(`/posts/${id}`)
}
```

## ✨ Best Practices

1. **Use 'use server'**: Always include the directive
2. **Handle errors**: Return error states for better UX
3. **Validate input**: Validate on server for security
4. **Revalidate paths**: Use `revalidatePath` after mutations
5. **Type safety**: Use TypeScript for type safety
6. **Progressive enhancement**: Work without JavaScript
7. **Use useTransition**: For better loading states in Client Components

## 🔗 Related Concepts

- [Server Component Fetching](./server-fetching.md) - Reading data
- [Client Component Fetching](./client-fetching.md) - Client-side fetching
- [Forms & User Input](../18-forms-user-input/README.md) - Form handling

## 📚 Resources

### Official Documentation
- [Server Actions](https://nextjs.org/docs/app/api-reference/functions/server-actions)
- [Server Actions and Mutations](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)

## 🧪 Practice Exercises

### Exercise 1: Contact Form
**Difficulty**: Beginner  
**Goal**: Understand Server Actions  
**Instructions**:
1. Create a contact form
2. Create a Server Action to handle submission
3. Add validation
4. Show success/error messages

### Exercise 2: CRUD Operations
**Difficulty**: Intermediate  
**Goal**: Practice mutations with Server Actions  
**Instructions**:
1. Create Server Actions for create, update, delete
2. Add revalidation
3. Handle errors
4. Test all operations

## 🎓 Key Takeaways

- Server Actions run on the server
- Use `'use server'` directive
- Perfect for mutations and form submissions
- Type-safe with TypeScript
- Use `revalidatePath` after mutations
- Can be called from Client or Server Components
- Support progressive enhancement

## ❓ FAQ

### Q: Do Server Actions need 'use server'?
**A**: Yes, the `'use server'` directive is required.

### Q: Can I use Server Actions in Server Components?
**A**: Yes, Server Actions can be called from both Server and Client Components.

### Q: How do I handle errors?
**A**: Return error objects or throw errors that can be caught in the calling component.

### Q: Do I need to revalidate after mutations?
**A**: Yes, use `revalidatePath` or `revalidateTag` to update cached pages.

### Q: Can Server Actions work without JavaScript?
**A**: Yes, when used with form actions, they work without JavaScript (progressive enhancement).

---

**Next Steps**: 
- Review: [Fetch API](./fetch-api.md) for fetch details
- Practice: Create forms with Server Actions
- Build: A CRUD application using Server Actions

