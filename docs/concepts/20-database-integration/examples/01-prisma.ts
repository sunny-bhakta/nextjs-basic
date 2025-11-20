// Example 1: Prisma ORM
// Demonstrates using Prisma for database operations

// lib/prisma.ts - Prisma client setup
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// prisma/schema.prisma - Schema definition
/*
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        String   @id @default(uuid())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
*/

// app/api/users/route.ts - CRUD operations
import { prisma } from '@/lib/prisma'

export async function GET() {
  const users = await prisma.user.findMany({
    include: {
      posts: true,
    },
  })
  
  return Response.json(users)
}

export async function POST(request: Request) {
  const { email, name } = await request.json()
  
  const user = await prisma.user.create({
    data: {
      email,
      name,
    },
  })
  
  return Response.json(user)
}

// app/api/users/[id]/route.ts - Update and delete
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: { posts: true },
  })
  
  if (!user) {
    return Response.json({ error: 'User not found' }, { status: 404 })
  }
  
  return Response.json(user)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { email, name } = await request.json()
  
  const user = await prisma.user.update({
    where: { id: params.id },
    data: { email, name },
  })
  
  return Response.json(user)
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await prisma.user.delete({
    where: { id: params.id },
  })
  
  return Response.json({ success: true })
}

// app/actions/user-actions.ts - Server actions
'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createUser(formData: FormData) {
  const email = formData.get('email') as string
  const name = formData.get('name') as string
  
  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    })
    
    revalidatePath('/users')
    return { success: true, user }
  } catch (error) {
    return { success: false, error: 'Failed to create user' }
  }
}

