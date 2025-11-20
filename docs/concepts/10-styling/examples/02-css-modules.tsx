// Example 2: CSS Modules
// Demonstrates using CSS Modules in Next.js

// app/components/Button.module.css
// .button {
//   padding: 10px 20px;
//   background: blue;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   transition: background 0.2s;
// }
//
// .button:hover {
//   background: darkblue;
// }
//
// .primary {
//   background: blue;
// }
//
// .secondary {
//   background: gray;
// }

// app/components/Button.tsx - CSS Module component
import styles from './Button.module.css'
import { clsx } from 'clsx'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
}

export default function Button({ children, variant = 'primary' }: ButtonProps) {
  return (
    <button
      className={clsx(styles.button, {
        [styles.primary]: variant === 'primary',
        [styles.secondary]: variant === 'secondary',
      })}
    >
      {children}
    </button>
  )
}

// app/components/Card.module.css
// .card {
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   padding: 20px;
//   background: white;
// }
//
// .title {
//   font-size: 24px;
//   font-weight: bold;
//   margin-bottom: 10px;
// }
//
// .content {
//   color: #666;
// }

// app/components/Card.tsx - CSS Module card
import styles from './Card.module.css'

export default function Card({ title, content }: { title: string; content: string }) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.content}>{content}</p>
    </div>
  )
}

