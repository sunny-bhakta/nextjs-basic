# Error Handling Examples

This directory contains practical code examples demonstrating error handling in Next.js.

## Examples

### 1. Error Boundaries (`01-error-boundaries.tsx`)
Demonstrates error boundaries:
- Basic error boundary
- Error boundary with fallback
- Error logging

### 2. Error Pages (`02-error-pages.tsx`)
Shows error pages:
- Custom error page
- Not found page
- Global error handler

### 3. Server Error Handling (`03-server-error-handling.ts`)
Demonstrates server-side error handling:
- Server Component errors
- API route errors
- Error logging

## How to Use

1. **Copy the code** from any example file
2. **Create the corresponding files** in your `app/` directory
3. **Test error scenarios**: Trigger errors to see handling
4. **Monitor errors**: Check console and error tracking

## Key Concepts

### Error Boundaries
- Catch React component errors
- Prevent app crashes
- Show fallback UI

### Error Pages
- Route-level error handling
- Custom error UI
- Recovery options

### Server Error Handling
- Try-catch in Server Components
- API route error responses
- Error logging

## Best Practices

1. **Use error boundaries**: For client components
2. **Handle server errors**: Try-catch blocks
3. **Create error pages**: Custom error UI
4. **Log errors**: Track for debugging
5. **Provide recovery**: Allow retry

