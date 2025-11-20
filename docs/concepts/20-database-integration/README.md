# Database Integration

> **Category**: Intermediate | **Priority**: 🔴 High | **Difficulty**: Intermediate  
> **Related Concepts**: [Data Fetching](../05-data-fetching/README.md), [API Routes](../06-api-routes/README.md)  
> **Status**: ⏳ Not Started

## Overview

Integrating databases with Next.js applications using ORMs and database clients.

## Key Topics

- [Prisma ORM](./prisma.md) - Popular TypeScript ORM
- [TypeORM](./typeorm.md) - Full-featured ORM
- [Mongoose](./mongoose.md) - MongoDB ODM
- [SQL Databases](./sql-databases.md) - PostgreSQL, MySQL
- [Database Migrations](./migrations.md) - Managing schema changes

## Quick Comparison

| Solution | Database | Type Safety | Complexity | Use Case |
|----------|----------|-------------|------------|----------|
| Prisma | PostgreSQL, MySQL, SQLite, MongoDB | Excellent | Low | Modern apps |
| TypeORM | Multiple SQL | Good | Medium | Full-featured ORM |
| Mongoose | MongoDB | Good | Low | MongoDB apps |
| Raw SQL | PostgreSQL, MySQL | Manual | Low | Complex queries |

## Quick Start

### Prisma
```typescript
const user = await prisma.user.create({
  data: { email, name }
})
```

### Mongoose
```typescript
const user = await User.create({ email, name })
```

### Raw SQL
```typescript
const result = await pool.query(
  'INSERT INTO users (email, name) VALUES ($1, $2)',
  [email, name]
)
```

## Learning Path

1. Start with [Prisma](./prisma.md) for modern apps
2. Learn [SQL Databases](./sql-databases.md) for raw SQL
3. Explore [Mongoose](./mongoose.md) for MongoDB
4. Consider [TypeORM](./typeorm.md) for full-featured ORM
5. Understand [Migrations](./migrations.md) for schema management

## Detailed Guides

- **[Prisma ORM](./prisma.md)** - Type-safe ORM
- **[TypeORM](./typeorm.md)** - Full-featured ORM
- **[Mongoose](./mongoose.md)** - MongoDB ODM
- **[SQL Databases](./sql-databases.md)** - PostgreSQL, MySQL
- **[Database Migrations](./migrations.md)** - Schema management

## Examples

See the [examples](./examples/) folder for working code samples:

- **[Prisma](./examples/01-prisma.ts)** - Prisma ORM examples
- **[Mongoose](./examples/02-mongoose.ts)** - Mongoose examples
- **[SQL Databases](./examples/03-sql-databases.ts)** - Raw SQL examples
- **[TypeORM](./examples/04-typeorm.ts)** - TypeORM examples

See [examples/README.md](./examples/README.md) for detailed descriptions and usage instructions.

## Resources

- [Database Integration](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Prisma](https://www.prisma.io)
- [TypeORM](https://typeorm.io)
- [Mongoose](https://mongoosejs.com)

---

**Previous**: [File Uploads](../19-file-uploads/README.md) | **Next**: [Caching](../21-caching/README.md)

