// Example 2: API Routes Types
// Demonstrates type-safe API routes

import { NextRequest, NextResponse } from 'next/server'
import { User, ApiResponse } from '@/app/types'

// GET handler with typed response
export async function GET(request: NextRequest) {
  try {
    const users: User[] = await getUsers()
    
    const response: ApiResponse<User[]> = {
      data: users,
      message: 'Users fetched successfully',
      success: true
    }
    
    return NextResponse.json(response)
  } catch (error) {
    const errorResponse: ApiResponse<null> = {
      data: null,
      message: error instanceof Error ? error.message : 'Failed to fetch users',
      success: false
    }
    
    return NextResponse.json(errorResponse, { status: 500 })
  }
}

// POST handler with typed request body
interface CreateUserRequest {
  name: string
  email: string
  age: number
  role: 'admin' | 'user' | 'guest'
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateUserRequest = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.age) {
      return NextResponse.json(
        {
          data: null,
          message: 'Missing required fields',
          success: false
        } as ApiResponse<null>,
        { status: 400 }
      )
    }
    
    const newUser: User = {
      id: generateId(),
      ...body
    }
    
    await saveUser(newUser)
    
    const response: ApiResponse<User> = {
      data: newUser,
      message: 'User created successfully',
      success: true
    }
    
    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        message: 'Failed to create user',
        success: false
      } as ApiResponse<null>,
      { status: 500 }
    )
  }
}

// PUT handler with typed params and body
interface UpdateUserParams {
  params: {
    id: string
  }
}

export async function PUT(
  request: NextRequest,
  { params }: UpdateUserParams
) {
  try {
    const body: Partial<Omit<User, 'id'>> = await request.json()
    const user = await updateUser(params.id, body)
    
    if (!user) {
      return NextResponse.json(
        {
          data: null,
          message: 'User not found',
          success: false
        } as ApiResponse<null>,
        { status: 404 }
      )
    }
    
    const response: ApiResponse<User> = {
      data: user,
      message: 'User updated successfully',
      success: true
    }
    
    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        message: 'Failed to update user',
        success: false
      } as ApiResponse<null>,
      { status: 500 }
    )
  }
}

// DELETE handler with typed params
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = await deleteUser(params.id)
    
    if (!deleted) {
      return NextResponse.json(
        {
          data: null,
          message: 'User not found',
          success: false
        } as ApiResponse<null>,
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      data: null,
      message: 'User deleted successfully',
      success: true
    } as ApiResponse<null>)
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        message: 'Failed to delete user',
        success: false
      } as ApiResponse<null>,
      { status: 500 }
    )
  }
}

// Helper functions (simulated)
async function getUsers(): Promise<User[]> {
  return []
}

async function saveUser(user: User): Promise<void> {
  // Save to database
}

async function updateUser(id: string, data: Partial<User>): Promise<User | null> {
  // Update in database
  return null
}

async function deleteUser(id: string): Promise<boolean> {
  // Delete from database
  return false
}

function generateId(): string {
  return Math.random().toString(36).substring(7)
}

