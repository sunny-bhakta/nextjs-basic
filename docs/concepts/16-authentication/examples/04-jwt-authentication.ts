// Example 4: JWT Authentication
// Demonstrates JWT-based authentication

// app/api/auth/login/route.ts - Login with JWT
import { sign } from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const { email, password } = await request.json()
  
  // Verify credentials
  const user = await verifyUser(email, password)
  
  if (!user) {
    return Response.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  }
  
  // Create JWT token
  const token = sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  )
  
  // Set cookie
  const cookieStore = await cookies()
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60, // 1 hour
  })
  
  return Response.json({ success: true })
}

// lib/auth.ts - Verify JWT token
import { verify } from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value
  
  if (!token) {
    return null
  }
  
  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as {
      userId: string
      email: string
    }
    
    return decoded
  } catch (error) {
    return null
  }
}

// app/api/protected/route.ts - Protected API with JWT
import { getCurrentUser } from '@/lib/auth'

export async function GET() {
  const user = await getCurrentUser()
  
  if (!user) {
    return Response.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  const data = await getProtectedData(user.userId)
  return Response.json({ data })
}

// app/api/auth/refresh/route.ts - Refresh token
import { verify, sign } from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get('refresh-token')?.value
  
  if (!refreshToken) {
    return Response.json({ error: 'No refresh token' }, { status: 401 })
  }
  
  try {
    const decoded = verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as {
      userId: string
    }
    
    // Generate new access token
    const accessToken = sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' }
    )
    
    cookieStore.set('access-token', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 15 * 60,
    })
    
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: 'Invalid token' }, { status: 401 })
  }
}

