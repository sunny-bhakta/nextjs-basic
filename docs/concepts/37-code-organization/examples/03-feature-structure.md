# Feature-Based Structure

## Feature Module Structure

```
app/
  features/
    auth/
      components/
        LoginForm.tsx
        RegisterForm.tsx
        AuthButton.tsx
      hooks/
        useAuth.ts
        useLogin.ts
      utils/
        authHelpers.ts
        tokenManager.ts
      types/
        auth.ts
      api/
        authApi.ts
      index.ts              # Barrel export
    products/
      components/
        ProductList.tsx
        ProductCard.tsx
        ProductFilters.tsx
      hooks/
        useProducts.ts
        useProduct.ts
      utils/
        productHelpers.ts
      types/
        product.ts
      api/
        productsApi.ts
      index.ts
    users/
      components/
        UserProfile.tsx
        UserList.tsx
      hooks/
        useUser.ts
        useUsers.ts
      utils/
        userHelpers.ts
      types/
        user.ts
      api/
        usersApi.ts
      index.ts
```

## Feature Barrel Export

```typescript
// app/features/products/index.ts
export { ProductList } from './components/ProductList'
export { ProductCard } from './components/ProductCard'
export { useProducts } from './hooks/useProducts'
export { useProduct } from './hooks/useProduct'
export type { Product } from './types/product'
export { fetchProducts } from './api/productsApi'

// Usage:
// import { ProductList, useProducts, type Product } from '@/app/features/products'
```

## Shared vs Feature Components

```
app/
  components/              # Shared across features
    ui/
      Button.tsx
      Input.tsx
      Modal.tsx
    layout/
      Header.tsx
      Footer.tsx
  features/                # Feature-specific
    auth/
      components/
        LoginForm.tsx      # Uses shared Button, Input
    products/
      components/
        ProductCard.tsx    # Uses shared Card, Button
```

## Feature Route Organization

```
app/
  (auth)/                  # Auth feature routes
    login/
      page.tsx
      components/
        LoginForm.tsx
    register/
      page.tsx
      components/
        RegisterForm.tsx
  (products)/              # Products feature routes
    products/
      page.tsx
      [id]/
        page.tsx
      components/
        ProductList.tsx
        ProductDetails.tsx
```

## Feature with Co-location

```
app/
  products/
    page.tsx
    [id]/
      page.tsx
    components/            # Co-located with route
      ProductList.tsx
      ProductCard.tsx
    hooks/                 # Co-located hooks
      useProducts.ts
    utils/                 # Co-located utils
      productHelpers.ts
    types/                 # Co-located types
      product.ts
```

