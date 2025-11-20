// Example 3: Server Actions
// Demonstrates server-side mutations and form handling

// app/actions.ts - Simple Server Action
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

// app/components/CreatePost.tsx - Using Server Action in Client Component
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
    } catch (err: any) {
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

// app/actions.ts - Server Action with FormData
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

// app/contact/page.tsx - Form with Server Action
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

// app/actions.ts - Server Action with revalidation
'use server'

import { revalidatePath } from 'next/cache'

export async function updatePost(id: string, data: { title: string, content: string }) {
  // Update post in database
  await updatePostInDb(id, data)
  
  // Revalidate the post page
  revalidatePath(`/blog/${id}`)
  
  // Revalidate blog listing
  revalidatePath('/blog')
  
  return { success: true }
}

// app/actions.ts - Server Action with validation
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
  const user = await createUserInDb(result.data)
  
  return { success: true, user }
}

// app/components/AddToCart.tsx - Progressive enhancement with Server Actions
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

// app/actions.ts - Add to cart Server Action
'use server'

export async function addToCart(productId: string, quantity: number) {
  // Server-side cart logic
  // Works even if JavaScript is disabled
  await addItemToCart(productId, quantity)
  return { success: true }
}

