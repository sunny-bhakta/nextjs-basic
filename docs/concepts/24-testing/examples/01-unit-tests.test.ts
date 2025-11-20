// Example 1: Unit Tests
// Demonstrates unit testing with Jest

// app/utils.ts - Functions to test
export function add(a: number, b: number): number {
  return a + b
}

export function multiply(a: number, b: number): number {
  return a * b
}

export function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error('Division by zero')
  }
  return a / b
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function validateEmail(email: string): boolean {
  return /\S+@\S+\.\S+/.test(email)
}

// __tests__/utils.test.ts - Unit tests
import { add, multiply, divide, formatDate, validateEmail } from '@/app/utils'

describe('Utils', () => {
  describe('add', () => {
    test('adds two positive numbers', () => {
      expect(add(1, 2)).toBe(3)
    })

    test('adds negative numbers', () => {
      expect(add(-1, -2)).toBe(-3)
    })

    test('adds zero', () => {
      expect(add(5, 0)).toBe(5)
    })
  })

  describe('multiply', () => {
    test('multiplies two numbers', () => {
      expect(multiply(2, 3)).toBe(6)
    })

    test('multiplies by zero', () => {
      expect(multiply(5, 0)).toBe(0)
    })
  })

  describe('divide', () => {
    test('divides two numbers', () => {
      expect(divide(6, 2)).toBe(3)
    })

    test('throws error on division by zero', () => {
      expect(() => divide(5, 0)).toThrow('Division by zero')
    })
  })

  describe('formatDate', () => {
    test('formats date correctly', () => {
      const date = new Date('2024-01-15')
      const formatted = formatDate(date)
      expect(formatted).toContain('January')
      expect(formatted).toContain('15')
      expect(formatted).toContain('2024')
    })
  })

  describe('validateEmail', () => {
    test('validates correct email', () => {
      expect(validateEmail('test@example.com')).toBe(true)
    })

    test('rejects invalid email', () => {
      expect(validateEmail('invalid')).toBe(false)
      expect(validateEmail('invalid@')).toBe(false)
      expect(validateEmail('@example.com')).toBe(false)
    })
  })
})

// app/lib/api.ts - API functions to test
export async function fetchUser(id: string) {
  const res = await fetch(`https://api.example.com/users/${id}`)
  if (!res.ok) {
    throw new Error('Failed to fetch user')
  }
  return res.json()
}

// __tests__/api.test.ts - Testing with mocks
import { fetchUser } from '@/app/lib/api'

// Mock fetch
global.fetch = jest.fn()

describe('API Functions', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear()
  })

  test('fetches user successfully', async () => {
    const mockUser = { id: '1', name: 'John Doe' }
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser
    })

    const user = await fetchUser('1')
    expect(user).toEqual(mockUser)
    expect(fetch).toHaveBeenCalledWith('https://api.example.com/users/1')
  })

  test('throws error on failed fetch', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: false
    })

    await expect(fetchUser('1')).rejects.toThrow('Failed to fetch user')
  })
})

