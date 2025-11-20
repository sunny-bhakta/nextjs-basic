// Example 2: XSS Prevention
// Demonstrates XSS prevention patterns

'use client'

// ============================================
// Example 1: Safe Rendering
// ============================================

interface UserComment {
  id: string
  text: string
  author: string
}

export function SafeComment({ comment }: { comment: UserComment }) {
  // ✅ Correct: React automatically escapes content
  return (
    <div className="p-4 border rounded">
      <p className="font-semibold">{comment.author}</p>
      <p>{comment.text}</p>
    </div>
  )
}

// ============================================
// Example 2: Dangerous HTML Rendering
// ============================================

export function DangerousComment({ html }: { html: string }) {
  // ❌ Wrong: Directly rendering HTML
  // return <div dangerouslySetInnerHTML={{ __html: html }} />

  // ✅ Correct: Sanitize HTML first
  const sanitized = sanitizeHtml(html)
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />
}

// Sanitization function (requires DOMPurify)
function sanitizeHtml(dirty: string): string {
  // In production, use: import DOMPurify from 'isomorphic-dompurify'
  // return DOMPurify.sanitize(dirty)
  
  // Basic example - remove script tags
  return dirty
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
}

// ============================================
// Example 3: Input Validation
// ============================================

import { z } from 'zod'

const commentSchema = z.object({
  text: z.string()
    .min(1, 'Comment cannot be empty')
    .max(1000, 'Comment too long')
    .refine(
      (text) => !/<script/i.test(text),
      'Script tags are not allowed'
    ),
  author: z.string().min(1).max(100)
})

export function CommentForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const data = {
      text: formData.get('text') as string,
      author: formData.get('author') as string
    }

    // Validate input
    const result = commentSchema.safeParse(data)
    
    if (!result.success) {
      console.error('Validation errors:', result.error)
      return
    }

    // Safe to use validated data
    console.log('Validated data:', result.data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="author" className="block mb-1 font-medium">
          Author
        </label>
        <input
          type="text"
          id="author"
          name="author"
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="text" className="block mb-1 font-medium">
          Comment
        </label>
        <textarea
          id="text"
          name="text"
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
// Example 4: URL Validation
// ============================================

export function SafeLink({ url, children }: { url: string; children: React.ReactNode }) {
  // Validate URL to prevent javascript: protocol
  const isValidUrl = (url: string): boolean => {
    try {
      const parsed = new URL(url)
      return ['http:', 'https:'].includes(parsed.protocol)
    } catch {
      return false
    }
  }

  if (!isValidUrl(url)) {
    return <span>{children}</span>
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      {children}
    </a>
  )
}

// ============================================
// Example 5: Server-Side Sanitization
// File: app/api/comments/route.ts
// ============================================

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const commentSchema = z.object({
  text: z.string()
    .min(1)
    .max(1000)
    .refine((text) => !/<script/i.test(text), 'No scripts allowed'),
  author: z.string().min(1).max(100)
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate and sanitize
    const result = commentSchema.safeParse(body)
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', issues: result.error.issues },
        { status: 400 }
      )
    }

    // Safe to save validated data
    // await saveComment(result.data)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    )
  }
}

