# Forms & User Input

> **Category**: Intermediate | **Priority**: 🟡 Medium | **Difficulty**: Intermediate  
> **Related Concepts**: [Server Actions](../05-data-fetching/server-actions.md), [File Uploads](../19-file-uploads/README.md)  
> **Status**: ✅ In Progress

## Overview

Handling forms and user input in Next.js with validation, server actions, and form libraries.

## Key Topics

- [Form Handling](./form-handling.md) - Basic form submission patterns
- [Form Validation](./form-validation.md) - Client and server validation
- [React Hook Form](./react-hook-form.md) - Popular form library integration
- Controlled vs Uncontrolled - Form input patterns
- Server Actions - Server-side form processing

## Documentation

### Detailed Guides

1. **[Form Handling](./form-handling.md)**
   - HTML forms with Server Actions
   - Controlled and uncontrolled components
   - Multi-step forms
   - Common patterns and best practices

2. **[Form Validation](./form-validation.md)**
   - Client-side validation
   - Server-side validation
   - Schema validation with Zod
   - Real-time validation patterns

3. **[React Hook Form](./react-hook-form.md)**
   - Getting started with React Hook Form
   - Integration with Zod
   - Server Actions integration
   - Advanced patterns

## Examples

See the [examples directory](./examples/) for complete code examples:

- `01-basic-forms.tsx` - Basic form handling
- `02-server-actions-forms.tsx` - Server Actions with forms
- `03-form-validation.tsx` - Validation patterns
- `04-react-hook-form.tsx` - React Hook Form examples
- `05-controlled-uncontrolled.tsx` - Both patterns
- `06-complete-example.tsx` - Comprehensive example

## Quick Start

### Basic Form with Server Action

```typescript
// app/actions.ts
'use server'

export async function submitForm(formData: FormData) {
  const name = formData.get('name') as string
  // Process form
  return { success: true }
}
```

```typescript
// app/contact/page.tsx
import { submitForm } from './actions'

export default function ContactPage() {
  return (
    <form action={submitForm}>
      <input name="name" required />
      <button type="submit">Submit</button>
    </form>
  )
}
```

## Resources

- [Forms Docs](https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/) - Schema validation

---

**Previous**: [State Management](../17-state-management/README.md) | **Next**: [File Uploads](../19-file-uploads/README.md)

