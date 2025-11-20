// Example 1: Semantic HTML
// Demonstrates semantic HTML for accessibility

// ============================================
// Example 1: Semantic Navigation
// ============================================

export default function Navigation() {
  return (
    <nav aria-label="Main navigation">
      <ul className="flex space-x-4">
        <li>
          <a href="/" className="hover:underline">
            Home
          </a>
        </li>
        <li>
          <a href="/about" className="hover:underline">
            About
          </a>
        </li>
        <li>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  )
}

// ============================================
// Example 2: Accessible Form
// ============================================

export function ContactForm() {
  return (
    <form aria-label="Contact form" className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-1 font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          aria-required="true"
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="email" className="block mb-1 font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          aria-required="true"
          aria-describedby="email-help"
          className="w-full px-3 py-2 border rounded"
        />
        <span id="email-help" className="text-sm text-gray-600">
          We'll never share your email
        </span>
      </div>
      <div>
        <label htmlFor="message" className="block mb-1 font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          aria-required="true"
          rows={4}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Submit
      </button>
    </form>
  )
}

// ============================================
// Example 3: Semantic Article Structure
// ============================================

export function Article({ title, content, author, date }: {
  title: string
  content: string
  author: string
  date: string
}) {
  return (
    <article className="p-6">
      <header>
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <div className="text-sm text-gray-600 mb-4">
          <span>By {author}</span>
          <time dateTime={date} className="ml-2">
            {new Date(date).toLocaleDateString()}
          </time>
        </div>
      </header>
      <main>
        <div className="prose">
          {content}
        </div>
      </main>
      <footer className="mt-4 pt-4 border-t">
        <p className="text-sm text-gray-600">
          Published on {new Date(date).toLocaleDateString()}
        </p>
      </footer>
    </article>
  )
}

// ============================================
// Example 4: Accessible Button
// ============================================

export function AccessibleButton() {
  return (
    <div className="space-y-4">
      {/* ✅ Correct: Semantic button */}
      <button
        type="button"
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Click me
      </button>

      {/* ✅ Correct: Icon button with aria-label */}
      <button
        type="button"
        aria-label="Close dialog"
        className="p-2 rounded hover:bg-gray-200"
      >
        <span aria-hidden="true">×</span>
      </button>

      {/* ✅ Correct: Link styled as button */}
      <a
        href="/action"
        role="button"
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded"
      >
        Go to action
      </a>
    </div>
  )
}

// ============================================
// Example 5: Accessible Image
// ============================================

import Image from 'next/image'

export function AccessibleImage() {
  return (
    <div className="space-y-4">
      {/* ✅ Correct: Image with alt text */}
      <Image
        src="/hero.jpg"
        alt="Beautiful landscape with mountains and lake"
        width={800}
        height={600}
        className="rounded"
      />

      {/* ✅ Correct: Decorative image */}
      <Image
        src="/decoration.png"
        alt=""
        width={100}
        height={100}
        aria-hidden="true"
        className="opacity-50"
      />

      {/* ✅ Correct: Image with description */}
      <figure>
        <Image
          src="/chart.png"
          alt="Sales chart showing growth over time"
          width={600}
          height={400}
          className="rounded"
        />
        <figcaption className="text-sm text-gray-600 mt-2">
          Sales growth from Q1 to Q4
        </figcaption>
      </figure>
    </div>
  )
}

