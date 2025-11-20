# File Upload Handling

> **Category**: Intermediate | **Related Concepts**: [Forms & User Input](../18-forms-user-input/README.md), [API Routes](../06-api-routes/README.md)  
> **Last Updated**: 2024

## 📖 Overview

File uploads in Next.js can be handled through API routes or Server Actions. Understanding how to process multipart form data, validate files, and store them is essential for building file upload features.

**Key Points:**
- Use FormData for file uploads
- Validate file type and size
- Process files on server
- Store files securely
- Show upload progress
- Handle errors gracefully

## 🎯 When to Use

- **Image Uploads**: User avatars, gallery images
- **Document Uploads**: PDFs, documents
- **Media Files**: Videos, audio files
- **Bulk Uploads**: Multiple files at once
- **File Management**: Upload, view, delete files

## 💻 Basic Example

### API Route Upload

```typescript
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

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large (max 5MB)' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type' },
        { status: 400 }
      )
    }

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

    return NextResponse.json({
      success: true,
      url: `/uploads/${filename}`,
      filename,
      size: file.size
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    )
  }
}
```

### Client Component

```typescript
'use client'

import { useState } from 'react'

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError('')
      setSuccess(false)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (res.ok) {
        const data = await res.json()
        setSuccess(true)
        setFile(null)
        console.log('Uploaded:', data.url)
      } else {
        const data = await res.json()
        setError(data.error || 'Upload failed')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        className="w-full px-3 py-2 border border-gray-300 rounded"
      />

      {file && (
        <div className="text-sm text-gray-600">
          Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-100 text-green-700 rounded">
          File uploaded successfully!
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  )
}
```

## 🔧 Advanced Example

### Server Action Upload

```typescript
// app/actions.ts
'use server'

import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function uploadFile(formData: FormData) {
  const file = formData.get('file') as File
  const description = formData.get('description') as string

  if (!file) {
    return { error: 'No file provided' }
  }

  // Validate
  const maxSize = 10 * 1024 * 1024 // 10MB
  if (file.size > maxSize) {
    return { error: 'File too large (max 10MB)' }
  }

  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf'
  ]

  if (!allowedTypes.includes(file.type)) {
    return { error: 'Invalid file type' }
  }

  try {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const timestamp = Date.now()
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `${timestamp}-${sanitizedName}`

    const uploadDir = join(process.cwd(), 'public', 'uploads')
    const filepath = join(uploadDir, filename)
    await writeFile(filepath, buffer)

    return {
      success: true,
      url: `/uploads/${filename}`,
      filename,
      size: file.size,
      description
    }
  } catch (error) {
    return { error: 'Failed to upload file' }
  }
}
```

### With Progress Tracking

```typescript
'use client'

import { useState } from 'react'

export default function FileUploadWithProgress() {
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)

  const handleUpload = () => {
    if (!file) return

    setUploading(true)
    setProgress(0)

    const formData = new FormData()
    formData.append('file', file)

    const xhr = new XMLHttpRequest()

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        const percentComplete = (e.loaded / e.total) * 100
        setProgress(percentComplete)
      }
    })

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        alert('Upload complete!')
        setFile(null)
        setProgress(0)
      }
      setUploading(false)
    })

    xhr.addEventListener('error', () => {
      alert('Upload failed')
      setUploading(false)
    })

    xhr.open('POST', '/api/upload')
    xhr.send(formData)
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="w-full px-3 py-2 border border-gray-300 rounded"
      />

      {uploading && (
        <div className="space-y-2">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">{Math.round(progress)}%</p>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  )
}
```

## 📋 Common Patterns

### Pattern 1: Multiple Files
```typescript
const formData = new FormData()
files.forEach(file => {
  formData.append('files', file)
})
```
**When to use**: Bulk uploads, gallery uploads

### Pattern 2: Image Preview
```typescript
const reader = new FileReader()
reader.onload = (e) => setPreview(e.target.result)
reader.readAsDataURL(file)
```
**When to use**: Image uploads, user avatars

### Pattern 3: Drag and Drop
```typescript
onDrop={(e) => {
  e.preventDefault()
  const files = e.dataTransfer.files
  handleFiles(files)
}}
```
**When to use**: Better UX, modern interfaces

## ⚠️ Common Mistakes

### Mistake 1: No File Validation
```typescript
// ❌ Wrong: No validation
const file = formData.get('file')
await saveFile(file)
```

```typescript
// ✅ Correct: Validate file
if (!file || file.size > maxSize || !allowedTypes.includes(file.type)) {
  return { error: 'Invalid file' }
}
```
**Why**: Security risk, can upload malicious files.

### Mistake 2: Not Sanitizing Filenames
```typescript
// ❌ Wrong: Unsafe filename
const filename = file.name
```

```typescript
// ✅ Correct: Sanitize filename
const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
const filename = `${timestamp}-${sanitizedName}`
```
**Why**: Prevents path traversal attacks.

### Mistake 3: Storing in Public Directory
```typescript
// ❌ Wrong: Public access
await writeFile(join('public', 'uploads', filename), buffer)
```

```typescript
// ✅ Correct: Secure storage
await writeFile(join('uploads', 'secure', filename), buffer)
// Or use cloud storage
```
**Why**: Public directory exposes files directly.

## ✨ Best Practices

1. **Validate file type and size**: Always validate on server
2. **Sanitize filenames**: Prevent path traversal
3. **Use secure storage**: Don't store in public directory
4. **Show progress**: Better UX with progress indicators
5. **Handle errors**: Display user-friendly error messages
6. **Limit file size**: Set reasonable limits
7. **Use cloud storage**: For production (S3, Cloudinary, etc.)
8. **Generate unique filenames**: Prevent overwrites

## 🔗 Related Concepts

- [Forms & User Input](../18-forms-user-input/README.md) - Form handling
- [API Routes](../06-api-routes/README.md) - Route handlers
- [Server Actions](../05-data-fetching/server-actions.md) - Server-side processing

## 📚 Resources

### Storage Solutions
- [AWS S3](https://aws.amazon.com/s3/)
- [Cloudinary](https://cloudinary.com/)
- [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)

## 🎓 Key Takeaways

- Always validate files on server
- Sanitize filenames before saving
- Use secure storage (not public directory)
- Show upload progress for better UX
- Handle errors gracefully
- Use cloud storage for production

