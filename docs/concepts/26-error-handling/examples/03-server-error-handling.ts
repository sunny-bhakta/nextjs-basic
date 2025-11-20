// Example 3: Server Error Handling
// Demonstrates error handling in Server Components and API routes

// ============================================
// Example 1: Server Component with Error Handling
// File: app/products/page.tsx
// ============================================

async function getProducts() {
  try {
    const res = await fetch('https://api.example.com/products', {
      next: { revalidate: 60 }
    })
    
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`)
    }
    
    return res.json()
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

// Note: This is a Server Component example
// In actual usage, this would be in a .tsx file
export default async function ProductsPage() {
  try {
    const products = await getProducts()
    
    // Return JSX (would be in .tsx file)
    // return <ProductsList products={products} />
    return { products, error: null }
  } catch (error) {
    // Return error state (would be in .tsx file)
    // return <ErrorDisplay error={error} />
    return {
      products: [],
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    }
  }
}

// ============================================
// Example 2: API Route with Error Handling
// File: app/api/products/route.ts
// ============================================
// Copy this code to: app/api/products/route.ts

/*
import { NextRequest, NextResponse } from 'next/server'

async function getProductsFromDb() {
  // Simulate database call
  await new Promise(resolve => setTimeout(resolve, 100))
  // Simulate error
  throw new Error('Database connection failed')
}

export async function GET(request: NextRequest) {
  try {
    const products = await getProductsFromDb()
    return NextResponse.json(products)
  } catch (error) {
    console.error('API Error:', error)
    
    // Log to error tracking service
    // errorTrackingService.log(error)
    
    return NextResponse.json(
      {
        error: 'Failed to fetch products',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
*/

// ============================================
// Example 3: API Route with Validation
// File: app/api/users/route.ts
// ============================================
// Copy this code to: app/api/users/route.ts

/*
import { NextRequest, NextResponse } from 'next/server'

interface CreateUserRequest {
  name: string
  email: string
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateUserRequest = await request.json()
    
    // Validation
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }
    
    if (!body.email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }
    
    // Create user
    const user = await createUser(body)
    
    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    
    if (error instanceof Error && error.message.includes('duplicate')) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}

async function createUser(data: CreateUserRequest) {
  // Simulate user creation
  await new Promise(resolve => setTimeout(resolve, 100))
  return { id: '1', ...data   }
}
*/

// ============================================
// Example 4: Server Action with Error Handling
// File: app/actions.ts
// ============================================
// Copy this code to: app/actions.ts

/*

'use server'

export async function updateUser(id: string, data: { name: string; email: string }) {
  try {
    // Validate input
    if (!id || !data.name || !data.email) {
      throw new Error('Missing required fields')
    }
    
    // Update user
    const user = await updateUserInDb(id, data)
    
    return {
      success: true,
      user
    }
  } catch (error) {
    console.error('Error updating user:', error)
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update user'
    }
  }
}

async function updateUserInDb(id: string, data: { name: string; email: string }) {
  // Simulate database update
  await new Promise(resolve => setTimeout(resolve, 100))
  return { id, ...data }
}
*/

// ============================================
// Example 5: Error Handling Utility
// File: app/lib/error-handler.ts
// ============================================
// Copy this code to: app/lib/error-handler.ts

/*

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export function handleError(error: unknown): { message: string; statusCode: number } {
  if (error instanceof AppError) {
    return {
      message: error.message,
      statusCode: error.statusCode
    }
  }
  
  if (error instanceof Error) {
    return {
      message: error.message,
      statusCode: 500
    }
  }
  
  return {
    message: 'An unknown error occurred',
    statusCode: 500
  }
}

// Usage in API route
export async function GET() {
  try {
    // Some operation
    throw new AppError('Resource not found', 404, 'NOT_FOUND')
  } catch (error) {
    const { message, statusCode } = handleError(error)
    return NextResponse.json({ error: message }, { status: statusCode })
  }
}
*/

