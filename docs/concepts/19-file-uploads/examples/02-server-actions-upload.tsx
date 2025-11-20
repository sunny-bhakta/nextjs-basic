// Example 2: Server Actions File Upload
// Demonstrates file upload with Server Actions

// app/actions.ts - Server Action for file upload
'use server'

import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function uploadFile(formData: FormData) {
  const file = formData.get('file') as File
  const description = formData.get('description') as string

  if (!file) {
    return { error: 'No file provided' }
  }

  // Validate file
  const maxSize = 10 * 1024 * 1024 // 10MB
  if (file.size > maxSize) {
    return { error: 'File too large (max 10MB)' }
  }

  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'application/pdf'
  ]

  if (!allowedTypes.includes(file.type)) {
    return { error: 'Invalid file type' }
  }

  try {
    // Convert to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate filename
    const timestamp = Date.now()
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `${timestamp}-${sanitizedName}`

    // Save file
    const uploadDir = join(process.cwd(), 'public', 'uploads')
    const filepath = join(uploadDir, filename)
    await writeFile(filepath, buffer)

    // In production, upload to cloud storage instead
    // const url = await uploadToS3(buffer, filename)

    const url = `/uploads/${filename}`

    return {
      success: true,
      url,
      filename,
      size: file.size,
      description
    }
  } catch (error) {
    console.error('Upload error:', error)
    return { error: 'Failed to upload file' }
  }
}

// Client Component
'use client'

import { uploadFile } from '@/app/actions'
import { useTransition } from 'react'
import { useState } from 'react'

export default function ServerActionUpload() {
  const [isPending, startTransition] = useTransition()
  const [file, setFile] = useState<File | null>(null)
  const [description, setDescription] = useState('')
  const [result, setResult] = useState<{
    success?: boolean
    error?: string
    url?: string
  } | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setResult(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setResult(null)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('description', description)

    startTransition(async () => {
      const res = await uploadFile(formData)
      setResult(res)

      if (res.success) {
        setFile(null)
        setDescription('')
        // Reset file input
        const fileInput = document.getElementById('file') as HTMLInputElement
        if (fileInput) fileInput.value = ''
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Upload File (Server Action)</h2>

      {result?.success && (
        <div className="p-4 bg-green-100 text-green-700 rounded">
          File uploaded successfully!
          {result.url && (
            <a href={result.url} target="_blank" rel="noopener noreferrer" className="block mt-2 underline">
              View file
            </a>
          )}
        </div>
      )}

      {result?.error && (
        <div className="p-4 bg-red-100 text-red-700 rounded">
          {result.error}
        </div>
      )}

      <div>
        <label htmlFor="description" className="block mb-1 font-medium">
          Description
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          placeholder="File description (optional)"
        />
      </div>

      <div>
        <label htmlFor="file" className="block mb-1 font-medium">
          Select File (Max 10MB)
        </label>
        <input
          type="file"
          id="file"
          onChange={handleFileChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          accept="image/*,application/pdf"
        />
        {file && (
          <div className="mt-2 text-sm text-gray-600">
            <p>Selected: {file.name}</p>
            <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={!file || isPending}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? 'Uploading...' : 'Upload File'}
      </button>
    </form>
  )
}

// Alternative: Direct form action (Progressive Enhancement)
export function DirectFormAction() {
  return (
    <form action={uploadFile} className="max-w-md mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Upload File</h2>

      <div>
        <label htmlFor="description" className="block mb-1 font-medium">
          Description
        </label>
        <input
          type="text"
          id="description"
          name="description"
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label htmlFor="file" className="block mb-1 font-medium">
          Select File
        </label>
        <input
          type="file"
          id="file"
          name="file"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Upload
      </button>
    </form>
  )
}

