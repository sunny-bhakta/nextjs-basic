// Example 6: Complete File Upload Example
// Comprehensive example with all features

'use client'

import { useState, useRef, DragEvent } from 'react'
import { useTransition } from 'react'

interface FileItem {
  id: string
  file: File
  preview?: string
  status: 'pending' | 'uploading' | 'success' | 'error'
  progress: number
  url?: string
  error?: string
}

// Server Action
// app/actions.ts
'use server'

import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function uploadFileAction(formData: FormData) {
  const file = formData.get('file') as File
  const title = formData.get('title') as string

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
    'image/gif',
    'application/pdf',
    'text/plain'
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

    const url = `/uploads/${filename}`

    return {
      success: true,
      url,
      filename,
      size: file.size,
      title
    }
  } catch (error) {
    console.error('Upload error:', error)
    return { error: 'Failed to upload file' }
  }
}

// Client Component
export default function CompleteFileUpload() {
  const [files, setFiles] = useState<FileItem[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [title, setTitle] = useState('')
  const [isPending, startTransition] = useTransition()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const generateId = () => Math.random().toString(36).substring(7)

  const createPreview = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => resolve(e.target?.result as string)
        reader.onerror = reject
        reader.readAsDataURL(file)
      } else {
        resolve('')
      }
    })
  }

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList) return

    const newFiles: FileItem[] = await Promise.all(
      Array.from(fileList).map(async (file) => {
        const preview = file.type.startsWith('image/')
          ? await createPreview(file)
          : undefined

        return {
          id: generateId(),
          file,
          preview,
          status: 'pending' as const,
          progress: 0
        }
      })
    )

    setFiles(prev => [...prev, ...newFiles])
  }

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files)
  }

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id))
  }

  const uploadFile = async (fileItem: FileItem) => {
    setFiles(prev => prev.map(f => 
      f.id === fileItem.id 
        ? { ...f, status: 'uploading' as const, progress: 0 }
        : f
    ))

    const formData = new FormData()
    formData.append('file', fileItem.file)
    formData.append('title', title || fileItem.file.name)

    return new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const progress = (e.loaded / e.total) * 100
          setFiles(prev => prev.map(f => 
            f.id === fileItem.id ? { ...f, progress } : f
          ))
        }
      })

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText)
          setFiles(prev => prev.map(f => 
            f.id === fileItem.id 
              ? { ...f, status: 'success' as const, url: response.url, progress: 100 }
              : f
          ))
          resolve()
        } else {
          setFiles(prev => prev.map(f => 
            f.id === fileItem.id 
              ? { ...f, status: 'error' as const, error: 'Upload failed' }
              : f
          ))
          reject()
        }
      })

      xhr.addEventListener('error', () => {
        setFiles(prev => prev.map(f => 
          f.id === fileItem.id 
            ? { ...f, status: 'error' as const, error: 'Network error' }
            : f
        ))
        reject()
      })

      xhr.open('POST', '/api/upload')
      xhr.send(formData)
    })
  }

  const uploadAll = async () => {
    const pendingFiles = files.filter(f => f.status === 'pending')
    
    await Promise.all(
      pendingFiles.map(fileItem => uploadFile(fileItem))
    )
  }

  const pendingCount = files.filter(f => f.status === 'pending').length
  const uploadingCount = files.filter(f => f.status === 'uploading').length
  const successCount = files.filter(f => f.status === 'success').length
  const errorCount = files.filter(f => f.status === 'error').length

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">File Upload Manager</h1>
        <p className="text-gray-600">
          Upload multiple files with drag & drop, preview, and progress tracking
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">
            Upload Title (Optional)
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title for your uploads"
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>

        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 bg-gray-50 hover:border-gray-400'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileInputChange}
            className="hidden"
            accept="image/*,application/pdf,text/plain"
          />

          <div className="space-y-4">
            <div className="text-4xl">📁</div>
            {isDragging ? (
              <>
                <p className="text-lg font-medium text-blue-600">Drop files here</p>
                <p className="text-sm text-gray-600">Release to add files</p>
              </>
            ) : (
              <>
                <div>
                  <p className="text-lg font-medium text-gray-700">
                    Drag and drop files here
                  </p>
                  <p className="text-sm text-gray-500 mt-1">or</p>
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Browse Files
                </button>
                <p className="text-xs text-gray-400">
                  Supported: Images, PDF, Text files (Max 10MB each)
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div className="text-sm">
              <span className="font-medium text-gray-700">{files.length}</span>{' '}
              <span className="text-gray-600">file(s) | </span>
              <span className="text-green-600 font-medium">{successCount} uploaded</span>
              {uploadingCount > 0 && (
                <> | <span className="text-blue-600 font-medium">{uploadingCount} uploading</span></>
              )}
              {errorCount > 0 && (
                <> | <span className="text-red-600 font-medium">{errorCount} failed</span></>
              )}
            </div>
            {pendingCount > 0 && (
              <button
                onClick={uploadAll}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Upload All ({pendingCount})
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {files.map((fileItem) => (
              <div
                key={fileItem.id}
                className="border border-gray-300 rounded-lg p-4 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{fileItem.file.name}</p>
                    <p className="text-sm text-gray-600">
                      {(fileItem.file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <button
                    onClick={() => removeFile(fileItem.id)}
                    className="ml-2 text-red-600 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>

                {fileItem.preview && (
                  <div className="w-full h-32 bg-gray-100 rounded overflow-hidden">
                    <img
                      src={fileItem.preview}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}

                {fileItem.status === 'pending' && (
                  <button
                    onClick={() => uploadFile(fileItem)}
                    className="w-full py-2 px-3 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
                  >
                    Upload
                  </button>
                )}

                {fileItem.status === 'uploading' && (
                  <div className="space-y-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${fileItem.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-center text-gray-600">
                      {Math.round(fileItem.progress)}%
                    </p>
                  </div>
                )}

                {fileItem.status === 'success' && (
                  <div className="p-2 bg-green-100 text-green-700 rounded text-sm">
                    <div className="flex items-center gap-2">
                      <span>✓</span>
                      <span>Uploaded successfully</span>
                    </div>
                    {fileItem.url && (
                      <a
                        href={fileItem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mt-1 underline text-xs"
                      >
                        View file
                      </a>
                    )}
                  </div>
                )}

                {fileItem.status === 'error' && (
                  <div className="p-2 bg-red-100 text-red-700 rounded text-sm">
                    <div className="flex items-center gap-2">
                      <span>✗</span>
                      <span>{fileItem.error || 'Upload failed'}</span>
                    </div>
                    <button
                      onClick={() => uploadFile(fileItem)}
                      className="block mt-1 underline text-xs"
                    >
                      Retry
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

