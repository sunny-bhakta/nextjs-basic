// Example 2: ARIA Attributes
// Demonstrates ARIA attributes for enhanced accessibility

'use client'

import { useState } from 'react'

// ============================================
// Example 1: ARIA Labels and Descriptions
// ============================================

export function ARIAForm() {
  const [error, setError] = useState('')

  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="username" className="block mb-1 font-medium">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          required
          aria-required="true"
          aria-describedby="username-help username-error"
          aria-invalid={error ? 'true' : 'false'}
          className="w-full px-3 py-2 border rounded"
        />
        <span id="username-help" className="text-sm text-gray-600">
          Choose a unique username
        </span>
        {error && (
          <span id="username-error" role="alert" className="text-sm text-red-600">
            {error}
          </span>
        )}
      </div>
    </form>
  )
}

// ============================================
// Example 2: ARIA Live Regions
// ============================================

export function LiveRegion() {
  const [message, setMessage] = useState('')

  const handleAction = () => {
    setMessage('Action completed successfully')
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div>
      <button
        onClick={handleAction}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Perform Action
      </button>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="mt-2 text-sm"
      >
        {message}
      </div>
    </div>
  )
}

// ============================================
// Example 3: ARIA Roles
// ============================================

export function CustomButton() {
  return (
    <div className="space-y-4">
      {/* Custom button with role */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => console.log('Clicked')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            console.log('Clicked')
          }
        }}
        className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
      >
        Custom Button
      </div>

      {/* Alert role */}
      <div
        role="alert"
        className="p-4 bg-red-100 border border-red-300 rounded"
      >
        This is an alert message
      </div>

      {/* Banner role */}
      <header role="banner" className="p-4 bg-gray-100">
        <h1>Site Header</h1>
      </header>
    </div>
  )
}

// ============================================
// Example 4: ARIA Modal
// ============================================

export function Modal({ isOpen, onClose, children }: {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="bg-white p-6 rounded max-w-md">
        <h2 id="modal-title" className="text-xl font-bold mb-2">
          Modal Title
        </h2>
        <p id="modal-description" className="mb-4">
          Modal description
        </p>
        {children}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-200 rounded"
        >
          Close
        </button>
      </div>
    </div>
  )
}

// ============================================
// Example 5: ARIA Progress
// ============================================

export function ProgressBar({ value, max = 100 }: { value: number; max?: number }) {
  const percentage = (value / max) * 100

  return (
    <div>
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label="Loading progress"
        className="w-full bg-gray-200 rounded-full h-4"
      >
        <div
          className="bg-blue-600 h-4 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm text-gray-600 mt-1">
        {value}% complete
      </span>
    </div>
  )
}

// ============================================
// Example 6: ARIA Tabs
// ============================================

export function Tabs() {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { id: 'tab-1', label: 'Tab 1', content: 'Content for tab 1' },
    { id: 'tab-2', label: 'Tab 2', content: 'Content for tab 2' },
    { id: 'tab-3', label: 'Tab 3', content: 'Content for tab 3' }
  ]

  return (
    <div>
      <div role="tablist" aria-label="Sample tabs">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`panel-${index}`}
            id={tab.id}
            tabIndex={activeTab === index ? 0 : -1}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 ${
              activeTab === index
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${index}`}
          aria-labelledby={tab.id}
          hidden={activeTab !== index}
          className="p-4 border"
        >
          {tab.content}
        </div>
      ))}
    </div>
  )
}

