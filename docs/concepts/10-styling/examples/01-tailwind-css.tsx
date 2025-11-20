// Example 1: Tailwind CSS
// Demonstrates using Tailwind CSS in Next.js

// app/page.tsx - Basic Tailwind usage
export default function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Hello World</h1>
        <p className="text-gray-600">Welcome to Next.js with Tailwind CSS</p>
      </div>
    </div>
  )
}

// app/components/Button.tsx - Tailwind button component
export default function Button({ children, variant = 'primary' }: { children: React.ReactNode; variant?: 'primary' | 'secondary' }) {
  const baseClasses = "px-4 py-2 rounded font-semibold transition-colors"
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300"
  }
  
  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </button>
  )
}

// app/components/Card.tsx - Responsive card with Tailwind
export default function Card({ title, content }: { title: string; content: string }) {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  )
}

// app/components/DarkMode.tsx - Dark mode with Tailwind
export default function DarkModeExample() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-8">
      <h1 className="text-3xl font-bold mb-4">Dark Mode Example</h1>
      <p className="text-gray-600 dark:text-gray-300">
        This text adapts to dark mode
      </p>
    </div>
  )
}

