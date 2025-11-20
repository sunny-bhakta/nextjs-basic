// Example 5: Error Boundaries
// Demonstrates error.tsx files for error handling

// app/error.tsx - Root error boundary
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-6">
          We're sorry, but something unexpected happened.
        </p>
        
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded">
            <p className="text-sm font-mono text-red-800">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-red-600 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}
        
        <div className="flex gap-4">
          <button
            onClick={() => reset()}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try again
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Go home
          </button>
        </div>
      </div>
    </div>
  )
}

// app/blog/error.tsx - Blog section error boundary
'use client'

export default function BlogError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Error loading blog</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Retry
      </button>
    </div>
  )
}

// app/blog/[slug]/error.tsx - Individual post error boundary
'use client'

export default function PostError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Error loading post</h2>
      <p className="text-gray-600 mb-4">
        {error.message || 'Failed to load blog post'}
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try again
        </button>
        <a
          href="/blog"
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Back to Blog
        </a>
      </div>
    </div>
  )
}

// app/products/error.tsx - Products error with recovery
'use client'

import { useState } from 'react'

export default function ProductsError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  const [retryCount, setRetryCount] = useState(0)
  
  const handleRetry = () => {
    setRetryCount(prev => prev + 1)
    reset()
  }
  
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Failed to load products</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      
      {retryCount < 3 ? (
        <button
          onClick={handleRetry}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry ({retryCount}/3)
        </button>
      ) : (
        <div>
          <p className="text-red-600 mb-4">
            Multiple retry attempts failed. Please contact support.
          </p>
          <a
            href="/contact"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Contact Support
          </a>
        </div>
      )}
    </div>
  )
}

