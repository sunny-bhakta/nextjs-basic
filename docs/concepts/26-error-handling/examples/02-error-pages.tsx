// Example 2: Error Pages
// Demonstrates custom error pages in Next.js

// ============================================
// Example 1: Custom Error Page
// File: app/error.tsx
// ============================================

'use client'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-red-600">Error</h1>
        <h2 className="text-2xl font-semibold mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-6">{error.message}</p>
        {error.digest && (
          <p className="text-sm text-gray-500 mb-6">
            Error ID: {error.digest}
          </p>
        )}
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try again
          </button>
          <a
            href="/"
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  )
}

// ============================================
// Example 2: Not Found Page
// File: app/not-found.tsx
// ============================================

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold mb-4 text-gray-800">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go back home
        </a>
      </div>
    </div>
  )
}

// ============================================
// Example 3: Global Error Handler
// File: app/global-error.tsx
// ============================================

'use client'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
          <div className="text-center max-w-md bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold mb-4 text-red-600">
              Application Error
            </h1>
            <h2 className="text-2xl font-semibold mb-4">
              A critical error occurred
            </h2>
            <p className="text-gray-600 mb-6">{error.message}</p>
            {error.digest && (
              <p className="text-sm text-gray-500 mb-6">
                Error ID: {error.digest}
              </p>
            )}
            <button
              onClick={reset}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}

// ============================================
// Example 4: Route-Specific Error Page
// File: app/dashboard/error.tsx
// ============================================

'use client'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="p-6">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-600">
          Dashboard Error
        </h1>
        <p className="text-gray-600 mb-4">
          There was an error loading the dashboard.
        </p>
        <p className="text-sm text-gray-500 mb-6">{error.message}</p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    </div>
  )
}

