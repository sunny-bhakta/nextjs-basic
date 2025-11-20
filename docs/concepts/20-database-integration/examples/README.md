# Database Integration Examples

This directory contains practical code examples demonstrating database integration in Next.js.

## Examples

### 1. Prisma (`01-prisma.ts`)
Demonstrates Prisma ORM:
- Prisma client setup
- Schema definition
- CRUD operations
- Server actions
- Relationships

### 2. Mongoose (`02-mongoose.ts`)
Shows Mongoose for MongoDB:
- MongoDB connection
- Schema definition
- CRUD operations
- Relationships with populate
- Model creation

### 3. SQL Databases (`03-sql-databases.ts`)
Demonstrates raw SQL:
- PostgreSQL connection
- MySQL connection
- Parameterized queries
- Transactions
- Connection pooling

### 4. TypeORM (`04-typeorm.ts`)
Shows TypeORM:
- Entity definition
- Data source setup
- CRUD operations
- Query builder
- Relationships

## How to Use

1. **Install dependencies**:
   - Prisma: `npm install prisma @prisma/client`
   - Mongoose: `npm install mongoose`
   - PostgreSQL: `npm install pg`
   - MySQL: `npm install mysql2`
   - TypeORM: `npm install typeorm reflect-metadata`

2. **Set up environment variables**:
   ```bash
   DATABASE_URL=your-database-url
   MONGODB_URI=your-mongodb-uri
   ```

3. **Copy code** from example files
4. **Create corresponding files** in your app
5. **Run migrations** (for Prisma/TypeORM)
6. **Test database operations**

## Key Concepts

- Prisma: Type-safe ORM
- Mongoose: MongoDB ODM
- Raw SQL: Direct database access
- TypeORM: Full-featured ORM
- Connection pooling: Reuse connections
- Transactions: Atomic operations

## Next Steps

- Review detailed guides in parent directory
- Choose appropriate solution
- Practice database integration

