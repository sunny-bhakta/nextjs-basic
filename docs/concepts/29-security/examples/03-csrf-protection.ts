// Example 3: CSRF Protection
// Demonstrates CSRF protection patterns

import { randomBytes } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

// ============================================
// Example 1: CSRF Token Generation
// File: app/lib/csrf.ts
// ============================================

export function generateCSRFToken(): string {
  return randomBytes(32).toString('hex')
}

export function validateCSRFToken(
  token: string,
  sessionToken: string
): boolean {
  if (!token || !sessionToken) {
    return false
  }
  return token === sessionToken
}

// ============================================
// Example 2: CSRF Token API Route
// File: app/api/csrf-token/route.ts
// ============================================

import { generateCSRFToken } from '@/app/lib/csrf'
import { cookies } from 'next/headers'

export async function GET() {
  const token = generateCSRFToken()
  
  // Store token in httpOnly cookie
  const cookieStore = await cookies()
  cookieStore.set('csrf-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 // 24 hours
  })

  return NextResponse.json({ token })
}

// ============================================
// Example 3: Protected API Route with CSRF
// File: app/api/protected/route.ts
// ============================================

import { validateCSRFToken } from '@/app/lib/csrf'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('csrf-token')?.value
  
  const body = await request.json()
  const { csrfToken } = body

  // Validate CSRF token
  if (!validateCSRFToken(csrfToken, sessionToken || '')) {
    return NextResponse.json(
      { error: 'Invalid CSRF token' },
      { status: 403 }
    )
  }

  // Process request
  return NextResponse.json({ success: true })
}

// ============================================
// Example 4: Client-Side CSRF Token Usage
// File: app/components/ProtectedForm.tsx
// ============================================

'use client'

import { useEffect, useState } from 'react'

export function ProtectedForm() {
  const [csrfToken, setCsrfToken] = useState<string>('')

  useEffect(() => {
    // Fetch CSRF token
    fetch('/api/csrf-token')
      .then(res => res.json())
      .then(data => setCsrfToken(data.token))
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    // Include CSRF token in request
    const response = await fetch('/api/protected', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        csrfToken
      })
    })

    if (response.ok) {
      console.log('Form submitted successfully')
    } else {
      console.error('Submission failed')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="csrfToken" value={csrfToken} />
      <div>
        <label htmlFor="name" className="block mb-1 font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Submit
      </button>
    </form>
  )
}

// ============================================
// Example 5: SameSite Cookie Configuration
// File: app/api/login/route.ts
// ============================================

import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { username, password } = body

  // Validate credentials
  // const user = await authenticate(username, password)

  // Set secure session cookie
  const cookieStore = await cookies()
  cookieStore.set('session', 'session-token-here', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  })

  return NextResponse.json({ success: true })
}

