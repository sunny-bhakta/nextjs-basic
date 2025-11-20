// Example 3: SQL Databases
// Demonstrates using raw SQL with PostgreSQL and MySQL

// lib/postgres.ts - PostgreSQL connection
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

export default pool

// app/api/users/route.ts - PostgreSQL queries
import pool from '@/lib/postgres'

export async function GET() {
  const result = await pool.query('SELECT * FROM users')
  return Response.json(result.rows)
}

export async function POST(request: Request) {
  const { email, name } = await request.json()
  
  const result = await pool.query(
    'INSERT INTO users (email, name) VALUES ($1, $2) RETURNING *',
    [email, name]
  )
  
  return Response.json(result.rows[0])
}

// lib/mysql.ts - MySQL connection
import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export default pool

// app/api/users/route.ts - MySQL queries
import pool from '@/lib/mysql'

export async function GET() {
  const [rows] = await pool.execute('SELECT * FROM users')
  return Response.json(rows)
}

export async function POST(request: Request) {
  const { email, name } = await request.json()
  
  const [result] = await pool.execute(
    'INSERT INTO users (email, name) VALUES (?, ?)',
    [email, name]
  )
  
  return Response.json(result)
}

// app/api/users/[id]/posts/route.ts - Transactions
import pool from '@/lib/postgres'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { title, content } = await request.json()
  const client = await pool.connect()
  
  try {
    await client.query('BEGIN')
    
    // Create post
    const postResult = await client.query(
      'INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING *',
      [title, content, params.id]
    )
    
    // Update user's post count
    await client.query(
      'UPDATE users SET post_count = post_count + 1 WHERE id = $1',
      [params.id]
    )
    
    await client.query('COMMIT')
    return Response.json(postResult.rows[0])
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}

