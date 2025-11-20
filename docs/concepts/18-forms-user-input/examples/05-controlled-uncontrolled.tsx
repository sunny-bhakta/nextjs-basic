// Example 5: Controlled vs Uncontrolled Components
// Demonstrates both patterns and when to use each

'use client'

import { useState, useRef } from 'react'

// Controlled Component Example
export function ControlledForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    console.log({ name, email })
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Controlled Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {submitted && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p>Name: {name}</p>
          <p>Email: {email}</p>
        </div>
      )}
    </div>
  )
}

// Uncontrolled Component Example
export function UncontrolledForm() {
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [data, setData] = useState<{ name: string; email: string } | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = {
      name: nameRef.current?.value || '',
      email: emailRef.current?.value || ''
    }
    setData(formData)
    setSubmitted(true)
    console.log(formData)
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Uncontrolled Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            ref={nameRef}
            defaultValue=""
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            defaultValue=""
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {submitted && data && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p>Name: {data.name}</p>
          <p>Email: {data.email}</p>
        </div>
      )}
    </div>
  )
}

// Mixed: Controlled for validation, Uncontrolled for simple inputs
export function MixedForm() {
  // Controlled: Need validation
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  // Uncontrolled: Simple input, no validation needed
  const nameRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError('Email is required')
      return false
    }
    if (!/\S+@\S+\.\S+/.test(value)) {
      setEmailError('Invalid email')
      return false
    }
    setEmailError('')
    return true
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (emailError) {
      validateEmail(e.target.value)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      return
    }

    const formData = {
      name: nameRef.current?.value || '',
      email,
      phone: phoneRef.current?.value || ''
    }

    console.log(formData)
    alert('Form submitted!')
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Mixed Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            Name (Uncontrolled)
          </label>
          <input
            type="text"
            id="name"
            ref={nameRef}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email (Controlled - for validation)
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            onBlur={() => validateEmail(email)}
            className={`w-full px-3 py-2 border rounded ${
              emailError ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {emailError && (
            <p className="mt-1 text-sm text-red-600">{emailError}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block mb-1 font-medium">
            Phone (Uncontrolled)
          </label>
          <input
            type="tel"
            id="phone"
            ref={phoneRef}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

// File Input (Always Uncontrolled)
export function FileUploadForm() {
  const fileRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const file = fileRef.current?.files?.[0]
    if (file) {
      console.log('File selected:', file.name, file.size)
      // Handle file upload
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">File Upload (Uncontrolled)</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="file" className="block mb-1 font-medium">
            Select File
          </label>
          <input
            type="file"
            id="file"
            ref={fileRef}
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
          {selectedFile && (
            <p className="mt-2 text-sm text-gray-600">
              Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>
    </div>
  )
}

