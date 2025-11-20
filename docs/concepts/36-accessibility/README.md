# Accessibility

> **Category**: Advanced | **Priority**: 🟡 Medium | **Difficulty**: Intermediate  
> **Related Concepts**: [App Router](../03-app-router/README.md)  
> **Status**: ✅ In Progress

## Overview

Building accessible Next.js applications that work for all users, including those using assistive technologies.

## Key Topics

- [Accessibility Guide](./accessibility.md) - Comprehensive accessibility guide
- ARIA Attributes - Accessible Rich Internet Applications
- Semantic HTML - Using proper HTML elements
- Keyboard Navigation - Ensuring keyboard accessibility
- Screen Reader Support - Making apps screen reader friendly
- Focus Management - Managing focus states

## Documentation

### Detailed Guides

1. **[Accessibility Guide](./accessibility.md)**
   - ARIA attributes
   - Semantic HTML
   - Keyboard navigation
   - Screen reader support

## Examples

See the [examples directory](./examples/) for complete code examples:

- `01-semantic-html.tsx` - Semantic HTML examples
- `02-aria-attributes.tsx` - ARIA attributes
- `03-keyboard-navigation.tsx` - Keyboard accessibility

## Quick Start

### Semantic HTML

```typescript
// Use semantic HTML elements
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>
```

## Resources

- [Accessibility Guide](https://nextjs.org/docs/app/building-your-application/accessibility)

---

**Previous**: [Progressive Web App](../35-pwa/README.md) | **Next**: [Code Organization](../37-code-organization/README.md)

