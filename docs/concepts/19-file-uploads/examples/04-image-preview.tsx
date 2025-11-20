// Example 4: Image Upload with Preview
// Demonstrates image upload with preview and validation

'use client'

import { useState, useRef } from 'react'

export default function ImageUploadWithPreview() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateImage = (file: File): string | null => {
    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      return 'File must be an image'
    }

    // Check file size (5MB max)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return 'Image size must be less than 5MB'
    }

    // Check dimensions (optional - would need to load image)
    return null
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validationError = validateImage(file)
    if (validationError) {
      setError(validationError)
      setSelectedFile(null)
      setPreview(null)
      return
    }

    setError('')
    setSelectedFile(file)
    setSuccess(false)

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (res.ok) {
        setSuccess(true)
        // Optionally clear after success
        // setSelectedFile(null)
        // setPreview(null)
        // if (fileInputRef.current) fileInputRef.current.value = ''
      } else {
        const data = await res.json()
        setError(data.error || 'Upload failed')
      }
    } catch (err: any) {
      setError(err.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setSelectedFile(null)
    setPreview(null)
    setError('')
    setSuccess(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Image Upload with Preview</h2>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-100 text-green-700 rounded">
          Image uploaded successfully!
        </div>
      )}

      <div>
        <label htmlFor="image" className="block mb-1 font-medium">
          Select Image (Max 5MB)
        </label>
        <input
          ref={fileInputRef}
          type="file"
          id="image"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>

      {preview && (
        <div className="space-y-2">
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-contain border border-gray-300 rounded"
            />
            {selectedFile && (
              <div className="mt-2 text-sm text-gray-600">
                <p>File: {selectedFile.name}</p>
                <p>Size: {(selectedFile.size / 1024).toFixed(2)} KB</p>
                <p>Type: {selectedFile.type}</p>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="flex-1 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Upload Image'}
            </button>
            <button
              onClick={handleRemove}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      {!preview && (
        <div className="border-2 border-dashed border-gray-300 rounded p-8 text-center">
          <p className="text-gray-500">No image selected</p>
          <p className="text-sm text-gray-400 mt-2">
            Click "Select Image" to choose a file
          </p>
        </div>
      )}
    </div>
  )
}

// Image Upload with Resize (using canvas)
export function ImageUploadWithResize() {
  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [resizedPreview, setResizedPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  const resizeImage = (file: File, maxWidth: number, maxHeight: number): Promise<File> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          let width = img.width
          let height = img.height

          // Calculate new dimensions
          if (width > height) {
            if (width > maxWidth) {
              height = (height * maxWidth) / width
              width = maxWidth
            }
          } else {
            if (height > maxHeight) {
              width = (width * maxHeight) / height
              height = maxHeight
            }
          }

          canvas.width = width
          canvas.height = height

          const ctx = canvas.getContext('2d')
          ctx?.drawImage(img, 0, 0, width, height)

          canvas.toBlob((blob) => {
            if (blob) {
              const resizedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now()
              })
              resolve(resizedFile)
            }
          }, file.type, 0.9)
        }
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(file)
    })
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setOriginalFile(file)

    // Resize image
    const resized = await resizeImage(file, 800, 800)
    
    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setResizedPreview(reader.result as string)
    }
    reader.readAsDataURL(resized)
  }

  const handleUpload = async () => {
    if (!originalFile) return

    setUploading(true)

    // Resize before upload
    const resized = await resizeImage(originalFile, 800, 800)

    const formData = new FormData()
    formData.append('file', resized)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (res.ok) {
        alert('Image uploaded successfully!')
      }
    } catch (error) {
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Image Upload with Resize</h2>

      <div>
        <label htmlFor="image" className="block mb-1 font-medium">
          Select Image
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>

      {originalFile && (
        <div className="space-y-2">
          <div>
            <p className="text-sm font-medium">Original:</p>
            <p className="text-sm text-gray-600">
              {(originalFile.size / 1024).toFixed(2)} KB
            </p>
          </div>
        </div>
      )}

      {resizedPreview && (
        <div className="space-y-2">
          <img
            src={resizedPreview}
            alt="Resized preview"
            className="w-full h-64 object-contain border border-gray-300 rounded"
          />
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload Resized Image'}
          </button>
        </div>
      )}
    </div>
  )
}

