// Example 5: Drag and Drop Upload
// Demonstrates drag and drop file upload interface

'use client'

import { useState, useRef, DragEvent } from 'react'

interface FileWithStatus {
  file: File
  status: 'pending' | 'uploading' | 'success' | 'error'
  progress: number
  url?: string
  error?: string
}

export default function DragDropUpload() {
  const [files, setFiles] = useState<FileWithStatus[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return 'File too large (max 10MB)'
    }

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'application/pdf'
    ]

    if (!allowedTypes.includes(file.type)) {
      return 'Invalid file type'
    }

    return null
  }

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return

    const newFiles: FileWithStatus[] = Array.from(fileList)
      .map(file => {
        const error = validateFile(file)
        return {
          file,
          status: error ? 'error' as const : 'pending' as const,
          progress: 0,
          error
        }
      })

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

    const droppedFiles = e.dataTransfer.files
    handleFiles(droppedFiles)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files)
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const uploadFile = async (fileWithStatus: FileWithStatus, index: number) => {
    setFiles(prev => prev.map((f, i) => 
      i === index ? { ...f, status: 'uploading' as const } : f
    ))

    const formData = new FormData()
    formData.append('file', fileWithStatus.file)

    return new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const progress = (e.loaded / e.total) * 100
          setFiles(prev => prev.map((f, i) => 
            i === index ? { ...f, progress } : f
          ))
        }
      })

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText)
          setFiles(prev => prev.map((f, i) => 
            i === index 
              ? { ...f, status: 'success' as const, url: response.url, progress: 100 }
              : f
          ))
          resolve()
        } else {
          setFiles(prev => prev.map((f, i) => 
            i === index 
              ? { ...f, status: 'error' as const, error: 'Upload failed' }
              : f
          ))
          reject()
        }
      })

      xhr.addEventListener('error', () => {
        setFiles(prev => prev.map((f, i) => 
          i === index 
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
    const pendingFiles = files
      .map((f, i) => ({ file: f, index: i }))
      .filter(({ file }) => file.status === 'pending')

    await Promise.all(
      pendingFiles.map(({ file, index }) => uploadFile(file, index))
    )
  }

  const pendingCount = files.filter(f => f.status === 'pending').length
  const uploadingCount = files.filter(f => f.status === 'uploading').length
  const successCount = files.filter(f => f.status === 'success').length
  const errorCount = files.filter(f => f.status === 'error').length

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Drag & Drop File Upload</h2>

      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 bg-gray-50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileInputChange}
          className="hidden"
          accept="image/*,application/pdf"
        />

        {isDragging ? (
          <div className="space-y-2">
            <p className="text-lg font-medium text-blue-600">Drop files here</p>
            <p className="text-sm text-gray-600">Release to upload</p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-700">
              Drag and drop files here
            </p>
            <p className="text-sm text-gray-500">or</p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Browse Files
            </button>
            <p className="text-xs text-gray-400 mt-2">
              Supported: Images, PDF (Max 10MB each)
            </p>
          </div>
        )}
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <span className="font-medium">{files.length}</span> file(s) |{' '}
              <span className="text-green-600">{successCount} uploaded</span> |{' '}
              <span className="text-red-600">{errorCount} failed</span>
              {uploadingCount > 0 && (
                <> | <span className="text-blue-600">{uploadingCount} uploading</span></>
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

          <div className="space-y-2">
            {files.map((fileWithStatus, index) => (
              <div
                key={index}
                className="p-4 border border-gray-300 rounded-lg space-y-2"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{fileWithStatus.file.name}</p>
                    <p className="text-sm text-gray-600">
                      {(fileWithStatus.file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="ml-2 text-red-600 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>

                {fileWithStatus.status === 'pending' && (
                  <button
                    onClick={() => uploadFile(fileWithStatus, index)}
                    className="w-full py-1 px-3 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
                  >
                    Upload
                  </button>
                )}

                {fileWithStatus.status === 'uploading' && (
                  <div className="space-y-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${fileWithStatus.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600">
                      Uploading... {Math.round(fileWithStatus.progress)}%
                    </p>
                  </div>
                )}

                {fileWithStatus.status === 'success' && (
                  <div className="p-2 bg-green-100 text-green-700 rounded text-sm">
                    ✓ Uploaded successfully
                    {fileWithStatus.url && (
                      <a
                        href={fileWithStatus.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mt-1 underline"
                      >
                        View file
                      </a>
                    )}
                  </div>
                )}

                {fileWithStatus.status === 'error' && (
                  <div className="p-2 bg-red-100 text-red-700 rounded text-sm">
                    ✗ {fileWithStatus.error || 'Upload failed'}
                    <button
                      onClick={() => uploadFile(fileWithStatus, index)}
                      className="block mt-1 underline"
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

