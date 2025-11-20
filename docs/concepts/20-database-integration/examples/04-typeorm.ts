// Example 4: TypeORM
// Demonstrates using TypeORM for database operations

// entities/User.ts - User entity
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import { Post } from './Post'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @Column({ nullable: true })
  name: string

  @OneToMany(() => Post, post => post.author)
  posts: Post[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

// entities/Post.ts - Post entity
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm'
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

  @CreateDateColumn()
  createdAt: Date
}

// lib/data-source.ts - Data source setup
import { DataSource } from 'typeorm'
import { User } from '@/entities/User'
import { Post } from '@/entities/Post'

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User, Post],
  synchronize: false,
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

// app/api/users/route.ts - CRUD operations
import { initializeDataSource } from '@/lib/data-source'
import { User } from '@/entities/User'

export async function GET() {
  const dataSource = await initializeDataSource()
  const userRepository = dataSource.getRepository(User)
  
  const users = await userRepository.find({
    relations: ['posts'],
  })
  
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

// app/api/posts/route.ts - Query builder
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

