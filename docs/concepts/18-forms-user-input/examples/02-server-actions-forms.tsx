// Example 2: Server Actions Forms
// Demonstrates form handling with Server Actions

// app/actions.ts - Server Actions
'use server'

export async function submitContactForm(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const message = formData.get('message') as string

  // Validate
  if (!name || !email || !message) {
    return { error: 'All fields are required' }
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return { error: 'Invalid email address' }
  }

  // Simulate processing (save to database, send email, etc.)
  await new Promise(resolve => setTimeout(resolve, 1000))

  return { success: true, message: 'Form submitted successfully' }
}

export async function createUser(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const age = Number(formData.get('age'))

  // Validation
  if (!name || !email) {
    return { error: 'Name and email are required' }
  }

  if (isNaN(age) || age < 18) {
    return { error: 'Age must be 18 or older' }
  }

  // Create user logic
  return { success: true, userId: '123' }
}

// app/contact/page.tsx - Form with Server Action (Progressive Enhancement)
import { submitContactForm } from './actions'

export default function ContactPage() {
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <form action={submitContactForm} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="message" className="block mb-1 font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

// app/components/ContactFormClient.tsx - Client Component with useTransition
'use client'

import { submitContactForm } from '@/app/actions'
import { useTransition } from 'react'
import { useState } from 'react'

export default function ContactFormClient() {
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setResult(null)

    const form = e.currentTarget
    const formData = new FormData(form)

    startTransition(async () => {
      const res = await submitContactForm(formData)
      setResult(res)

      if (res.success) {
        form.reset()
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>

      {result?.success && (
        <div className="p-4 bg-green-100 text-green-700 rounded">
          {result.message || 'Form submitted successfully!'}
        </div>
      )}

      {result?.error && (
        <div className="p-4 bg-red-100 text-red-700 rounded">
          {result.error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block mb-1 font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label htmlFor="email" className="block mb-1 font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label htmlFor="message" className="block mb-1 font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}

// app/components/AddToCart.tsx - Server Action with useTransition
'use client'

import { addToCart } from '@/app/actions'
import { useTransition } from 'react'
import { useState } from 'react'

export default function AddToCartButton({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition()
  const [quantity, setQuantity] = useState(1)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    startTransition(async () => {
      const result = await addToCart(productId, quantity)
      if (result.success) {
        setMessage('Added to cart!')
        setTimeout(() => setMessage(''), 3000)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        min="1"
        className="w-20 px-2 py-1 border border-gray-300 rounded"
      />
      <button
        type="submit"
        disabled={isPending}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? 'Adding...' : 'Add to Cart'}
      </button>
      {message && <span className="text-green-600">{message}</span>}
    </form>
  )
}

// app/actions.ts - Add to cart action
'use server'

export async function addToCart(productId: string, quantity: number) {
  // Server-side cart logic
  // Works even if JavaScript is disabled
  await new Promise(resolve => setTimeout(resolve, 500))
  return { success: true }
}

