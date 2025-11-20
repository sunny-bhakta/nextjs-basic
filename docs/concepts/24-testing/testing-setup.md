# Testing Setup

> **Category**: Intermediate | **Related Concepts**: [Configuration](../31-configuration/README.md)  
> **Last Updated**: 2024

## 📖 Overview

Testing Next.js applications requires proper setup of testing frameworks. Next.js works well with Jest, React Testing Library, and E2E testing tools like Playwright.

**Key Points:**
- Jest for unit and integration tests
- React Testing Library for component tests
- Playwright/Cypress for E2E tests
- Built-in testing support
- TypeScript support

## 🎯 When to Use

- **Unit Tests**: Test individual functions
- **Component Tests**: Test React components
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test full user flows
- **Regression Testing**: Prevent bugs

## 💻 Basic Example

### Jest Configuration

```javascript
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
}

module.exports = createJestConfig(customJestConfig)
```

### Unit Test

```typescript
// __tests__/utils.test.ts
import { add, multiply } from '@/app/utils'

describe('Utils', () => {
  test('adds two numbers', () => {
    expect(add(1, 2)).toBe(3)
  })

  test('multiplies two numbers', () => {
    expect(multiply(2, 3)).toBe(6)
  })
})
```

### Component Test

```typescript
// __tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import Button from '@/app/components/Button'

describe('Button', () => {
  test('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

## 🔧 Advanced Example

### Testing Server Components

```typescript
// __tests__/ServerComponent.test.tsx
import { render, screen } from '@testing-library/react'
import ServerComponent from '@/app/components/ServerComponent'

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: 'test' }),
  })
) as jest.Mock

describe('ServerComponent', () => {
  test('renders server component', async () => {
    const component = await ServerComponent()
    render(component)
    expect(screen.getByText('test')).toBeInTheDocument()
  })
})
```

### Testing API Routes

```typescript
// __tests__/api/users.test.ts
import { GET, POST } from '@/app/api/users/route'
import { NextRequest } from 'next/server'

describe('API Routes', () => {
  test('GET returns users', async () => {
    const request = new NextRequest('http://localhost:3000/api/users')
    const response = await GET(request)
    const data = await response.json()
    
    expect(response.status).toBe(200)
    expect(Array.isArray(data)).toBe(true)
  })

  test('POST creates user', async () => {
    const request = new NextRequest('http://localhost:3000/api/users', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com'
      })
    })
    
    const response = await POST(request)
    const data = await response.json()
    
    expect(response.status).toBe(201)
    expect(data.name).toBe('Test User')
  })
})
```

## 📋 Common Patterns

### Pattern 1: Mocking
```typescript
jest.mock('@/app/lib/api', () => ({
  fetchData: jest.fn()
}))
```
**When to use**: External dependencies

### Pattern 2: Test Utilities
```typescript
function renderWithProviders(ui: React.ReactElement) {
  return render(ui, { wrapper: Providers })
}
```
**When to use**: Repeated setup

### Pattern 3: Async Testing
```typescript
test('async operation', async () => {
  await waitFor(() => {
    expect(screen.getByText('Loaded')).toBeInTheDocument()
  })
})
```
**When to use**: Async operations

## ⚠️ Common Mistakes

### Mistake 1: Not Testing User Behavior
```typescript
// ❌ Wrong: Testing implementation
test('sets state', () => {
  const component = render(<Component />)
  expect(component.state.value).toBe('test')
})
```

```typescript
// ✅ Correct: Test user behavior
test('displays value', () => {
  render(<Component />)
  expect(screen.getByText('test')).toBeInTheDocument()
})
```
**Why**: Tests should focus on what users see, not implementation.

### Mistake 2: Not Cleaning Up
```typescript
// ❌ Wrong: No cleanup
test('renders component', () => {
  render(<Component />)
  // Component stays in memory
})
```

```typescript
// ✅ Correct: Clean up
afterEach(() => {
  cleanup()
})
```
**Why**: Prevents test interference.

## ✨ Best Practices

1. **Test user behavior**: Not implementation
2. **Use React Testing Library**: For component tests
3. **Mock external dependencies**: APIs, databases
4. **Test edge cases**: Error states, empty data
5. **Keep tests simple**: One assertion per test
6. **Use descriptive names**: Clear test descriptions
7. **Maintain test coverage**: Aim for 80%+

## 🔗 Related Concepts

- [Configuration](../31-configuration/README.md) - Next.js configuration
- [TypeScript Support](../23-typescript-support/README.md) - Type-safe tests

## 📚 Resources

### Official Documentation
- [Testing](https://nextjs.org/docs/app/building-your-application/testing)

### Testing Libraries
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright](https://playwright.dev/)

## 🎓 Key Takeaways

- Use Jest for unit and integration tests
- Use React Testing Library for components
- Test user behavior, not implementation
- Mock external dependencies
- Write descriptive test names
- Maintain good test coverage

