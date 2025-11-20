# Code Organization

> **Category**: Advanced | **Related Concepts**: [App Router](../03-app-router/README.md)  
> **Last Updated**: 2024

## 📖 Overview

Proper code organization in Next.js improves maintainability, scalability, and developer experience. This guide covers folder structures, component organization, and best practices.

**Key Points:**
- App Router folder structure
- Component organization patterns
- Feature-based structure
- Barrel exports
- Utility organization

## 🎯 When to Use

- **All Projects**: Good organization is essential
- **Large Projects**: Scale better with structure
- **Team Projects**: Easier collaboration
- **Maintenance**: Easier to find and update code
- **Testing**: Better test organization

## 💻 Basic Example

### Folder Structure

```
app/
  layout.tsx
  page.tsx
  components/
    Button.tsx
    Input.tsx
  lib/
    utils.ts
    api.ts
  types/
    index.ts
```

### Barrel Export

```typescript
// app/components/index.ts
export { Button } from './Button'
export { Input } from './Input'
export { Modal } from './Modal'

// Usage
import { Button, Input, Modal } from '@/app/components'
```

## 🔧 Advanced Example

### Feature-Based Structure

```
app/
  (auth)/
    login/
      page.tsx
      components/
        LoginForm.tsx
    register/
      page.tsx
  (dashboard)/
    dashboard/
      page.tsx
      components/
        Stats.tsx
  components/
    shared/
      Button.tsx
      Input.tsx
```

## 📋 Common Patterns

### Pattern 1: Component Co-location
```
app/
  products/
    page.tsx
    components/
      ProductList.tsx
      ProductCard.tsx
```
**When to use**: Route-specific components

### Pattern 2: Shared Components
```
app/
  components/
    ui/
      Button.tsx
      Input.tsx
    layout/
      Header.tsx
      Footer.tsx
```
**When to use**: Reusable components

### Pattern 3: Feature Modules
```
app/
  features/
    auth/
      components/
      hooks/
      utils/
    products/
      components/
      hooks/
      utils/
```
**When to use**: Large applications

## ⚠️ Common Mistakes

### Mistake 1: Flat Structure
```
app/
  Button.tsx
  Input.tsx
  ProductList.tsx
  UserProfile.tsx
```

```typescript
// ✅ Correct: Organized structure
app/
  components/
    Button.tsx
    Input.tsx
  products/
    components/
      ProductList.tsx
```
**Why**: Flat structure becomes unmanageable.

### Mistake 2: No Barrel Exports
```typescript
// ❌ Wrong: Long import paths
import { Button } from '@/app/components/ui/Button'
import { Input } from '@/app/components/ui/Input'
```

```typescript
// ✅ Correct: Barrel exports
import { Button, Input } from '@/app/components/ui'
```
**Why**: Cleaner imports.

## ✨ Best Practices

1. **Use App Router structure**: Follow Next.js conventions
2. **Co-locate related files**: Keep related code together
3. **Use barrel exports**: Simplify imports
4. **Organize by feature**: For large apps
5. **Separate concerns**: Components, utils, types
6. **Use consistent naming**: Clear file names
7. **Document structure**: README in key folders

## 🔗 Related Concepts

- [App Router](../03-app-router/README.md) - Routing structure
- [TypeScript Support](../23-typescript-support/README.md) - Type organization

## 📚 Resources

### Official Documentation
- [Project Structure](https://nextjs.org/docs/app/building-your-application/routing/colocating-files)

## 🎓 Key Takeaways

- Follow App Router conventions
- Co-locate related files
- Use barrel exports
- Organize by feature for large apps
- Keep structure consistent
- Document your organization

