// Example 3: Form Validation
// Demonstrates client and server-side validation

'use client'

import { useState } from 'react'
import { z } from 'zod'

// Zod Schema for validation
const userSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(18, 'Must be 18 or older').max(120, 'Invalid age'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

type UserFormData = z.infer<typeof userSchema>

// Client-side validation with Zod
export default function UserRegistrationForm() {
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    age: 0,
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [submitting, setSubmitting] = useState(false)

  const validateField = (field: keyof UserFormData, value: any) => {
    try {
      // Validate single field
      const fieldSchema = userSchema.shape[field]
      if (fieldSchema) {
        fieldSchema.parse(value)
      }
      setErrors(prev => ({ ...prev, [field]: '' }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [field]: error.errors[0].message }))
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const processedValue = name === 'age' ? Number(value) || 0 : value

    setFormData(prev => ({ ...prev, [name]: processedValue }))

    // Validate on change if field has been touched
    if (touched[name]) {
      validateField(name as keyof UserFormData, processedValue)
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    validateField(name as keyof UserFormData, formData[name as keyof UserFormData])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // Validate entire form
    const result = userSchema.safeParse(formData)

    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0].toString()] = error.message
        }
      })
      setErrors(fieldErrors)
      setSubmitting(false)
      return
    }

    // Submit to server
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data)
      })

      if (res.ok) {
        alert('Registration successful!')
        setFormData({
          name: '',
          email: '',
          age: 0,
          password: '',
          confirmPassword: ''
        })
        setTouched({})
      } else {
        const data = await res.json()
        setErrors({ submit: data.error || 'Registration failed' })
      }
    } catch (error) {
      setErrors({ submit: 'Network error. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">User Registration</h2>

      {errors.submit && (
        <div className="p-4 bg-red-100 text-red-700 rounded">
          {errors.submit}
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
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-3 py-2 border rounded ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block mb-1 font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-3 py-2 border rounded ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="age" className="block mb-1 font-medium">
          Age
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-3 py-2 border rounded ${
            errors.age ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.age && (
          <p className="mt-1 text-sm text-red-600">{errors.age}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block mb-1 font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-3 py-2 border rounded ${
            errors.password ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block mb-1 font-medium">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-3 py-2 border rounded ${
            errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {submitting ? 'Registering...' : 'Register'}
      </button>
    </form>
  )
}

// Server Action with Zod Validation
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

  // Create user (simulate)
  await new Promise(resolve => setTimeout(resolve, 1000))

  return { success: true, user: result.data }
}

