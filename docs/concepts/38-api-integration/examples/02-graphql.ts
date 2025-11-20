// Example 2: GraphQL Integration
// Demonstrates GraphQL with Apollo Client

// ============================================
// Example 1: Apollo Client Setup
// File: app/lib/graphql/client.ts
// ============================================

/*
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql'
})

const authLink = setContext((_, { headers }) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  ssrMode: typeof window === 'undefined'
})
*/

// ============================================
// Example 2: GraphQL Query
// File: app/lib/graphql/queries.ts
// ============================================

/*
import { gql } from '@apollo/client'

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`
*/

// ============================================
// Example 3: Using GraphQL in Component
// File: app/components/UserListGraphQL.tsx
// ============================================

/*
'use client'

import { useQuery, useMutation } from '@apollo/client'
import { GET_USERS, CREATE_USER } from '@/app/lib/graphql/queries'

export function UserListGraphQL() {
  const { data, loading, error } = useQuery(GET_USERS)
  const [createUser] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS }]
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <ul>
        {data?.users.map((user: any) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  )
}
*/

