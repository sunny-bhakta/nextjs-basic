// Example 1: Basic File Upload
// Demonstrates basic file upload with validation and progress

'use client'

import { useState } from 'react'

export default function BasicFileUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState('')

  const validateFile = (file: File): string | null => {
    // Check file size (5MB max)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return 'File size must be less than 5MB'
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      return 'File type not allowed. Allowed types: JPEG, PNG, WebP, PDF'
    }

    return null
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    const validationError = validateFile(selectedFile)
    if (validationError) {
      setError(validationError)
      setFile(null)
      return
    }

    setError('')
    setFile(selectedFile)
    setSuccess(false)
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setProgress(0)
    setError('')
    setSuccess(false)

    try {
      const formData = new FormData()
      formData.append('file', file)

      // Using fetch with progress tracking (simulated)
      const xhr = new XMLHttpRequest()

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100
          setProgress(percentComplete)
        }
      })

      const uploadPromise = new Promise<string>((resolve, reject) => {
        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText)
            resolve(response.url)
          } else {
            reject(new Error('Upload failed'))
          }
        })

        xhr.addEventListener('error', () => {
          reject(new Error('Network error'))
        })

        xhr.open('POST', '/api/upload')
        xhr.send(formData)
      })

      const url = await uploadPromise
      setUploadedUrl(url)
      setSuccess(true)
      setFile(null)
    } catch (err: any) {
      setError(err.message || 'Upload failed')
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Basic File Upload</h2>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-100 text-green-700 rounded">
          File uploaded successfully!
          {uploadedUrl && (
            <a href={uploadedUrl} target="_blank" rel="noopener noreferrer" className="block mt-2 underline">
              View file
            </a>
          )}
        </div>
      )}

      <div>
        <label htmlFor="file" className="block mb-1 font-medium">
          Select File (Max 5MB)
        </label>
        <input
          type="file"
          id="file"
          onChange={handleFileChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          accept="image/jpeg,image/png,image/webp,application/pdf"
        />
        {file && (
          <div className="mt-2 text-sm text-gray-600">
            <p>Selected: {file.name}</p>
            <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
            <p>Type: {file.type}</p>
          </div>
        )}
      </div>

      {uploading && (
        <div className="space-y-2">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">{Math.round(progress)}%</p>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {uploading ? 'Uploading...' : 'Upload File'}
      </button>
    </div>
  )
}

// API Route for file upload
// app/api/upload/route.ts
import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large (max 5MB)' },
        { status: 400 }
      )
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename
    const timestamp = Date.now()
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `${timestamp}-${sanitizedName}`

    // Save file (in production, use cloud storage)
    const uploadDir = join(process.cwd(), 'public', 'uploads')
    const filepath = join(uploadDir, filename)
    
    // In production, ensure directory exists
    await writeFile(filepath, buffer)

    const url = `/uploads/${filename}`

    return NextResponse.json({
      success: true,
      url,
      filename,
      size: file.size
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    )
  }
}

