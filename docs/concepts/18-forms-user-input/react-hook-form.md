# React Hook Form

> **Category**: Intermediate | **Related Concepts**: [Form Handling](./form-handling.md), [Form Validation](./form-validation.md)  
> **Last Updated**: 2024

## 📖 Overview

React Hook Form is a performant, flexible library for building forms in React. It minimizes re-renders and provides excellent TypeScript support, making it ideal for complex forms in Next.js applications.

**Key Points:**
- Minimal re-renders
- Excellent TypeScript support
- Easy validation integration
- Works with Zod, Yup, and custom validators
- Small bundle size
- Uncontrolled components by default

## 🎯 When to Use

- **Complex Forms**: Many fields, nested data
- **Performance**: Need to minimize re-renders
- **Type Safety**: Want strong TypeScript support
- **Validation**: Need complex validation rules
- **Form Libraries**: Prefer library over manual handling

## 💻 Basic Example

### Simple Form

```typescript
'use client'

import { useForm } from 'react-hook-form'

type FormData = {
  name: string
  email: string
  message: string
}

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (res.ok) {
      alert('Message sent!')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 space-y-4">
      <div>
        <label htmlFor="name" className="block mb-1 font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          {...register('name', { required: 'Name is required' })}
          className={`w-full px-3 py-2 border rounded ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block mb-1 font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Invalid email address'
            }
          })}
          className={`w-full px-3 py-2 border rounded ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block mb-1 font-medium">
          Message
        </label>
        <textarea
          id="message"
          {...register('message', {
            required: 'Message is required',
            minLength: {
              value: 10,
              message: 'Message must be at least 10 characters'
            }
          })}
          rows={5}
          className={`w-full px-3 py-2 border rounded ${
            errors.message ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}
```

### With Zod Validation

```typescript
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[\d\s-()]+$/, 'Invalid phone number').optional().or(z.literal('')),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  newsletter: z.boolean().default(false)
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactFormRHF() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      newsletter: false
    }
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (res.ok) {
        alert('Message sent successfully!')
        reset()
      } else {
        alert('Failed to send message')
      }
    } catch (error) {
      alert('Network error. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 space-y-4">
      <div>
        <label htmlFor="name" className="block mb-1 font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          className={`w-full px-3 py-2 border rounded ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block mb-1 font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className={`w-full px-3 py-2 border rounded ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block mb-1 font-medium">
          Phone (Optional)
        </label>
        <input
          type="tel"
          id="phone"
          {...register('phone')}
          className={`w-full px-3 py-2 border rounded ${
            errors.phone ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block mb-1 font-medium">
          Message
        </label>
        <textarea
          id="message"
          {...register('message')}
          rows={5}
          className={`w-full px-3 py-2 border rounded ${
            errors.message ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="newsletter"
          {...register('newsletter')}
          className="mr-2"
        />
        <label htmlFor="newsletter" className="text-sm">
          Subscribe to newsletter
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
```

## 🔧 Advanced Example

### With Server Actions

```typescript
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createUser } from '@/app/actions'
import { useTransition } from 'react'

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  age: z.number().min(18, 'Must be 18 or older')
})

type UserFormData = z.infer<typeof userSchema>

export function UserFormWithServerAction() {
  const [isPending, startTransition] = useTransition()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema)
  })

  const onSubmit = async (data: UserFormData) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('age', data.age.toString())

    startTransition(async () => {
      const result = await createUser(formData)
      if (result.success) {
        alert('User created!')
        reset()
      } else {
        alert(result.error || 'Failed to create user')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 space-y-4">
      <div>
        <label htmlFor="name" className="block mb-1 font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          className={`w-full px-3 py-2 border rounded ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block mb-1 font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className={`w-full px-3 py-2 border rounded ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="age" className="block mb-1 font-medium">
          Age
        </label>
        <input
          type="number"
          id="age"
          {...register('age', { valueAsNumber: true })}
          className={`w-full px-3 py-2 border rounded ${
            errors.age ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.age && (
          <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? 'Creating...' : 'Create User'}
      </button>
    </form>
  )
}
```

## 📋 Common Patterns

### Pattern 1: Controlled Mode
```typescript
const { control } = useForm()
<Controller
  name="email"
  control={control}
  render={({ field }) => <input {...field} />}
/>
```
**When to use**: Need full control, custom components

### Pattern 2: Watch Values
```typescript
const watchedEmail = watch('email')
```
**When to use**: Need to react to field changes

### Pattern 3: Set Values Programmatically
```typescript
setValue('email', 'new@email.com')
```
**When to use**: Pre-fill forms, update values dynamically

## ⚠️ Common Mistakes

### Mistake 1: Not Using Resolver
```typescript
// ❌ Wrong: Manual validation
{...register('email', {
  validate: (value) => isValidEmail(value) || 'Invalid email'
})}
```

```typescript
// ✅ Correct: Use Zod resolver
const schema = z.object({ email: z.string().email() })
useForm({ resolver: zodResolver(schema) })
```
**Why**: Schema validation is more maintainable and type-safe.

### Mistake 2: Not Resetting After Submit
```typescript
// ❌ Wrong: Form stays filled
onSubmit={handleSubmit(async (data) => {
  await submit(data)
})}
```

```typescript
// ✅ Correct: Reset form
onSubmit={handleSubmit(async (data) => {
  await submit(data)
  reset()
})}
```
**Why**: Better UX, prevents accidental resubmission.

## ✨ Best Practices

1. **Use Zod resolver**: Type-safe validation
2. **Minimize re-renders**: Use uncontrolled mode when possible
3. **Reset after success**: Clear form after successful submission
4. **Handle errors**: Show server errors appropriately
5. **Use defaultValues**: Pre-fill forms when needed
6. **Type everything**: Use TypeScript with form types
7. **Accessibility**: Use proper labels and ARIA

## 🔗 Related Concepts

- [Form Handling](./form-handling.md) - Basic form patterns
- [Form Validation](./form-validation.md) - Validation strategies
- [Server Actions](../05-data-fetching/server-actions.md) - Server-side processing

## 📚 Resources

### Official Documentation
- [React Hook Form](https://react-hook-form.com/)
- [Zod Resolver](https://github.com/react-hook-form/resolvers)

### Installation
```bash
npm install react-hook-form @hookform/resolvers zod
```

## 🎓 Key Takeaways

- React Hook Form minimizes re-renders
- Use Zod resolver for type-safe validation
- Works great with Server Actions
- Uncontrolled by default for performance
- Excellent TypeScript support
- Small bundle size

