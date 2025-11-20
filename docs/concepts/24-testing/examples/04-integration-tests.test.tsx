// Example 4: Integration Tests
// Demonstrates integration testing with React Testing Library

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

// ============================================
// Example 1: Testing Component with Context
// ============================================

// app/context/UserContext.tsx
'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  isLoading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within UserProvider')
  }
  return context
}

// app/components/UserProfile.tsx
'use client'

import { useUser } from '@/app/context/UserContext'
import { useEffect } from 'react'

export default function UserProfile({ userId }: { userId: string }) {
  const { user, setUser, isLoading } = useUser()

  useEffect(() => {
    // Simulate fetching user data
    const fetchUser = async () => {
      const res = await fetch(`/api/users/${userId}`)
      const data = await res.json()
      setUser(data)
    }
    fetchUser()
  }, [userId, setUser])

  if (isLoading || !user) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-semibold">{user.name}</h2>
      <p className="text-gray-600">{user.email}</p>
    </div>
  )
}

// __tests__/integration/UserProfile.test.tsx
import UserProfile from '@/app/components/UserProfile'
import { UserProvider } from '@/app/context/UserContext'

// Mock fetch
global.fetch = jest.fn()

describe('UserProfile Integration', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear()
  })

  test('fetches and displays user data', async () => {
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com'
    }

    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser
    })

    render(
      <UserProvider>
        <UserProfile userId="1" />
      </UserProvider>
    )

    // Wait for user data to load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('john@example.com')).toBeInTheDocument()
    })

    expect(fetch).toHaveBeenCalledWith('/api/users/1')
  })

  test('shows loading state initially', () => {
    ;(fetch as jest.Mock).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    )

    render(
      <UserProvider>
        <UserProfile userId="1" />
      </UserProvider>
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})

// ============================================
// Example 2: Testing Form with Server Action
// ============================================

// app/components/ContactForm.tsx
'use client'

