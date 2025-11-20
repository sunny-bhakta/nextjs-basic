// Example 2: Mongoose (MongoDB)
// Demonstrates using Mongoose for MongoDB operations

// lib/mongodb.ts - MongoDB connection
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

// models/User.ts - User model
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

// models/Post.ts - Post model with relationship
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

// app/api/users/route.ts - CRUD operations
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

// app/api/posts/route.ts - Posts with populate
import connectDB from '@/lib/mongodb'
import { Post } from '@/models/Post'

export async function GET() {
  await connectDB()
  
  const posts = await Post.find({}).populate('author')
  
  return Response.json(posts)
}

export async function POST(request: Request) {
  await connectDB()
  
  const { title, content, authorId } = await request.json()
  
  const post = await Post.create({
    title,
    content,
    author: authorId,
  })
  
  return Response.json(post)
}

