# Folder Structure Examples

## Basic App Router Structure

```
app/
  layout.tsx              # Root layout
  page.tsx                # Home page
  loading.tsx             # Loading UI
  error.tsx               # Error UI
  not-found.tsx           # 404 page
  globals.css             # Global styles
  components/             # Shared components
    Button.tsx
    Input.tsx
    Modal.tsx
  lib/                    # Utilities
    utils.ts
    api.ts
  types/                  # TypeScript types
    index.ts
```

## Feature-Based Structure

```
app/
  (auth)/                 # Route group
    login/
      page.tsx
      components/
        LoginForm.tsx
    register/
      page.tsx
      components/
        RegisterForm.tsx
  (dashboard)/
    dashboard/
      page.tsx
      components/
        Stats.tsx
        Chart.tsx
  components/             # Shared components
    ui/
      Button.tsx
      Input.tsx
    layout/
      Header.tsx
      Footer.tsx
  lib/                    # Shared utilities
    utils.ts
    api.ts
```

## Component Organization

```
app/
  components/
    ui/                   # UI components
      Button.tsx
      Input.tsx
      Card.tsx
    forms/                # Form components
      ContactForm.tsx
      LoginForm.tsx
    layout/               # Layout components
      Header.tsx
      Footer.tsx
      Sidebar.tsx
    features/             # Feature components
      products/
        ProductList.tsx
        ProductCard.tsx
      users/
        UserProfile.tsx
        UserList.tsx
```

## Advanced Structure

```
app/
  (marketing)/            # Marketing pages
    about/
      page.tsx
    contact/
      page.tsx
  (app)/                  # App pages
    dashboard/
      page.tsx
      layout.tsx
      components/
        DashboardStats.tsx
    settings/
      page.tsx
      components/
        ProfileSettings.tsx
  api/                    # API routes
    users/
      route.ts
    products/
      route.ts
  components/
    ui/                   # Base UI components
    shared/               # Shared components
    providers/            # Context providers
  lib/
    utils/                # Utility functions
    hooks/                # Custom hooks
    constants/            # Constants
    types/                # TypeScript types
  public/                 # Static assets
    images/
    icons/
```

## Co-location Pattern

```
app/
  products/
    page.tsx              # Products page
    components/           # Products-specific components
      ProductList.tsx
      ProductCard.tsx
      ProductFilters.tsx
    hooks/                # Products-specific hooks
      useProducts.ts
    utils/                # Products-specific utils
      productHelpers.ts
    types/                # Products-specific types
      product.ts
```

