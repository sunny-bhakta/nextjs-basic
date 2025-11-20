// Example 2: Component Tests
// Demonstrates component testing with React Testing Library

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

// app/components/Button.tsx
interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  variant?: 'primary' | 'secondary'
}

export default function Button({ 
  children, 
  onClick, 
  disabled = false,
  variant = 'primary' 
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded ${
        variant === 'primary' 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-200 text-gray-800'
      } disabled:opacity-50`}
    >
      {children}
    </button>
  )
}

// __tests__/Button.test.tsx
import Button from '@/app/components/Button'

describe('Button', () => {
  test('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)
    expect(screen.getByText('Click me')).toBeDisabled()
  })

  test('applies variant classes', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>)
    expect(screen.getByText('Primary')).toHaveClass('bg-blue-600')
    
    rerender(<Button variant="secondary">Secondary</Button>)
    expect(screen.getByText('Secondary')).toHaveClass('bg-gray-200')
  })
})

// app/components/Counter.tsx
'use client'

import { useState } from 'react'
import Button from './Button'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="p-4">
      <p className="text-2xl font-bold mb-4">Count: {count}</p>
      <div className="flex gap-2">
        <Button onClick={() => setCount(count + 1)}>Increment</Button>
        <Button onClick={() => setCount(count - 1)}>Decrement</Button>
        <Button onClick={() => setCount(0)}>Reset</Button>
      </div>
    </div>
  )
}

// __tests__/Counter.test.tsx
import Counter from '@/app/components/Counter'

describe('Counter', () => {
  test('displays initial count', () => {
    render(<Counter />)
    expect(screen.getByText('Count: 0')).toBeInTheDocument()
  })

  test('increments count', () => {
    render(<Counter />)
    fireEvent.click(screen.getByText('Increment'))
    expect(screen.getByText('Count: 1')).toBeInTheDocument()
  })

  test('decrements count', () => {
    render(<Counter />)
    fireEvent.click(screen.getByText('Increment'))
    fireEvent.click(screen.getByText('Decrement'))
    expect(screen.getByText('Count: 0')).toBeInTheDocument()
  })

  test('resets count', () => {
    render(<Counter />)
    fireEvent.click(screen.getByText('Increment'))
    fireEvent.click(screen.getByText('Increment'))
    fireEvent.click(screen.getByText('Reset'))
    expect(screen.getByText('Count: 0')).toBeInTheDocument()
  })
})

// app/components/UserForm.tsx
'use client'

import { useState } from 'react'
import Button from './Button'

export default function UserForm({ onSubmit }: { onSubmit: (data: { name: string; email: string }) => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name, email })
    setName('')
    setEmail('')
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block mb-1 font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          required
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  )
}

// __tests__/UserForm.test.tsx
import UserForm from '@/app/components/UserForm'

describe('UserForm', () => {
  test('renders form fields', () => {
    render(<UserForm onSubmit={jest.fn()} />)
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  test('calls onSubmit with form data', () => {
    const handleSubmit = jest.fn()
    render(<UserForm onSubmit={handleSubmit} />)
    
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'John Doe' }
    })
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' }
    })
    fireEvent.click(screen.getByText('Submit'))
    
    expect(handleSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com'
    })
  })

  test('clears form after submission', () => {
    const handleSubmit = jest.fn()
    render(<UserForm onSubmit={handleSubmit} />)
    
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'John Doe' }
    })
    fireEvent.click(screen.getByText('Submit'))
    
    expect(screen.getByLabelText('Name')).toHaveValue('')
    expect(screen.getByLabelText('Email')).toHaveValue('')
  })
})

