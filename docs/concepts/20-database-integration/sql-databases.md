# SQL Databases

> **Category**: Intermediate | **Related Concepts**: [Prisma](./prisma.md), [Migrations](./migrations.md)  
> **Last Updated**: 2024

## 📖 Overview

Next.js works with various SQL databases like PostgreSQL, MySQL, and SQLite. You can use ORMs like Prisma or raw SQL queries with database clients.

**Key Points:**
- PostgreSQL, MySQL, SQLite support
- ORM or raw SQL
- Connection pooling
- Transactions
- Prepared statements
- Type safety

## 🎯 When to Use

- **Relational Data**: When you have relational data
- **ACID**: When you need ACID transactions
- **SQL**: When you prefer SQL
- **PostgreSQL**: When using PostgreSQL
- **MySQL**: When using MySQL
- **SQLite**: When using SQLite

## 💻 Basic Example

### PostgreSQL with pg

```typescript
// lib/db.ts
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export default pool
```

### Basic Queries

```typescript
// app/api/users/route.ts
import pool from '@/lib/db'

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
```

### MySQL with mysql2

```typescript
// lib/db.ts
import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

export default pool
```

### Basic Queries

```typescript
// app/api/users/route.ts
import pool from '@/lib/db'

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
```

## 🔧 Advanced Example

### Transactions

```typescript
// app/api/users/[id]/posts/route.ts
import pool from '@/lib/db'

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
```

### Prepared Statements

```typescript
// lib/db.ts
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

export default pool

// app/api/users/route.ts
import pool from '@/lib/db'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search')
  
  if (search) {
    const result = await pool.query(
      'SELECT * FROM users WHERE name ILIKE $1 OR email ILIKE $1',
      [`%${search}%`]
    )
    return Response.json(result.rows)
  }
  
  const result = await pool.query('SELECT * FROM users')
  return Response.json(result.rows)
}
```

## 📋 Common Patterns

### Pattern 1: Connection Pool
```typescript
const pool = new Pool({ connectionString })
```
**When to use**: Reuse connections

### Pattern 2: Prepared Statements
```typescript
await pool.query('SELECT * FROM users WHERE id = $1', [id])
```
**When to use**: Prevent SQL injection

### Pattern 3: Transactions
```typescript
await client.query('BEGIN')
// ... operations
await client.query('COMMIT')
```
**When to use**: Multiple related operations

## ⚠️ Common Mistakes

### Mistake 1: SQL Injection
```typescript
// ❌ Wrong: String concatenation
await pool.query(`SELECT * FROM users WHERE email = '${email}'`)
```
**Why**: Vulnerable to SQL injection.

```typescript
// ✅ Correct: Parameterized queries
await pool.query('SELECT * FROM users WHERE email = $1', [email])
```

### Mistake 2: Not Using Connection Pool
```typescript
// ❌ Wrong: Creating new connection each time
const client = new Client({...})
await client.connect()
```
**Why**: Creates too many connections.

```typescript
// ✅ Correct: Use connection pool
const pool = new Pool({...})
await pool.query(...)
```

### Mistake 3: Not Handling Errors
```typescript
// ❌ Wrong: No error handling
const result = await pool.query(...)
```
**Why**: Database operations can fail.

```typescript
// ✅ Correct: Handle errors
try {
  const result = await pool.query(...)
} catch (error) {
  // Handle error
}
```

## ✨ Best Practices

1. **Use connection pools**: Reuse connections
2. **Parameterized queries**: Prevent SQL injection
3. **Handle errors**: Always handle database errors
4. **Use transactions**: For multiple related operations
5. **Close connections**: Release connections properly
6. **Use ORM**: Consider Prisma for type safety

## 🔗 Related Concepts

- [Prisma](./prisma.md) - Type-safe ORM
- [Migrations](./migrations.md) - Schema management

## 📚 Resources

### Official Documentation
- [PostgreSQL](https://www.postgresql.org)
- [MySQL](https://www.mysql.com)

## 🧪 Practice Exercises

### Exercise 1: Basic Queries
**Difficulty**: Beginner  
**Goal**: Understand SQL databases  
**Instructions**:
1. Set up database connection
2. Create tables
3. Implement CRUD operations
4. Test all operations

### Exercise 2: Transactions
**Difficulty**: Intermediate  
**Goal**: Practice transactions  
**Instructions**:
1. Create transactions
2. Handle rollbacks
3. Test error scenarios
4. Optimize queries

## 🎓 Key Takeaways

- SQL databases support relational data
- Use connection pools
- Parameterized queries prevent SQL injection
- Transactions ensure data integrity
- Handle errors properly
- Consider ORMs for type safety

## ❓ FAQ

### Q: Which SQL database should I use?
**A**: PostgreSQL is recommended for most use cases.

### Q: Should I use raw SQL or ORM?
**A**: ORM (like Prisma) for most cases, raw SQL for complex queries.

### Q: How do I prevent SQL injection?
**A**: Always use parameterized queries, never concatenate strings.

### Q: How do I handle connections?
**A**: Use connection pools to reuse connections.

### Q: Can I use with Server Components?
**A**: Yes, SQL databases work great with Server Components.

---

**Next Steps**: 
- Review: [Prisma](./prisma.md) for type-safe ORM
- Practice: Set up SQL database
- Build: Integrate database

