// Example 4: SWR
// Demonstrates using SWR for data fetching

// app/providers.tsx - SWR config
'use client'

import { SWRConfig } from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
      }}
    >
      {children}
    </SWRConfig>
  )
}

// app/components/UserList.tsx - Basic SWR
'use client'

import useSWR from 'swr'

export default function UserList() {
  const { data, error, isLoading } = useSWR('/api/users')
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <ul>
      {data.map((user: { id: string; name: string }) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}

// app/components/CreateUser.tsx - Mutation with SWR
'use client'

import { useState } from 'react'
import { useSWRConfig } from 'swr'

export default function CreateUser() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const { mutate } = useSWRConfig()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    })
    
    // Revalidate
    mutate('/api/users')
    
    setName('')
    setEmail('')
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <button type="submit">Create User</button>
    </form>
  )
}

