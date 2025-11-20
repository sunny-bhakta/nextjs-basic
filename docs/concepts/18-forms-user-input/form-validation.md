# Form Validation

> **Category**: Intermediate | **Related Concepts**: [Form Handling](./form-handling.md), [Server Actions](../05-data-fetching/server-actions.md)  
> **Last Updated**: 2024

## 📖 Overview

Form validation ensures data integrity and provides good user experience. Next.js forms should have both client-side validation (for UX) and server-side validation (for security).

**Key Points:**
- Client-side: Immediate feedback, better UX
- Server-side: Security, data integrity
- Schema validation with Zod
- Real-time validation
- Error display patterns

## 🎯 When to Use

- **User Input**: All forms need validation
- **Data Integrity**: Ensure correct data format
- **Security**: Prevent malicious input
- **UX**: Provide immediate feedback
- **Type Safety**: Validate with TypeScript

## 💻 Basic Example

### Client-Side Validation

```typescript
'use client'

import { useState } from 'react'

export default function ValidatedForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      // Submit form
      console.log('Form is valid:', formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4">
      <div>
        <label htmlFor="email" className="block mb-1 font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => {
            setFormData(prev => ({ ...prev, email: e.target.value }))
            if (errors.email) {
              setErrors(prev => ({ ...prev, email: '' }))
            }
          }}
          className={`w-full px-3 py-2 border rounded ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block mb-1 font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={(e) => {
            setFormData(prev => ({ ...prev, password: e.target.value }))
            if (errors.password) {
              setErrors(prev => ({ ...prev, password: '' }))
            }
          }}
          className={`w-full px-3 py-2 border rounded ${
            errors.password ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        )}
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

### Server-Side Validation with Zod

```typescript
// app/actions.ts
'use server'

import { z } from 'zod'

const userSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(18, 'Must be 18 or older').max(120, 'Invalid age'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

export async function createUser(formData: FormData) {
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    age: Number(formData.get('age')),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword')
  }

  // Validate with Zod
  const result = userSchema.safeParse(rawData)

  if (!result.success) {
    return {
      error: 'Validation failed',
      issues: result.error.issues
    }
  }

  // Create user
  // await createUserInDb(result.data)

  return { success: true, user: result.data }
}
```

## 🔧 Advanced Example

### Real-Time Validation

```typescript
'use client'

import { useState } from 'react'
import { z } from 'zod'

const emailSchema = z.string().email('Invalid email')

export default function RealTimeValidation() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [touched, setTouched] = useState(false)

  const validateEmail = (value: string) => {
    const result = emailSchema.safeParse(value)
    if (!result.success) {
      setError(result.error.errors[0].message)
    } else {
      setError('')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    
    // Validate on change if field has been touched
    if (touched) {
      validateEmail(value)
    }
  }

  const handleBlur = () => {
    setTouched(true)
    validateEmail(email)
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <div>
        <label htmlFor="email" className="block mb-1 font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-3 py-2 border rounded ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
        {!error && email && (
          <p className="mt-1 text-sm text-green-600">✓ Valid email</p>
        )}
      </div>
    </div>
  )
}
```

### Custom Validation Rules

```typescript
import { z } from 'zod'

// Custom validation function
const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')

const formSchema = z.object({
  email: z.string().email('Invalid email'),
  password: passwordSchema,
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})
```

## 📋 Common Patterns

### Pattern 1: Validate on Blur
```typescript
const handleBlur = () => {
  setTouched(true)
  validateField()
}
```
**When to use**: Less aggressive, better UX for some cases

### Pattern 2: Validate on Change
```typescript
const handleChange = (e) => {
  setValue(e.target.value)
  if (touched) validateField()
}
```
**When to use**: Real-time feedback, better for complex validation

### Pattern 3: Validate on Submit
```typescript
const handleSubmit = (e) => {
  e.preventDefault()
  if (validateAll()) {
    submit()
  }
}
```
**When to use**: Simple forms, less validation overhead

## ⚠️ Common Mistakes

### Mistake 1: Only Client-Side Validation
```typescript
// ❌ Wrong: Can be bypassed
'use client'
if (!email) return
await submit({ email })
```

```typescript
// ✅ Correct: Validate on server
'use server'
if (!email || !isValidEmail(email)) {
  return { error: 'Invalid email' }
}
```
**Why**: Client validation can be disabled or bypassed.

### Mistake 2: Not Clearing Errors
```typescript
// ❌ Wrong: Errors persist
const [error, setError] = useState('')
// Error never clears when user fixes it
```

```typescript
// ✅ Correct: Clear on change
onChange={(e) => {
  setValue(e.target.value)
  if (error) setError('')
}}
```
**Why**: Users should see errors clear when they fix them.

### Mistake 3: Too Aggressive Validation
```typescript
// ❌ Wrong: Validates on every keystroke immediately
onChange={(e) => validate(e.target.value)}
```

```typescript
// ✅ Correct: Validate after user interaction
onBlur={() => validate()}
// Or with debounce
```
**Why**: Too aggressive validation is annoying.

## ✨ Best Practices

1. **Validate on both client and server**: Client for UX, server for security
2. **Use schema validation**: Zod, Yup, or similar
3. **Show errors clearly**: Visual indicators, error messages
4. **Validate at the right time**: On blur, change, or submit
5. **Clear errors appropriately**: When user fixes the issue
6. **Use proper input types**: `email`, `tel`, `url` for browser validation
7. **Provide helpful messages**: Tell users how to fix errors
8. **Accessibility**: Associate errors with inputs using ARIA

## 🔗 Related Concepts

- [Form Handling](./form-handling.md) - Basic form patterns
- [Server Actions](../05-data-fetching/server-actions.md) - Server-side processing
- [React Hook Form](./react-hook-form.md) - Form library with validation

## 📚 Resources

### Libraries
- [Zod](https://zod.dev/) - Schema validation
- [Yup](https://github.com/jquense/yup) - Schema validation
- [React Hook Form](https://react-hook-form.com/) - Form library

## 🎓 Key Takeaways

- Always validate on server, validate on client for UX
- Use schema validation libraries (Zod, Yup)
- Show errors clearly and helpfully
- Validate at appropriate times (blur, change, submit)
- Clear errors when users fix issues
- Use proper HTML input types

