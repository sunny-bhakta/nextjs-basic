# Testing Examples

This directory contains practical code examples demonstrating testing in Next.js.

## Examples

### 1. Unit Tests (`01-unit-tests.test.ts`)
Demonstrates unit testing:
- Function testing
- Utility testing
- Mocking

### 2. Component Tests (`02-component-tests.test.tsx`)
Shows component testing:
- React Testing Library
- User interaction testing
- Async component testing

### 3. E2E Tests (`03-e2e-tests.spec.ts`)
Demonstrates E2E testing:
- Playwright setup
- Full user flows
- Page interactions

### 4. Integration Tests (`04-integration-tests.test.tsx`)
Demonstrates integration testing:
- Component interactions
- Form with Server Actions
- API integration
- Multi-step workflows

## How to Use

1. **Install dependencies**:
   ```bash
   npm install --save-dev jest @testing-library/react @testing-library/jest-dom
   ```

2. **Set up Jest**: Configure `jest.config.js`

3. **Run tests**: `npm test`

4. **Run E2E tests**: `npx playwright test`

## Key Concepts

### Unit Testing
- Test individual functions
- Fast execution
- Isolated tests

### Component Testing
- Test React components
- User behavior focus
- Component isolation

### Integration Testing
- Test component interactions
- Test complete workflows
- Test API integration
- Test form submissions

### E2E Testing
- Full user flows
- Browser automation
- Real environment testing

## Best Practices

1. **Test user behavior**: Not implementation
2. **Use React Testing Library**: Best practices
3. **Mock external dependencies**: APIs, databases
4. **Keep tests simple**: One assertion per test
5. **Maintain coverage**: Aim for 80%+

