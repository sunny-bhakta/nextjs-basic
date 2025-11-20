// Example 3: Multiple File Upload
// Demonstrates uploading multiple files

'use client'

import { useState } from 'react'

interface FileWithProgress {
  file: File
  progress: number
  status: 'pending' | 'uploading' | 'success' | 'error'
  error?: string
  url?: string
}

export default function MultipleFileUpload() {
  const [files, setFiles] = useState<FileWithProgress[]>([])
  const [uploading, setUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    
    const newFiles: FileWithProgress[] = selectedFiles.map(file => ({
      file,
      progress: 0,
      status: 'pending' as const
    }))

    setFiles(prev => [...prev, ...newFiles])
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const uploadFile = async (fileWithProgress: FileWithProgress, index: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      const formData = new FormData()
      formData.append('file', fileWithProgress.file)

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
          reject(new Error('Upload failed'))
        }
      })

      xhr.addEventListener('error', () => {
        setFiles(prev => prev.map((f, i) => 
          i === index 
            ? { ...f, status: 'error' as const, error: 'Network error' }
            : f
        ))
        reject(new Error('Network error'))
      })

      xhr.open('POST', '/api/upload')
      xhr.send(formData)
    })
  }

  const handleUploadAll = async () => {
    setUploading(true)

    const uploadPromises = files.map((fileWithProgress, index) => {
      if (fileWithProgress.status === 'pending') {
        setFiles(prev => prev.map((f, i) => 
          i === index ? { ...f, status: 'uploading' as const } : f
        ))
        return uploadFile(fileWithProgress, index)
      }
      return Promise.resolve()
    })

    try {
      await Promise.all(uploadPromises)
    } catch (error) {
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  const totalFiles = files.length
  const uploadedFiles = files.filter(f => f.status === 'success').length
  const failedFiles = files.filter(f => f.status === 'error').length

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Multiple File Upload</h2>

      <div>
        <label htmlFor="files" className="block mb-1 font-medium">
          Select Files (Multiple)
        </label>
        <input
          type="file"
          id="files"
          multiple
          onChange={handleFileChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          accept="image/*,application/pdf"
        />
      </div>

      {totalFiles > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              {totalFiles} file(s) selected | {uploadedFiles} uploaded | {failedFiles} failed
            </p>
            <button
              onClick={handleUploadAll}
              disabled={uploading || files.every(f => f.status !== 'pending')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Upload All'}
            </button>
          </div>

          <div className="space-y-2">
            {files.map((fileWithProgress, index) => (
              <div
                key={index}
                className="p-4 border border-gray-300 rounded space-y-2"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium">{fileWithProgress.file.name}</p>
                    <p className="text-sm text-gray-600">
                      {(fileWithProgress.file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>

                {fileWithProgress.status === 'uploading' && (
                  <div className="space-y-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${fileWithProgress.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600">
                      {Math.round(fileWithProgress.progress)}%
                    </p>
                  </div>
                )}

                {fileWithProgress.status === 'success' && (
                  <div className="p-2 bg-green-100 text-green-700 rounded text-sm">
                    ✓ Uploaded successfully
                    {fileWithProgress.url && (
                      <a
                        href={fileWithProgress.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mt-1 underline"
                      >
                        View file
                      </a>
                    )}
                  </div>
                )}

                {fileWithProgress.status === 'error' && (
                  <div className="p-2 bg-red-100 text-red-700 rounded text-sm">
                    ✗ {fileWithProgress.error || 'Upload failed'}
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