import { useState } from 'react'
import { submitContactForm } from '@/app/actions'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string
    }

    try {
      const result = await submitContactForm(data)
      if (result.success) {
        setStatus('success')
        setMessage('Form submitted successfully')
        e.currentTarget.reset()
      } else {
        setStatus('error')
        setMessage(result.error || 'Submission failed')
      }
    } catch (error) {
      setStatus('error')
      setMessage('An error occurred')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {status === 'loading' ? 'Submitting...' : 'Submit'}
      </button>
      {message && (
        <p className={`text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </form>
  )
}

// app/actions.ts
'use server'

export async function submitContactForm(data: { name: string; email: string; message: string }) {
  // Simulate server action
  await new Promise(resolve => setTimeout(resolve, 100))
  
  if (!data.name || !data.email || !data.message) {
    return { success: false, error: 'All fields are required' }
  }
  
  return { success: true }
}

// __tests__/integration/ContactForm.test.tsx
import ContactForm from '@/app/components/ContactForm'
import { submitContactForm } from '@/app/actions'

jest.mock('@/app/actions', () => ({
  submitContactForm: jest.fn()
}))

describe('ContactForm Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('submits form and shows success message', async () => {
    const mockSubmit = submitContactForm as jest.MockedFunction<typeof submitContactForm>
    mockSubmit.mockResolvedValue({ success: true })

    render(<ContactForm />)

    // Fill form
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'John Doe' }
    })
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' }
    })
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'Test message' }
    })

    // Submit
    fireEvent.click(screen.getByText('Submit'))

    // Verify loading state
    expect(screen.getByText('Submitting...')).toBeInTheDocument()

    // Verify success
    await waitFor(() => {
      expect(screen.getByText('Form submitted successfully')).toBeInTheDocument()
    })

    expect(mockSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message'
    })
  })

  test('shows error message on failure', async () => {
    const mockSubmit = submitContactForm as jest.MockedFunction<typeof submitContactForm>
    mockSubmit.mockResolvedValue({ success: false, error: 'Submission failed' })

    render(<ContactForm />)

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'John Doe' }
    })
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' }
    })
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'Test message' }
    })

    fireEvent.click(screen.getByText('Submit'))

    await waitFor(() => {
      expect(screen.getByText('Submission failed')).toBeInTheDocument()
    })
  })
})

// ============================================
// Example 3: Testing Product List with API
// ============================================

// app/components/ProductList.tsx
'use client'

import { useState, useEffect } from 'react'

interface Product {
  id: string
  name: string
  price: number
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/products')
        if (!res.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await res.json()
        setProducts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return <div>Loading products...</div>
  }

  if (error) {
    return <div className="text-red-600">{error}</div>
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Products</h2>
      <ul className="space-y-2">
        {products.map((product) => (
          <li key={product.id} className="p-4 border rounded">
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

// __tests__/integration/ProductList.test.tsx
import ProductList from '@/app/components/ProductList'

global.fetch = jest.fn()

describe('ProductList Integration', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear()
  })

  test('fetches and displays products', async () => {
    const mockProducts = [
      { id: '1', name: 'Product 1', price: 100 },
      { id: '2', name: 'Product 2', price: 200 }
    ]

    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts
    })

    render(<ProductList />)

    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument()
      expect(screen.getByText('Product 2')).toBeInTheDocument()
    })

    expect(fetch).toHaveBeenCalledWith('/api/products')
  })

  test('handles loading state', () => {
    ;(fetch as jest.Mock).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    )

    render(<ProductList />)

    expect(screen.getByText('Loading products...')).toBeInTheDocument()
  })

  test('handles error state', async () => {
    ;(fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

    render(<ProductList />)

    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument()
    })
  })
})

// ============================================
// Example 4: Testing Multi-Step Form
// ============================================

// app/components/MultiStepForm.tsx
'use client'

import { useState } from 'react'

interface FormData {
  name: string
  email: string
  phone: string
}

export default function MultiStepForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="p-4 bg-green-100 rounded">
        <h2 className="text-xl font-semibold mb-2">Form submitted successfully!</h2>
        <p>Name: {formData.name}</p>
        <p>Email: {formData.email}</p>
        <p>Phone: {formData.phone}</p>
      </div>
    )
  }

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-semibold mb-4">
        Step {step}: {step === 1 ? 'Personal Information' : step === 2 ? 'Contact Information' : 'Review'}
      </h2>

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block mb-1 font-medium">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Review your information:</h3>
            <p>Name: {formData.name}</p>
            <p>Email: {formData.email}</p>
            <p>Phone: {formData.phone}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// __tests__/integration/MultiStepForm.test.tsx
import MultiStepForm from '@/app/components/MultiStepForm'

describe('MultiStepForm Integration', () => {
  test('completes multi-step form flow', async () => {
    render(<MultiStepForm />)

    // Step 1: Personal Info
    expect(screen.getByText('Step 1: Personal Information')).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'John Doe' }
    })
    fireEvent.click(screen.getByText('Next'))

    // Step 2: Contact Info
    await waitFor(() => {
      expect(screen.getByText('Step 2: Contact Information')).toBeInTheDocument()
    })
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' }
    })
    fireEvent.change(screen.getByLabelText('Phone'), {
      target: { value: '123-456-7890' }
    })
    fireEvent.click(screen.getByText('Next'))

    // Step 3: Review
    await waitFor(() => {
      expect(screen.getByText('Step 3: Review')).toBeInTheDocument()
      expect(screen.getByText('Name: John Doe')).toBeInTheDocument()
      expect(screen.getByText('Email: john@example.com')).toBeInTheDocument()
      expect(screen.getByText('Phone: 123-456-7890')).toBeInTheDocument()
    })

    // Submit
    fireEvent.click(screen.getByText('Submit'))

    await waitFor(() => {
      expect(screen.getByText('Form submitted successfully!')).toBeInTheDocument()
    })
  })

  test('allows navigation back and forth', async () => {
    render(<MultiStepForm />)

    // Step 1 -> Step 2
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'John Doe' }
    })
    fireEvent.click(screen.getByText('Next'))

    await waitFor(() => {
      expect(screen.getByText('Step 2: Contact Information')).toBeInTheDocument()
    })

    // Step 2 -> Step 1
    fireEvent.click(screen.getByText('Back'))

    await waitFor(() => {
      expect(screen.getByText('Step 1: Personal Information')).toBeInTheDocument()
    })

    // Verify data is preserved
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument()
  })
})

