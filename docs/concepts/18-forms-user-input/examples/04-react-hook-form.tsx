// Example 4: React Hook Form
// Demonstrates React Hook Form integration with Zod validation

'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Zod schema
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[\d\s-()]+$/, 'Invalid phone number').optional().or(z.literal('')),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  newsletter: z.boolean().default(false)
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactFormRHF() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      newsletter: false
    }
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (res.ok) {
        alert('Message sent successfully!')
        reset()
      } else {
        alert('Failed to send message')
      }
    } catch (error) {
      alert('Network error. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Contact Form (React Hook Form)</h2>

      <div>
        <label htmlFor="name" className="block mb-1 font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          className={`w-full px-3 py-2 border rounded ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block mb-1 font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className={`w-full px-3 py-2 border rounded ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block mb-1 font-medium">
          Phone (Optional)
        </label>
        <input
          type="tel"
          id="phone"
          {...register('phone')}
          className={`w-full px-3 py-2 border rounded ${
            errors.phone ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block mb-1 font-medium">
          Message
        </label>
        <textarea
          id="message"
          {...register('message')}
          rows={5}
          className={`w-full px-3 py-2 border rounded ${
            errors.message ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="newsletter"
          {...register('newsletter')}
          className="mr-2"
        />
        <label htmlFor="newsletter" className="text-sm">
          Subscribe to newsletter
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}

// React Hook Form with Server Action
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createUser } from '@/app/actions'
import { useTransition } from 'react'

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  age: z.number().min(18, 'Must be 18 or older')
})

type UserFormData = z.infer<typeof userSchema>

export function UserFormWithServerAction() {
  const [isPending, startTransition] = useTransition()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema)
  })

  const onSubmit = async (data: UserFormData) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('age', data.age.toString())

    startTransition(async () => {
      const result = await createUser(formData)
      if (result.success) {
        alert('User created!')
        reset()
      } else {
        alert(result.error || 'Failed to create user')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Create User</h2>

      <div>
        <label htmlFor="name" className="block mb-1 font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          className={`w-full px-3 py-2 border rounded ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block mb-1 font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className={`w-full px-3 py-2 border rounded ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="age" className="block mb-1 font-medium">
          Age
        </label>
        <input
          type="number"
          id="age"
          {...register('age', { valueAsNumber: true })}
          className={`w-full px-3 py-2 border rounded ${
            errors.age ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.age && (
          <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? 'Creating...' : 'Create User'}
      </button>
    </form>
  )
}

