// Example 3: Component Types
// Demonstrates advanced TypeScript patterns for components

import { ReactNode } from 'react'

// Generic component with type parameter
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => ReactNode
  keyExtractor: (item: T) => string | number
  className?: string
}

export function List<T>({ items, renderItem, keyExtractor, className }: ListProps<T>) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={keyExtractor(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  )
}

// Usage of generic component
interface Product {
  id: string
  name: string
  price: number
}

export function ProductList({ products }: { products: Product[] }) {
  return (
    <List
      items={products}
      renderItem={(product) => (
        <div>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
      )}
      keyExtractor={(product) => product.id}
      className="space-y-2"
    />
  )
}

// Component with discriminated union
type ButtonVariant = 'primary' | 'secondary' | 'danger'

interface BaseButtonProps {
  children: ReactNode
  disabled?: boolean
  className?: string
}

interface PrimaryButtonProps extends BaseButtonProps {
  variant: 'primary'
  onClick: () => void
}

interface SecondaryButtonProps extends BaseButtonProps {
  variant: 'secondary'
  onClick: () => void
}

interface DangerButtonProps extends BaseButtonProps {
  variant: 'danger'
  onClick: () => void
  confirm?: boolean
}

type ButtonProps = PrimaryButtonProps | SecondaryButtonProps | DangerButtonProps

export function Button(props: ButtonProps) {
  const baseClasses = 'px-4 py-2 rounded font-medium disabled:opacity-50'
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  }
  
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`${baseClasses} ${variantClasses[props.variant]} ${props.className || ''}`}
    >
      {props.children}
    </button>
  )
}

// Component with forwardRef
import { forwardRef } from 'react'

interface InputProps {
  label: string
  error?: string
  type?: 'text' | 'email' | 'password'
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, error, type = 'text', ...props }, ref) {
    return (
      <div>
        <label className="block mb-1 font-medium">{label}</label>
        <input
          ref={ref}
          type={type}
          className={`w-full px-3 py-2 border rounded ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    )
  }
)

// Typed form component
interface FormData {
  name: string
  email: string
  age: number
}

interface FormProps {
  onSubmit: (data: FormData) => void | Promise<void>
  initialData?: Partial<FormData>
  loading?: boolean
}

export function TypedForm({ onSubmit, initialData, loading }: FormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const data: FormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      age: Number(formData.get('age'))
    }
    
    await onSubmit(data)
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Name"
        name="name"
        defaultValue={initialData?.name}
        required
      />
      <Input
        label="Email"
        name="email"
        type="email"
        defaultValue={initialData?.email}
        required
      />
      <Input
        label="Age"
        name="age"
        type="text"
        defaultValue={initialData?.age?.toString()}
        required
      />
      <Button
        variant="primary"
        onClick={() => {}}
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  )
}

// Component with children and context
interface CardProps {
  title: string
  children: ReactNode
  footer?: ReactNode
  className?: string
}

export function Card({ title, children, footer, className }: CardProps) {
  return (
    <div className={`border rounded-lg p-4 ${className || ''}`}>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div>{children}</div>
      {footer && <div className="mt-4 pt-4 border-t">{footer}</div>}
    </div>
  )
}

