# Mongoose (MongoDB)

> **Category**: Intermediate | **Related Concepts**: [Data Fetching](../05-data-fetching/README.md), [API Routes](../06-api-routes/README.md)  
> **Last Updated**: 2024

## 📖 Overview

Mongoose is an ODM (Object Document Mapper) for MongoDB and Node.js. It provides a schema-based solution for modeling application data with built-in type casting, validation, and query building.

**Key Points:**
- MongoDB ODM
- Schema-based modeling
- Built-in validation
- Query builder
- Middleware support
- TypeScript support

## 🎯 When to Use

- **MongoDB**: When using MongoDB
- **Schema Validation**: When you need schema validation
- **ODM**: When you want an ODM for MongoDB
- **TypeScript**: When using TypeScript
- **Validation**: When you need built-in validation
- **Relationships**: When modeling relationships

## 💻 Basic Example

### Setup

```bash
npm install mongoose
```

### Connection

```typescript
// lib/mongodb.ts
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local')
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default connectDB
```

### Schema Definition

```typescript
// models/User.ts
import mongoose, { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  age: {
    type: Number,
    min: [0, 'Age must be positive'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export const User = models.User || model('User', UserSchema)
```

### Basic Usage

```typescript
// app/api/users/route.ts
import connectDB from '@/lib/mongodb'
import { User } from '@/models/User'

export async function GET() {
  await connectDB()
  
  const users = await User.find({})
  
  return Response.json(users)
}

export async function POST(request: Request) {
  await connectDB()
  
  const { email, name } = await request.json()
  
  const user = await User.create({
    email,
    name,
  })
  
  return Response.json(user)
}
```

## 🔧 Advanced Example

### Complex Queries

```typescript
// app/api/users/route.ts
import connectDB from '@/lib/mongodb'
import { User } from '@/models/User'

export async function GET(request: Request) {
  await connectDB()
  
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search')
  const minAge = searchParams.get('minAge')
  
  const query: any = {}
  
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ]
  }
  
  if (minAge) {
    query.age = { $gte: parseInt(minAge) }
  }
  
  const users = await User.find(query)
    .sort({ createdAt: -1 })
    .limit(10)
  
  return Response.json(users)
}
```

### Relationships

```typescript
// models/Post.ts
import mongoose, { Schema, model, models } from 'mongoose'

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export const Post = models.Post || model('Post', PostSchema)

// Usage with populate
const posts = await Post.find({}).populate('author')
```

### Middleware

```typescript
// models/User.ts
import mongoose, { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
  email: String,
  name: String,
  password: String,
})

// Pre-save middleware
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    // Hash password
    this.password = await hashPassword(this.password)
  }
  next()
})

// Post-save middleware
UserSchema.post('save', function (doc, next) {
  console.log('User saved:', doc._id)
  next()
})

export const User = models.User || model('User', UserSchema)
```

## 📋 Common Patterns

### Pattern 1: Find All
```typescript
const users = await User.find({})
```
**When to use**: Get all documents

### Pattern 2: Find One
```typescript
const user = await User.findOne({ email })
```
**When to use**: Get single document

### Pattern 3: Create
```typescript
const user = await User.create({ email, name })
```
**When to use**: Create new document

### Pattern 4: Update
```typescript
const user = await User.findByIdAndUpdate(id, { name }, { new: true })
```
**When to use**: Update document

### Pattern 5: Delete
```typescript
await User.findByIdAndDelete(id)
```
**When to use**: Delete document

## ⚠️ Common Mistakes

### Mistake 1: Not Connecting
```typescript
// ❌ Wrong: Using model without connection
const users = await User.find({}) // Error
```
**Why**: Need to connect to MongoDB first.

```typescript
// ✅ Correct: Connect first
await connectDB()
const users = await User.find({})
```

### Mistake 2: Not Caching Connection
```typescript
// ❌ Wrong: Creating new connection each time
mongoose.connect(uri) // New connection each time
```
**Why**: Creates too many connections.

```typescript
// ✅ Correct: Cache connection
let cached = global.mongoose
if (!cached.conn) {
  cached.conn = await mongoose.connect(uri)
}
```

### Mistake 3: Not Handling Errors
```typescript
// ❌ Wrong: No error handling
const user = await User.create({...})
```
**Why**: Database operations can fail.

```typescript
// ✅ Correct: Handle errors
try {
  const user = await User.create({...})
} catch (error) {
  // Handle error
}
```

## ✨ Best Practices

1. **Cache connection**: Reuse MongoDB connection
2. **Use schemas**: Define schemas for validation
3. **Handle errors**: Always handle database errors
4. **Use indexes**: Add indexes for frequently queried fields
5. **Validate data**: Use schema validation
6. **Type safety**: Use TypeScript with Mongoose

## 🔗 Related Concepts

- [Data Fetching](../05-data-fetching/README.md) - Data fetching patterns
- [API Routes](../06-api-routes/README.md) - API endpoints

## 📚 Resources

### Official Documentation
- [Mongoose](https://mongoosejs.com)

## 🧪 Practice Exercises

### Exercise 1: Basic CRUD
**Difficulty**: Beginner  
**Goal**: Understand Mongoose basics  
**Instructions**:
1. Set up Mongoose
2. Create schema
3. Implement CRUD operations
4. Test all operations

### Exercise 2: Complex Queries
**Difficulty**: Intermediate  
**Goal**: Practice complex queries  
**Instructions**:
1. Create complex queries
2. Use relationships
3. Add middleware
4. Test performance

## 🎓 Key Takeaways

- Mongoose is ODM for MongoDB
- Schema-based modeling
- Built-in validation
- Query builder
- Middleware support
- TypeScript support

## ❓ FAQ

### Q: How do I install Mongoose?
**A**: Run `npm install mongoose`.

### Q: How do I connect to MongoDB?
**A**: Use `mongoose.connect(uri)` and cache the connection.

### Q: Can I use with TypeScript?
**A**: Yes, Mongoose has TypeScript support.

### Q: How do I define relationships?
**A**: Use `Schema.Types.ObjectId` with `ref` for relationships.

### Q: How do I validate data?
**A**: Use schema validation or custom validators.

---

**Next Steps**: 
- Review: [Prisma](./prisma.md) for SQL databases
- Practice: Set up Mongoose
- Build: Integrate MongoDB

