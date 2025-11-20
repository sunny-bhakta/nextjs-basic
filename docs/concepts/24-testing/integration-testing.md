# Integration Testing

> **Category**: Intermediate | **Related Concepts**: [Testing Setup](./testing-setup.md), [Component Testing](./examples/02-component-tests.test.tsx)  
> **Last Updated**: 2024

## 📖 Overview

Integration testing in Next.js involves testing how multiple components, modules, or systems work together. Unlike unit tests that test isolated functions, integration tests verify that different parts of your application interact correctly.

**Key Points:**
- Test component interactions
- Test API routes with components
- Test Server Actions with forms
- Test data flow between components
- Use React Testing Library
- Mock external dependencies

## 🎯 When to Use

- **Component Interactions**: Test how components work together
- **Form Submissions**: Test complete form flows
- **API Integration**: Test API routes with components
- **Data Flow**: Test data passing between components
- **User Workflows**: Test complete user interactions
- **Server Actions**: Test server-side logic with client components

## 💻 Basic Example

### Testing Component Interactions

```typescript
// __tests__/integration/UserProfile.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import UserProfile from '@/app/components/UserProfile'
import { UserProvider } from '@/app/context/UserContext'

describe('UserProfile Integration', () => {
  test('displays user data and allows editing', async () => {
    render(
      <UserProvider>
        <UserProfile userId="1" />
      </UserProvider>
    )
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })
    
    // Test edit functionality
    const editButton = screen.getByText('Edit')
    fireEvent.click(editButton)
    
    // Verify form appears
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
  })
})
```

### Testing Form with Server Action

```typescript
// __tests__/integration/ContactForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ContactForm from '@/app/components/ContactForm'
import { submitContactForm } from '@/app/actions'

jest.mock('@/app/actions')

describe('ContactForm Integration', () => {
  test('submits form and shows success message', async () => {
    const mockSubmit = submitContactForm as jest.MockedFunction<typeof submitContactForm>
    mockSubmit.mockResolvedValue({ success: true })
    
    render(<ContactForm />)
    
    // Fill form
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'John Doe' }
    })
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' }
    })
    
    // Submit
    fireEvent.click(screen.getByText('Submit'))
    
    // Verify success
    await waitFor(() => {
      expect(screen.getByText('Form submitted successfully')).toBeInTheDocument()
    })
    
    expect(mockSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'John Doe',
        email: 'john@example.com'
      })
    )
  })
})
```

## 🔧 Advanced Example

### Testing API Route with Component

```typescript
// __tests__/integration/ProductList.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import ProductList from '@/app/components/ProductList'

// Mock fetch
global.fetch = jest.fn()

describe('ProductList Integration', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear()
  })

  test('fetches and displays products', async () => {
    const mockProducts = [
      { id: '1', name: 'Product 1', price: 100 },
      { id: '2', name: 'Product 2', price: 200 }
    ]
    
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts
    })
    
    render(<ProductList />)
    
    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument()
      expect(screen.getByText('Product 2')).toBeInTheDocument()
    })
    
    expect(fetch).toHaveBeenCalledWith('/api/products')
  })
  
  test('handles error state', async () => {
    ;(fetch as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'))
    
    render(<ProductList />)
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load products')).toBeInTheDocument()
    })
  })
})
```

### Testing Multi-Step Form

```typescript
// __tests__/integration/MultiStepForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import MultiStepForm from '@/app/components/MultiStepForm'

describe('MultiStepForm Integration', () => {
  test('completes multi-step form flow', async () => {
    render(<MultiStepForm />)
    
    // Step 1: Personal Info
    expect(screen.getByText('Step 1: Personal Information')).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'John Doe' }
    })
    fireEvent.click(screen.getByText('Next'))
    
    // Step 2: Contact Info
    await waitFor(() => {
      expect(screen.getByText('Step 2: Contact Information')).toBeInTheDocument()
    })
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' }
    })
    fireEvent.click(screen.getByText('Next'))
    
    // Step 3: Review
    await waitFor(() => {
      expect(screen.getByText('Step 3: Review')).toBeInTheDocument()
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('john@example.com')).toBeInTheDocument()
    })
    
    // Submit
    fireEvent.click(screen.getByText('Submit'))
    
    await waitFor(() => {
      expect(screen.getByText('Form submitted successfully')).toBeInTheDocument()
    })
  })
})
```

## 📋 Common Patterns

### Pattern 1: Testing Component with Context
```typescript
render(
  <ContextProvider>
    <Component />
  </ContextProvider>
)
```
**When to use**: Components that depend on context

### Pattern 2: Testing with Mocked API
```typescript
global.fetch = jest.fn()
;(fetch as jest.Mock).mockResolvedValueOnce({ json: async () => data })
```
**When to use**: Components that fetch data

### Pattern 3: Testing Form Flow
```typescript
fireEvent.change(input, { target: { value } })
fireEvent.click(submitButton)
await waitFor(() => expect(successMessage).toBeInTheDocument())
```
**When to use**: Form submissions and validation

## ⚠️ Common Mistakes

### Mistake 1: Not Waiting for Async Operations
```typescript
// ❌ Wrong: Not waiting for async
render(<Component />)
expect(screen.getByText('Loaded')).toBeInTheDocument()
```

```typescript
// ✅ Correct: Wait for async
render(<Component />)
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument()
})
```
**Why**: Async operations need time to complete.

### Mistake 2: Not Cleaning Up Mocks
```typescript
// ❌ Wrong: Mocks persist between tests
global.fetch = jest.fn()
```

```typescript
// ✅ Correct: Clean up mocks
beforeEach(() => {
  (fetch as jest.Mock).mockClear()
})
```
**Why**: Mocks can interfere with other tests.

### Mistake 3: Testing Implementation Details
```typescript
// ❌ Wrong: Testing internal state
expect(component.state.isLoading).toBe(true)
```

```typescript
// ✅ Correct: Test user-visible behavior
expect(screen.getByText('Loading...')).toBeInTheDocument()
```
**Why**: Tests should focus on user experience.

## ✨ Best Practices

1. **Test user workflows**: Focus on complete user interactions
2. **Use waitFor**: For async operations
3. **Mock external dependencies**: APIs, databases, services
4. **Test error states**: Handle failures gracefully
5. **Keep tests focused**: One workflow per test
6. **Use descriptive names**: Clear test descriptions
7. **Clean up**: Reset mocks and state between tests

## 🔗 Related Concepts

- [Testing Setup](./testing-setup.md) - Jest configuration
- [Component Testing](./examples/02-component-tests.test.tsx) - Component tests
- [E2E Testing](./examples/03-e2e-tests.spec.ts) - End-to-end tests

## 📚 Resources

### Official Documentation
- [Testing](https://nextjs.org/docs/app/building-your-application/testing)
- [React Testing Library](https://testing-library.com/react)

## 🎓 Key Takeaways

- Integration tests verify component interactions
- Use `waitFor` for async operations
- Mock external dependencies
- Test complete user workflows
- Focus on user-visible behavior
- Clean up mocks between tests

