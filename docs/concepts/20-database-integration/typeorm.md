# TypeORM

> **Category**: Intermediate | **Related Concepts**: [Prisma](./prisma.md), [SQL Databases](./sql-databases.md)  
> **Last Updated**: 2024

## 📖 Overview

TypeORM is a full-featured ORM for TypeScript and JavaScript. It supports multiple databases and provides decorators, migrations, and a powerful query builder.

**Key Points:**
- Full-featured ORM
- Decorator-based
- Multiple database support
- Migrations
- Query builder
- TypeScript support

## 🎯 When to Use

- **Full ORM**: When you need a full-featured ORM
- **Decorators**: When you prefer decorators
- **Multiple Databases**: When supporting multiple databases
- **Migrations**: When you need migrations
- **Complex Queries**: When you need complex queries
- **TypeScript**: When using TypeScript

## 💻 Basic Example

### Setup

```bash
npm install typeorm reflect-metadata
```

### Entity Definition

```typescript
// entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @Column({ nullable: true })
  name: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
```

### Data Source

```typescript
// lib/data-source.ts
import { DataSource } from 'typeorm'
import { User } from '@/entities/User'

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User],
  synchronize: false, // Never true in production
  logging: process.env.NODE_ENV === 'development',
})

let initialized = false

export async function initializeDataSource() {
  if (initialized) {
    return AppDataSource
  }

  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize()
    initialized = true
  }

  return AppDataSource
}
```

### Basic Usage

```typescript
// app/api/users/route.ts
import { initializeDataSource } from '@/lib/data-source'
import { User } from '@/entities/User'

export async function GET() {
  const dataSource = await initializeDataSource()
  const userRepository = dataSource.getRepository(User)
  
  const users = await userRepository.find()
  
  return Response.json(users)
}

export async function POST(request: Request) {
  const dataSource = await initializeDataSource()
  const userRepository = dataSource.getRepository(User)
  
  const { email, name } = await request.json()
  
  const user = userRepository.create({
    email,
    name,
  })
  
  const savedUser = await userRepository.save(user)
  
  return Response.json(savedUser)
}
```

## 🔧 Advanced Example

### Relationships

```typescript
// entities/Post.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column({ type: 'text', nullable: true })
  content: string

  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({ name: 'authorId' })
  author: User

  @Column()
  authorId: string
}

// entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Post } from './Post'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @OneToMany(() => Post, post => post.author)
  posts: Post[]
}
```

### Complex Queries

```typescript
// app/api/posts/route.ts
import { initializeDataSource } from '@/lib/data-source'
import { Post } from '@/entities/Post'

export async function GET(request: Request) {
  const dataSource = await initializeDataSource()
  const postRepository = dataSource.getRepository(Post)
  
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search')
  
  const queryBuilder = postRepository
    .createQueryBuilder('post')
    .leftJoinAndSelect('post.author', 'author')
    .orderBy('post.createdAt', 'DESC')
  
  if (search) {
    queryBuilder.where(
      'post.title ILIKE :search OR post.content ILIKE :search',
      { search: `%${search}%` }
    )
  }
  
  const posts = await queryBuilder.getMany()
  
  return Response.json(posts)
}
```

### Transactions

```typescript
// app/api/users/[id]/posts/route.ts
import { initializeDataSource } from '@/lib/data-source'
import { Post } from '@/entities/Post'
import { User } from '@/entities/User'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const dataSource = await initializeDataSource()
  
  await dataSource.transaction(async (manager) => {
    const postRepository = manager.getRepository(Post)
    const userRepository = manager.getRepository(User)
    
    // Create post
    const post = postRepository.create({
      title: 'New Post',
      content: 'Content',
      authorId: params.id,
    })
    await postRepository.save(post)
    
    // Update user
    await userRepository.increment({ id: params.id }, 'postCount', 1)
  })
  
  return Response.json({ success: true })
}
```

## 📋 Common Patterns

### Pattern 1: Find All
```typescript
const users = await userRepository.find()
```
**When to use**: Get all records

### Pattern 2: Find One
```typescript
const user = await userRepository.findOne({ where: { id } })
```
**When to use**: Get single record

### Pattern 3: Create
```typescript
const user = userRepository.create({...})
await userRepository.save(user)
```
**When to use**: Create new record

### Pattern 4: Query Builder
```typescript
const users = await userRepository
  .createQueryBuilder('user')
  .where('user.email = :email', { email })
  .getOne()
```
**When to use**: Complex queries

## ⚠️ Common Mistakes

### Mistake 1: Synchronize in Production
```typescript
// ❌ Wrong: Synchronize enabled
synchronize: true // Never in production
```
**Why**: Can cause data loss.

```typescript
// ✅ Correct: Use migrations
synchronize: false
```

### Mistake 2: Not Initializing
```typescript
// ❌ Wrong: Using without initialization
const users = await userRepository.find() // Error
```
**Why**: Need to initialize data source.

```typescript
// ✅ Correct: Initialize first
await initializeDataSource()
const users = await userRepository.find()
```

### Mistake 3: Not Using Transactions
```typescript
// ❌ Wrong: Multiple operations without transaction
await postRepository.save(post)
await userRepository.update(...)
```
**Why**: Need atomicity.

```typescript
// ✅ Correct: Use transaction
await dataSource.transaction(async (manager) => {
  // ... operations
})
```

## ✨ Best Practices

1. **Use migrations**: Never use synchronize in production
2. **Initialize once**: Cache data source initialization
3. **Use transactions**: For multiple related operations
4. **Query builder**: For complex queries
5. **Handle errors**: Always handle database errors
6. **Type safety**: Leverage TypeScript types

## 🔗 Related Concepts

- [Prisma](./prisma.md) - Alternative ORM
- [SQL Databases](./sql-databases.md) - SQL database basics

## 📚 Resources

### Official Documentation
- [TypeORM](https://typeorm.io)

## 🧪 Practice Exercises

### Exercise 1: Basic CRUD
**Difficulty**: Beginner  
**Goal**: Understand TypeORM basics  
**Instructions**:
1. Set up TypeORM
2. Create entities
3. Implement CRUD operations
4. Test all operations

### Exercise 2: Relationships
**Difficulty**: Intermediate  
**Goal**: Practice relationships  
**Instructions**:
1. Create related entities
2. Use query builder
3. Implement transactions
4. Test relationships

## 🎓 Key Takeaways

- TypeORM is a full-featured ORM
- Decorator-based entities
- Supports multiple databases
- Migrations included
- Powerful query builder
- TypeScript support

## ❓ FAQ

### Q: How do I install TypeORM?
**A**: Run `npm install typeorm reflect-metadata`.

### Q: Should I use synchronize?
**A**: Never in production. Use migrations instead.

### Q: How do I create migrations?
**A**: Run `typeorm migration:create` or use CLI.

### Q: Can I use with TypeScript?
**A**: Yes, TypeORM has excellent TypeScript support.

### Q: How do I handle connections?
**A**: Initialize DataSource once and reuse it.

---

**Next Steps**: 
- Review: [Prisma](./prisma.md) for comparison
- Practice: Set up TypeORM
- Build: Integrate database

