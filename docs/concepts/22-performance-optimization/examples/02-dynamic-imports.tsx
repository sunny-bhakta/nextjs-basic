// Example 2: Dynamic Imports
// Demonstrates lazy loading with dynamic imports

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Basic dynamic import
const HeavyComponent = dynamic(() => import('./components/HeavyComponent'), {
  loading: () => <div className="p-4">Loading component...</div>
})

// Dynamic import with no SSR
const Chart = dynamic(() => import('./components/Chart'), {
  loading: () => <div>Loading chart...</div>,
  ssr: false // Client-side only
})

// Dynamic import with named export
const Modal = dynamic(
  () => import('./components/Modal').then(mod => mod.Modal),
  {
    loading: () => <div>Loading modal...</div>
  }
)

// app/page.tsx - Using dynamic imports
export default function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Home</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <HeavyComponent />
      </Suspense>
    </div>
  )
}

// app/dashboard/page.tsx - Conditional loading
'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const Analytics = dynamic(() => import('./components/Analytics'), {
  loading: () => <div>Loading analytics...</div>
})

const Reports = dynamic(() => import('./components/Reports'), {
  loading: () => <div>Loading reports...</div>
})

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'analytics' | 'reports'>('analytics')
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded ${
            activeTab === 'analytics' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          Analytics
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 rounded ${
            activeTab === 'reports' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          Reports
        </button>
      </div>
      {activeTab === 'analytics' && <Analytics />}
      {activeTab === 'reports' && <Reports />}
    </div>
  )
}

// app/components/HeavyComponent.tsx
export default function HeavyComponent() {
  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-semibold mb-2">Heavy Component</h2>
      <p>This component is loaded dynamically to reduce initial bundle size.</p>
    </div>
  )
}

// app/components/Chart.tsx - Client-only component
'use client'

export default function Chart() {
  // This component uses browser-only APIs
  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-semibold mb-2">Chart</h2>
      <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
        Chart visualization (client-only)
      </div>
    </div>
  )
}

// app/components/Modal.tsx
export function Modal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md">
        <h2 className="text-xl font-semibold mb-4">Modal</h2>
        <p className="mb-4">Modal content here</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  )
}

// app/components/Analytics.tsx
export default function Analytics() {
  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-semibold mb-4">Analytics</h2>
      <div className="space-y-2">
        <p>Total views: 1,234</p>
        <p>Unique visitors: 567</p>
        <p>Bounce rate: 45%</p>
      </div>
    </div>
  )
}

// app/components/Reports.tsx
export default function Reports() {
  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-semibold mb-4">Reports</h2>
      <div className="space-y-2">
        <p>Monthly report: January 2024</p>
        <p>Quarterly report: Q1 2024</p>
        <p>Annual report: 2024</p>
      </div>
    </div>
  )
}

