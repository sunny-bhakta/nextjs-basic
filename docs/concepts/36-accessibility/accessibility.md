# Accessibility

> **Category**: Advanced | **Related Concepts**: [App Router](../03-app-router/README.md)  
> **Last Updated**: 2024

## 📖 Overview

Accessibility (a11y) ensures your Next.js application is usable by everyone, including people with disabilities. This includes proper semantic HTML, ARIA attributes, keyboard navigation, and screen reader support.

**Key Points:**
- Semantic HTML for structure
- ARIA attributes for enhanced accessibility
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Color contrast compliance

## 🎯 When to Use

- **All Applications**: Accessibility is essential
- **Public Websites**: Legal compliance (WCAG)
- **Forms**: Accessible form inputs
- **Navigation**: Keyboard-accessible menus
- **Interactive Elements**: Proper focus management

## 💻 Basic Example

### Semantic HTML

```typescript
// app/components/Navigation.tsx
export default function Navigation() {
  return (
    <nav aria-label="Main navigation">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  )
}
```

### Accessible Form

```typescript
// app/components/ContactForm.tsx
export default function ContactForm() {
  return (
    <form aria-label="Contact form">
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          aria-required="true"
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          aria-required="true"
          aria-describedby="email-error"
        />
        <span id="email-error" role="alert" aria-live="polite"></span>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}
```

## 🔧 Advanced Example

### Keyboard Navigation

```typescript
// app/components/Modal.tsx
'use client'

import { useEffect, useRef } from 'react'

export default function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      // Trap focus within modal
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements?.[0] as HTMLElement
      const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement

      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus()
            e.preventDefault()
          }
        }
      }

      firstElement?.focus()
      document.addEventListener('keydown', handleTab)

      return () => {
        document.removeEventListener('keydown', handleTab)
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div ref={modalRef} className="bg-white p-6 rounded">
        <h2 id="modal-title">Modal Title</h2>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}
```

## 📋 Common Patterns

### Pattern 1: Semantic HTML
```typescript
<nav aria-label="Navigation">
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>
```
**When to use**: Navigation, structure

### Pattern 2: ARIA Labels
```typescript
<button aria-label="Close dialog">×</button>
```
**When to use**: Icon buttons, decorative elements

### Pattern 3: Focus Management
```typescript
useEffect(() => {
  elementRef.current?.focus()
}, [])
```
**When to use**: Modals, dynamic content

## ⚠️ Common Mistakes

### Mistake 1: Missing Labels
```typescript
// ❌ Wrong: No label
<input type="text" name="email" />
```

```typescript
// ✅ Correct: Proper label
<label htmlFor="email">Email</label>
<input type="email" id="email" name="email" />
```
**Why**: Screen readers need labels.

### Mistake 2: Non-Semantic HTML
```typescript
// ❌ Wrong: Div for button
<div onClick={handleClick}>Click me</div>
```

```typescript
// ✅ Correct: Semantic button
<button onClick={handleClick}>Click me</button>
```
**Why**: Semantic elements provide meaning.

## ✨ Best Practices

1. **Use semantic HTML**: Proper elements for structure
2. **Add ARIA attributes**: When needed for clarity
3. **Ensure keyboard navigation**: All interactive elements
4. **Manage focus**: Proper focus order
5. **Test with screen readers**: Verify accessibility
6. **Check color contrast**: WCAG AA compliance
7. **Provide alt text**: For images

## 🔗 Related Concepts

- [App Router](../03-app-router/README.md) - Routing structure
- [Forms](../18-forms-user-input/README.md) - Accessible forms

## 📚 Resources

### Official Documentation
- [Accessibility](https://nextjs.org/docs/app/building-your-application/accessibility)

### Standards
- [WCAG](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA](https://www.w3.org/WAI/ARIA/apg/)

## 🎓 Key Takeaways

- Use semantic HTML elements
- Add ARIA attributes when needed
- Ensure keyboard navigation works
- Test with screen readers
- Manage focus properly
- Check color contrast
- Provide alternative text

