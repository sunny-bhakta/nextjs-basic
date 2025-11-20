// Example 3: Logging Strategies
// Demonstrates effective logging patterns

// ============================================
// Example 1: Basic Logging Utility
// File: lib/logger.ts
// ============================================

export const logger = {
  info: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[INFO] ${new Date().toISOString()} - ${message}`, data || '')
    }
  },
  
  error: (message: string, error?: Error) => {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error || '')
  },
  
  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, data || '')
  },
  
  debug: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`, data || '')
    }
  },
}

// Usage:
// logger.info('User logged in', { userId: '123' })
// logger.error('Failed to fetch data', error)

// ============================================
// Example 2: Structured Logging
// File: lib/structured-logger.ts
// ============================================

interface LogEntry {
  level: 'info' | 'error' | 'warn' | 'debug'
  message: string
  timestamp: string
  data?: any
  userId?: string
  requestId?: string
}

export class StructuredLogger {
  private requestId?: string
  private userId?: string
  
  setContext(requestId: string, userId?: string) {
    this.requestId = requestId
    this.userId = userId
  }
  
  private log(level: LogEntry['level'], message: string, data?: any) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      data,
      requestId: this.requestId,
      userId: this.userId,
    }
    
    const logMethod = level === 'error' ? console.error : 
                     level === 'warn' ? console.warn :
                     level === 'debug' ? console.debug : console.log
    
    logMethod(JSON.stringify(entry))
  }
  
  info(message: string, data?: any) {
    this.log('info', message, data)
  }
  
  error(message: string, error?: Error) {
    this.log('error', message, { error: error?.message, stack: error?.stack })
  }
  
  warn(message: string, data?: any) {
    this.log('warn', message, data)
  }
  
  debug(message: string, data?: any) {
    if (process.env.NODE_ENV === 'development') {
      this.log('debug', message, data)
    }
  }
}

export const structuredLogger = new StructuredLogger()

// ============================================
// Example 3: Performance Logging
// File: lib/performance-logger.ts
// ============================================

export class PerformanceLogger {
  private timers: Map<string, number> = new Map()
  
  start(label: string) {
    this.timers.set(label, performance.now())
  }
  
  end(label: string) {
    const startTime = this.timers.get(label)
    if (startTime) {
      const duration = performance.now() - startTime
      console.log(`[PERF] ${label}: ${duration.toFixed(2)}ms`)
      this.timers.delete(label)
      return duration
    }
    return null
  }
  
  async measure<T>(label: string, fn: () => Promise<T>): Promise<T> {
    this.start(label)
    try {
      const result = await fn()
      this.end(label)
      return result
    } catch (error) {
      this.end(label)
      throw error
    }
  }
}

export const perfLogger = new PerformanceLogger()

// Usage:
// await perfLogger.measure('fetchUser', async () => {
//   return await fetchUser(userId)
// })

// ============================================
// Example 4: Conditional Logging
// File: lib/conditional-logger.ts
// ============================================

const DEBUG = process.env.NEXT_PUBLIC_DEBUG === 'true'
const LOG_LEVEL = process.env.LOG_LEVEL || 'info'

const LOG_LEVELS = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
}

export const conditionalLogger = {
  debug: (message: string, data?: any) => {
    if (LOG_LEVELS[LOG_LEVEL as keyof typeof LOG_LEVELS] <= LOG_LEVELS.debug || DEBUG) {
      console.debug(`[DEBUG] ${message}`, data)
    }
  },
  
  info: (message: string, data?: any) => {
    if (LOG_LEVELS[LOG_LEVEL as keyof typeof LOG_LEVELS] <= LOG_LEVELS.info || DEBUG) {
      console.log(`[INFO] ${message}`, data)
    }
  },
  
  warn: (message: string, data?: any) => {
    if (LOG_LEVELS[LOG_LEVEL as keyof typeof LOG_LEVELS] <= LOG_LEVELS.warn || DEBUG) {
      console.warn(`[WARN] ${message}`, data)
    }
  },
  
  error: (message: string, error?: Error) => {
    console.error(`[ERROR] ${message}`, error)
  },
}

// ============================================
// Example 5: Sanitized Logging
// File: lib/sanitized-logger.ts
// ============================================

const SENSITIVE_FIELDS = ['password', 'token', 'secret', 'apiKey', 'auth']

function sanitize(data: any): any {
  if (typeof data !== 'object' || data === null) {
    return data
  }
  
  if (Array.isArray(data)) {
    return data.map(sanitize)
  }
  
  const sanitized: any = {}
  for (const [key, value] of Object.entries(data)) {
    if (SENSITIVE_FIELDS.some(field => key.toLowerCase().includes(field))) {
      sanitized[key] = '***REDACTED***'
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitize(value)
    } else {
      sanitized[key] = value
    }
  }
  
  return sanitized
}

export const sanitizedLogger = {
  info: (message: string, data?: any) => {
    const sanitizedData = data ? sanitize(data) : undefined
    console.log(`[INFO] ${message}`, sanitizedData)
  },
  
  error: (message: string, error?: Error) => {
    console.error(`[ERROR] ${message}`, error)
  },
}

// Usage:
// sanitizedLogger.info('User data', { email: 'user@example.com', password: 'secret123' })
// Output: [INFO] User data { email: 'user@example.com', password: '***REDACTED***' }

