// Example 6: Complete Example
// Comprehensive form example with all features

'use client'

import { useState, useTransition } from 'react'
import { z } from 'zod'

// Zod schema
const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[\d\s-()]+$/, 'Invalid phone number').optional().or(z.literal('')),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  notifications: z.boolean().default(true),
  newsletter: z.boolean().default(false)
})

type ProfileFormData = z.infer<typeof profileSchema>

// Server Action
// app/actions.ts
'use server'

export async function updateProfile(formData: FormData) {
  const data = {
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    bio: formData.get('bio') as string,
    website: formData.get('website') as string,
    notifications: formData.get('notifications') === 'on',
    newsletter: formData.get('newsletter') === 'on'
  }

  // Validate
  const result = profileSchema.safeParse(data)
  if (!result.success) {
    return {
      error: 'Validation failed',
      issues: result.error.issues
    }
  }

  // Simulate save
  await new Promise(resolve => setTimeout(resolve, 1000))

  return { success: true, message: 'Profile updated successfully' }
}

// Client Component
export default function ProfileForm() {
  const [isPending, startTransition] = useTransition()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    website: '',
    notifications: true,
    newsletter: false
  })

  const validateField = (field: keyof ProfileFormData, value: any) => {
    try {
      const fieldSchema = profileSchema.shape[field]
      if (fieldSchema) {
        fieldSchema.parse(value)
      }
      setErrors(prev => ({ ...prev, [field]: '' }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [field]: error.errors[0].message }))
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    const processedValue = type === 'checkbox' ? checked : value

    setFormData(prev => ({ ...prev, [name]: processedValue }))

    if (errors[name]) {
      validateField(name as keyof ProfileFormData, processedValue)
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    validateField(name as keyof ProfileFormData, value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccess(false)

    // Validate entire form
    const result = profileSchema.safeParse(formData)
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0].toString()] = error.message
        }
      })
      setErrors(fieldErrors)
      return
    }

    // Submit with Server Action
    const submitFormData = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === 'boolean') {
        if (value) submitFormData.append(key, 'on')
      } else {
        submitFormData.append(key, value as string)
      }
    })

    startTransition(async () => {
      const res = await updateProfile(submitFormData)
      if (res.success) {
        setSuccess(true)
        setErrors({})
        setTimeout(() => setSuccess(false), 3000)
      } else {
        const fieldErrors: Record<string, string> = {}
        res.issues?.forEach((issue: any) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0].toString()] = issue.message
          }
        })
        setErrors(fieldErrors)
      }
    })
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>

      {success && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
          Profile updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block mb-1 font-medium">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border rounded ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block mb-1 font-medium">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border rounded ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border rounded ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block mb-1 font-medium">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border rounded ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="+1 (555) 123-4567"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="website" className="block mb-1 font-medium">
            Website
          </label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border rounded ${
              errors.website ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="https://example.com"
          />
          {errors.website && (
            <p className="mt-1 text-sm text-red-600">{errors.website}</p>
          )}
        </div>

        <div>
          <label htmlFor="bio" className="block mb-1 font-medium">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={4}
            maxLength={500}
            className={`w-full px-3 py-2 border rounded ${
              errors.bio ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Tell us about yourself..."
          />
          <p className="mt-1 text-sm text-gray-500">
            {formData.bio.length}/500 characters
          </p>
          {errors.bio && (
            <p className="mt-1 text-sm text-red-600">{errors.bio}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="notifications"
              name="notifications"
              checked={formData.notifications}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="notifications" className="text-sm">
              Enable email notifications
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="newsletter"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="newsletter" className="text-sm">
              Subscribe to newsletter
            </label>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Saving...' : 'Save Changes'}
          </button>

          <button
            type="button"
            onClick={() => {
              setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                bio: '',
                website: '',
                notifications: true,
                newsletter: false
              })
              setErrors({})
            }}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}

