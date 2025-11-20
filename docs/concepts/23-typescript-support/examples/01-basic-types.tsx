// Example 1: Basic Types
// Demonstrates basic TypeScript types and interfaces

// app/types.ts - Type definitions
export interface User {
  id: string
  name: string
  email: string
  age: number
  role: 'admin' | 'user' | 'guest'
}

export interface Post {
  id: string
  title: string
  content: string
  authorId: string
  publishedAt: Date
  tags: string[]
}

export type Status = 'pending' | 'approved' | 'rejected'

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

// app/components/UserCard.tsx - Typed component props
import { User } from '@/app/types'

interface UserCardProps {
  user: User
  showEmail?: boolean
  onSelect?: (user: User) => void
  className?: string
}

export default function UserCard({ 
  user, 
  showEmail = false, 
  onSelect,
  className = '' 
}: UserCardProps) {
  return (
    <div className={`p-4 border rounded ${className}`}>
      <h2 className="font-semibold">{user.name}</h2>
      <p className="text-sm text-gray-600">Age: {user.age}</p>
      {showEmail && <p className="text-gray-600">{user.email}</p>}
      <p className="text-xs text-blue-600">{user.role}</p>
      {onSelect && (
        <button
          onClick={() => onSelect(user)}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Select
        </button>
      )}
    </div>
  )
}

// app/components/PostList.tsx - Typed component with array
import { Post } from '@/app/types'

interface PostListProps {
  posts: Post[]
  onPostClick?: (post: Post) => void
}

export default function PostList({ posts, onPostClick }: PostListProps) {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <article
          key={post.id}
          className="p-4 border rounded cursor-pointer hover:bg-gray-50"
          onClick={() => onPostClick?.(post)}
        >
          <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
          <p className="text-gray-600 mb-2">{post.content}</p>
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                {tag}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {new Date(post.publishedAt).toLocaleDateString()}
          </p>
        </article>
      ))}
    </div>
  )
}

// app/page.tsx - Using typed components
import { User, Post } from '@/app/types'
import UserCard from './components/UserCard'
import PostList from './components/PostList'

export default function HomePage() {
  const users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      age: 30,
      role: 'admin'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      age: 25,
      role: 'user'
    }
  ]

  const posts: Post[] = [
    {
      id: '1',
      title: 'First Post',
      content: 'This is the first post content',
      authorId: '1',
      publishedAt: new Date(),
      tags: ['tech', 'nextjs']
    }
  ]

  const handleUserSelect = (user: User) => {
    console.log('Selected user:', user)
  }

  const handlePostClick = (post: Post) => {
    console.log('Clicked post:', post)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Home</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        <div className="grid grid-cols-2 gap-4">
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              showEmail
              onSelect={handleUserSelect}
            />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Posts</h2>
        <PostList posts={posts} onPostClick={handlePostClick} />
      </div>
    </div>
  )
}

