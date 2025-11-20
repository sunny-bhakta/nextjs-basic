// Example 3: File Serving
// Demonstrates file serving patterns

// ============================================
// Example 1: Static File Serving
// Files in public/ are automatically served
// ============================================

// public/images/logo.png is accessible at /images/logo.png
// public/documents/guide.pdf is accessible at /documents/guide.pdf

// ============================================
// Example 2: API Route for File Serving
// File: app/api/files/[filename]/route.ts
// ============================================

import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filePath = join(process.cwd(), 'uploads', params.filename)
    const fileBuffer = await readFile(filePath)
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${params.filename}"`
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'File not found' },
      { status: 404 }
    )
  }
}

// ============================================
// Example 3: File Download
// ============================================

export function FileDownload({ filename }: { filename: string }) {
  const handleDownload = async () => {
    const response = await fetch(`/api/files/${filename}`)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  return (
    <button
      onClick={handleDownload}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      Download {filename}
    </button>
  )
}

