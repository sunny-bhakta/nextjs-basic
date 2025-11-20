// Example 1: Error Boundaries
// Demonstrates error boundary patterns

'use client'

import { Component, ErrorInfo, ReactNode } from 'react'

// ============================================
// Example 1: Basic Error Boundary
// ============================================

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class BasicErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center border border-red-300 rounded bg-red-50">
          <h2 className="text-xl font-bold text-red-800 mb-2">
            Something went wrong
          </h2>
          <p className="text-red-600">{this.state.error?.message}</p>
        </div>
      )
    }

    return this.props.children
  }
}

// ============================================
// Example 2: Error Boundary with Fallback
// ============================================

interface ErrorBoundaryWithFallbackProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

export class ErrorBoundaryWithFallback extends Component<
  ErrorBoundaryWithFallbackProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryWithFallbackProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Call custom error handler
    this.props.onError?.(error, errorInfo)
    
    // Log to error tracking service
    if (typeof window !== 'undefined') {
      // Example: Send to error tracking service
      // errorTrackingService.log(error, errorInfo)
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null
    })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">{this.state.error?.message}</p>
          <button
            onClick={this.handleReset}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

// ============================================
// Example 3: Error Boundary with Retry
// ============================================

interface ErrorBoundaryWithRetryProps {
  children: ReactNode
  onRetry?: () => void
}

export class ErrorBoundaryWithRetry extends Component<
  ErrorBoundaryWithRetryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryWithRetryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null
    })
    this.props.onRetry?.()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center border border-red-300 rounded bg-red-50">
          <h2 className="text-xl font-bold text-red-800 mb-2">
            Error occurred
          </h2>
          <p className="text-red-600 mb-4">{this.state.error?.message}</p>
          <button
            onClick={this.handleRetry}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

// ============================================
// Example 4: Usage Example
// ============================================

// Component that might throw an error
function RiskyComponent({ shouldError }: { shouldError: boolean }) {
  if (shouldError) {
    throw new Error('This is a test error')
  }
  return <div>Component rendered successfully</div>
}

// Usage in a page
export function ErrorBoundaryExample() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Error Boundary Examples</h1>
      
      <div>
        <h2 className="text-xl font-semibold mb-2">Basic Error Boundary</h2>
        <BasicErrorBoundary>
          <RiskyComponent shouldError={false} />
        </BasicErrorBoundary>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Error Boundary with Fallback</h2>
        <ErrorBoundaryWithFallback
          fallback={
            <div className="p-4 bg-yellow-100 border border-yellow-300 rounded">
              Custom fallback UI
            </div>
          }
          onError={(error, errorInfo) => {
            console.log('Error handled:', error, errorInfo)
          }}
        >
          <RiskyComponent shouldError={false} />
        </ErrorBoundaryWithFallback>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Error Boundary with Retry</h2>
        <ErrorBoundaryWithRetry
          onRetry={() => {
            console.log('Retrying...')
          }}
        >
          <RiskyComponent shouldError={false} />
        </ErrorBoundaryWithRetry>
      </div>
    </div>
  )
}

