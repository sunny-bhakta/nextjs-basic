// Example 2: Barrel Exports
// Demonstrates barrel export patterns

// ============================================
// Example 1: Component Barrel Export
// File: app/components/index.ts
// ============================================

export { Button } from './Button'
export { Input } from './Input'
export { Modal } from './Modal'
export { Card } from './Card'
export { Badge } from './Badge'

// Usage:
// import { Button, Input, Modal } from '@/app/components'

// ============================================
// Example 2: UI Components Barrel
// File: app/components/ui/index.ts
// ============================================

export { Button } from './Button'
export { Input } from './Input'
export { Textarea } from './Textarea'
export { Select } from './Select'
export { Checkbox } from './Checkbox'
export { Radio } from './Radio'

// Usage:
// import { Button, Input } from '@/app/components/ui'

// ============================================
// Example 3: Feature Components Barrel
// File: app/components/products/index.ts
// ============================================

export { ProductList } from './ProductList'
export { ProductCard } from './ProductCard'
export { ProductFilters } from './ProductFilters'
export { ProductDetails } from './ProductDetails'

// Usage:
// import { ProductList, ProductCard } from '@/app/components/products'

// ============================================
// Example 4: Utilities Barrel Export
// File: app/lib/utils/index.ts
// ============================================

export { formatDate } from './date'
export { formatCurrency } from './currency'
export { validateEmail } from './validation'
export { debounce } from './debounce'
export { throttle } from './throttle'

// Usage:
// import { formatDate, formatCurrency } from '@/app/lib/utils'

// ============================================
// Example 5: Types Barrel Export
// File: app/types/index.ts
// ============================================

export type { User } from './user'
export type { Product } from './product'
export type { Order } from './order'
export type { ApiResponse } from './api'

// Usage:
// import type { User, Product } from '@/app/types'

// ============================================
// Example 6: Hooks Barrel Export
// File: app/lib/hooks/index.ts
// ============================================

export { useLocalStorage } from './useLocalStorage'
export { useDebounce } from './useDebounce'
export { useMediaQuery } from './useMediaQuery'
export { useClickOutside } from './useClickOutside'

// Usage:
// import { useLocalStorage, useDebounce } from '@/app/lib/hooks'

// ============================================
// Example 7: API Functions Barrel
// File: app/lib/api/index.ts
// ============================================

export { fetchUsers } from './users'
export { fetchProducts } from './products'
export { fetchOrders } from './orders'
export { createUser } from './users'

// Usage:
// import { fetchUsers, fetchProducts } from '@/app/lib/api'

// ============================================
// Example 8: Constants Barrel
// File: app/lib/constants/index.ts
// ============================================

export { ROUTES } from './routes'
export { API_ENDPOINTS } from './api'
export { VALIDATION_RULES } from './validation'
export { THEME_COLORS } from './theme'

// Usage:
// import { ROUTES, API_ENDPOINTS } from '@/app/lib/constants'

