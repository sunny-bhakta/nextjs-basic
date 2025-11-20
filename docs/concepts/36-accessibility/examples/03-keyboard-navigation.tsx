// Example 3: Keyboard Navigation
// Demonstrates keyboard accessibility

'use client'

import { useEffect, useRef, useState } from 'react'

// ============================================
// Example 1: Focus Management
// ============================================

export function FocusManagement() {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus()
  }, [])

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        type="text"
        placeholder="This input is focused on mount"
        className="w-full px-3 py-2 border rounded"
      />
      <button className="px-4 py-2 bg-blue-600 text-white rounded">
        Submit
      </button>
    </div>
  )
}

// ============================================
// Example 2: Keyboard Trap (Modal)
// ============================================

export function KeyboardTrapModal({ isOpen, onClose }: {
  isOpen: boolean
  onClose: () => void
}) {
  const modalRef = useRef<HTMLDivElement>(null)
  const firstFocusableRef = useRef<HTMLButtonElement>(null)
  const lastFocusableRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isOpen) {
      // Focus first element
      firstFocusableRef.current?.focus()

      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstFocusableRef.current) {
            lastFocusableRef.current?.focus()
            e.preventDefault()
          }
        } else {
          // Tab
          if (document.activeElement === lastFocusableRef.current) {
            firstFocusableRef.current?.focus()
            e.preventDefault()
          }
        }
      }

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }

      document.addEventListener('keydown', handleTab)
      document.addEventListener('keydown', handleEscape)

      return () => {
        document.removeEventListener('keydown', handleTab)
        document.removeEventListener('keydown', handleEscape)
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div ref={modalRef} className="bg-white p-6 rounded max-w-md">
        <h2 className="text-xl font-bold mb-4">Modal Title</h2>
        <p className="mb-4">Modal content</p>
        <div className="flex gap-2">
          <button
            ref={firstFocusableRef}
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Close
          </button>
          <button
            ref={lastFocusableRef}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

// ============================================
// Example 3: Keyboard Shortcuts
// ============================================

export function KeyboardShortcuts() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K for search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setMessage('Search shortcut triggered')
      }

      // Ctrl/Cmd + S for save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        setMessage('Save shortcut triggered')
      }
    }

    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  return (
    <div>
      <p className="mb-2">Try Ctrl/Cmd + K or Ctrl/Cmd + S</p>
      {message && (
        <p className="text-blue-600">{message}</p>
      )}
    </div>
  )
}

// ============================================
// Example 4: Accessible Dropdown Menu
// ============================================

export function AccessibleDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          menuRef.current &&
          !menuRef.current.contains(e.target as Node) &&
          buttonRef.current &&
          !buttonRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false)
        }
      }

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false)
          buttonRef.current?.focus()
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)

      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('keydown', handleEscape)
      }
    }
  }, [isOpen])

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Menu
      </button>
      {isOpen && (
        <ul
          ref={menuRef}
          role="menu"
          className="absolute mt-2 bg-white border rounded shadow-lg"
        >
          <li role="menuitem">
            <a
              href="/item1"
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Item 1
            </a>
          </li>
          <li role="menuitem">
            <a
              href="/item2"
              className="block px-4 py-2 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Item 2
            </a>
          </li>
        </ul>
      )}
    </div>
  )
}

// ============================================
// Example 5: Skip Link
// ============================================

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded"
    >
      Skip to main content
    </a>
  )
}

// Usage in layout
export function LayoutWithSkipLink() {
  return (
    <div>
      <SkipLink />
      <header>Header content</header>
      <main id="main-content">
        Main content
      </main>
    </div>
  )
}

