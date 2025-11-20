# Form Handling

> **Category**: Intermediate | **Related Concepts**: [Server Actions](../05-data-fetching/server-actions.md), [File Uploads](../19-file-uploads/README.md)  
> **Last Updated**: 2024

## 📖 Overview

Form handling in Next.js involves managing user input, validation, and submission. Next.js provides multiple ways to handle forms, from basic HTML forms to advanced patterns with Server Actions and form libraries.

**Key Points:**
- HTML forms work out of the box
- Server Actions simplify form submission
- Client-side validation for UX
- Server-side validation for security
- Progressive enhancement support

## 🎯 When to Use

- **Simple Forms**: Basic contact forms, search forms
- **Complex Forms**: Multi-step forms, dynamic fields
- **Data Collection**: User registration, surveys
- **Mutations**: Creating, updating, deleting data
- **Search**: Filtering and searching functionality

## 💻 Basic Example

### HTML Form with Server Action

```typescript
// app/actions.ts
'use server'

export async function submitContactForm(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const message = formData.get('message') as string

  // Validate
  if (!name || !email || !message) {
    return { error: 'All fields are required' }
  }

  // Process form data
  console.log({ name, email, message })
  
  return { success: true }
}
```

```typescript
// app/contact/page.tsx
import { submitContactForm } from './actions'

export default function ContactPage() {
  return (
    <form action={submitContactForm} className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Contact Us</h1>
      
      <div>
        <label htmlFor="name" className="block mb-1 font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
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
          name="email"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label htmlFor="message" className="block mb-1 font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
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
  )
}
```

### Controlled Form Component

```typescript
'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess(false)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setSuccess(true)
        setFormData({ name: '', email: '', message: '' })
      } else {
        const data = await res.json()
        setError(data.error || 'Submission failed')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4">
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-100 text-green-700 rounded">
          Message sent successfully!
        </div>
      )}

      <div>
        <label htmlFor="name" className="block mb-1 font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
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
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label htmlFor="message" className="block mb-1 font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}
```

## 🔧 Advanced Example

### Multi-Step Form

```typescript
'use client'

import { useState } from 'react'

export default function MultiStepForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    personal: { name: '', email: '' },
    address: { street: '', city: '', zip: '' },
    preferences: { newsletter: false, notifications: true }
  })

  const handleChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section as keyof typeof prev], [field]: value }
    }))
  }

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Submit all form data
    console.log(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                s <= step ? 'bg-blue-600 text-white' : 'bg-gray-300'
              }`}
            >
              {s}
            </div>
          ))}
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Personal Information</h2>
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              value={formData.personal.name}
              onChange={(e) => handleChange('personal', 'name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={formData.personal.email}
              onChange={(e) => handleChange('personal', 'email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Address</h2>
          <div>
            <label className="block mb-1 font-medium">Street</label>
            <input
              type="text"
              value={formData.address.street}
              onChange={(e) => handleChange('address', 'street', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">City</label>
            <input
              type="text"
              value={formData.address.city}
              onChange={(e) => handleChange('address', 'city', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Preferences</h2>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.preferences.newsletter}
                onChange={(e) => handleChange('preferences', 'newsletter', e.target.checked)}
                className="mr-2"
              />
              Subscribe to newsletter
            </label>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button
            type="button"
            onClick={prevStep}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Previous
          </button>
        )}
        {step < 3 ? (
          <button
            type="button"
            onClick={nextStep}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        )}
      </div>
    </form>
  )
}
```

## 📋 Common Patterns

### Pattern 1: Server Action with FormData
```typescript
'use server'

export async function submitForm(formData: FormData) {
  const data = Object.fromEntries(formData)
  // Process data
  return { success: true }
}
```
**When to use**: Simple forms, progressive enhancement

### Pattern 2: Controlled Components
```typescript
const [value, setValue] = useState('')
<input value={value} onChange={(e) => setValue(e.target.value)} />
```
**When to use**: Need real-time validation, dynamic UI updates

### Pattern 3: Uncontrolled with useRef
```typescript
const inputRef = useRef<HTMLInputElement>(null)
<input ref={inputRef} />
const value = inputRef.current?.value
```
**When to use**: Simple inputs, file inputs, less React overhead

## ⚠️ Common Mistakes

### Mistake 1: Not Validating on Server
```typescript
// ❌ Wrong: Only client-side validation
'use client'
const handleSubmit = () => {
  if (!email) return // Can be bypassed
  await submitForm({ email })
}
```

```typescript
// ✅ Correct: Validate on server
'use server'
export async function submitForm(formData: FormData) {
  const email = formData.get('email')
  if (!email || !isValidEmail(email)) {
    return { error: 'Invalid email' }
  }
  // Process
}
```
**Why**: Client-side validation can be bypassed. Always validate on server.

### Mistake 2: Not Handling Loading States
```typescript
// ❌ Wrong: No loading feedback
<button type="submit">Submit</button>
```

```typescript
// ✅ Correct: Show loading state
const [isPending, startTransition] = useTransition()
<button type="submit" disabled={isPending}>
  {isPending ? 'Submitting...' : 'Submit'}
</button>
```
**Why**: Users need feedback during async operations.

### Mistake 3: Not Clearing Form After Success
```typescript
// ❌ Wrong: Form stays filled
if (success) {
  // Form still has old data
}
```

```typescript
// ✅ Correct: Reset form
if (success) {
  setFormData({ name: '', email: '', message: '' })
  form.reset() // Or use form ref
}
```
**Why**: Better UX, prevents accidental resubmission.

## ✨ Best Practices

1. **Always validate on server**: Client validation is for UX, server validation is for security
2. **Use Server Actions**: Simpler than API routes for form submissions
3. **Show loading states**: Use `useTransition` for Server Actions
4. **Handle errors gracefully**: Display user-friendly error messages
5. **Provide feedback**: Show success/error states clearly
6. **Use proper input types**: `email`, `tel`, `url`, etc. for better UX
7. **Accessibility**: Use proper labels, ARIA attributes
8. **Progressive enhancement**: Forms should work without JavaScript

## 🔗 Related Concepts

- [Server Actions](../05-data-fetching/server-actions.md) - Server-side form processing
- [File Uploads](../19-file-uploads/README.md) - File upload forms
- [Validation](./form-validation.md) - Form validation patterns

## 📚 Resources

### Official Documentation
- [Next.js Forms](https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations)

## 🎓 Key Takeaways

- HTML forms work without JavaScript (progressive enhancement)
- Server Actions simplify form handling
- Always validate on both client and server
- Use controlled components for complex forms
- Show loading and error states
- Clear forms after successful submission

