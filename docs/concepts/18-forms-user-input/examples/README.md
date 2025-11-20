# Forms & User Input Examples

This directory contains practical code examples demonstrating form handling and user input in Next.js.

## Examples

### 1. Basic Forms (`01-basic-forms.tsx`)
Demonstrates basic form handling:
- Controlled components
- Form submission
- Basic validation
- Error handling

### 2. Server Actions Forms (`02-server-actions-forms.tsx`)
Shows form handling with Server Actions:
- FormData handling
- Server-side validation
- Progressive enhancement
- useTransition hook

### 3. Form Validation (`03-form-validation.tsx`)
Demonstrates validation patterns:
- Client-side validation
- Server-side validation
- Zod schema validation
- Error display

### 4. React Hook Form (`04-react-hook-form.tsx`)
Shows React Hook Form integration:
- Form setup
- Validation with Zod
- Error handling
- Form state management

### 5. Controlled vs Uncontrolled (`05-controlled-uncontrolled.tsx`)
Demonstrates both patterns:
- Controlled components
- Uncontrolled components
- useRef for uncontrolled
- When to use each

### 6. Complete Example (`06-complete-example.tsx`)
A comprehensive example combining:
- All form patterns
- Validation
- Server Actions
- Error handling
- Success states

## How to Use

1. **Copy the code** from any example file
2. **Create the corresponding files** in your `app/` directory
3. **Install dependencies** if needed (e.g., `react-hook-form`, `zod`)
4. **Run your Next.js app**: `npm run dev`
5. **Test different features**:
   - Submit forms
   - Test validation
   - Check error handling
   - Verify Server Actions

## Installation

For React Hook Form examples:
```bash
npm install react-hook-form @hookform/resolvers zod
```

## Key Concepts

### Controlled Components
- Input value controlled by React state
- `value` and `onChange` props
- Full control over input state

### Uncontrolled Components
- Input value managed by DOM
- Use `ref` to access values
- Less React overhead

### Server Actions
- Functions that run on the server
- Use `'use server'` directive
- Perfect for form submissions
- Support progressive enhancement

### Validation
- Client-side: Immediate feedback
- Server-side: Security and data integrity
- Zod: Schema-based validation
- React Hook Form: Built-in validation

## Best Practices

1. **Always validate on server**: Client validation can be bypassed
2. **Use Server Actions**: Better than API routes for forms
3. **Show loading states**: Use `useTransition` for Server Actions
4. **Handle errors gracefully**: Display user-friendly error messages
5. **Provide feedback**: Show success/error states clearly

