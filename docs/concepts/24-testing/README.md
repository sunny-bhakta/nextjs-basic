# Testing

> **Category**: Intermediate | **Priority**: 🟡 Medium | **Difficulty**: Intermediate  
> **Related Concepts**: [Configuration](../31-configuration/README.md)  
> **Status**: ✅ In Progress

## Overview

Testing Next.js applications with Jest, React Testing Library, and E2E testing tools.

## Key Topics

- [Testing Setup](./testing-setup.md) - Jest configuration and setup
- Jest Configuration - Setting up Jest
- React Testing Library - Component testing
- Unit Testing - Testing individual functions
- Integration Testing - Testing component interactions
- E2E Testing - Playwright, Cypress

## Documentation

### Detailed Guides

1. **[Testing Setup](./testing-setup.md)**
   - Jest configuration
   - React Testing Library setup
   - Unit and integration testing
   - E2E testing

2. **[Integration Testing](./integration-testing.md)**
   - Component interactions
   - Form submissions
   - API integration
   - Multi-step workflows

## Examples

See the [examples directory](./examples/) for complete code examples:

- `01-unit-tests.test.ts` - Unit test examples
- `02-component-tests.test.tsx` - Component test examples
- `03-e2e-tests.spec.ts` - E2E test examples
- `04-integration-tests.test.tsx` - Integration test examples

## Quick Start

### Unit Test

```typescript
// __tests__/utils.test.ts
import { add } from './utils'

test('adds two numbers', () => {
  expect(add(1, 2)).toBe(3)
})
```

### Component Test

```typescript
// __tests__/Button.test.tsx
import { render, screen } from '@testing-library/react'
import Button from './Button'

test('renders button', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByText('Click me')).toBeInTheDocument()
})
```

## Resources

- [Testing Docs](https://nextjs.org/docs/app/building-your-application/testing)

---

**Previous**: [TypeScript Support](../23-typescript-support/README.md) | **Next**: [Deployment](../25-deployment/README.md)

