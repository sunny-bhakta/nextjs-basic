# Database Migrations

> **Category**: Intermediate | **Related Concepts**: [Prisma](./prisma.md), [TypeORM](./typeorm.md)  
> **Last Updated**: 2024

## 📖 Overview

Database migrations manage schema changes over time. They allow you to version control your database schema and apply changes safely across environments.

**Key Points:**
- Version control for schema
- Safe schema changes
- Rollback capability
- Environment consistency
- Team collaboration
- Production safety

## 🎯 When to Use

- **Schema Changes**: When changing database schema
- **Version Control**: When tracking schema changes
- **Team Work**: When working in a team
- **Production**: When deploying to production
- **Rollback**: When you need to rollback changes
- **Consistency**: When keeping environments in sync

## 💻 Basic Example

### Prisma Migrations

```bash
# Create migration
npx prisma migrate dev --name add_user_table

# Apply migrations
npx prisma migrate deploy

# Reset database
npx prisma migrate reset
```

### Migration File

```prisma
// prisma/migrations/20240101000000_add_user_table/migration.sql
-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
```

### Schema Update

```prisma
// prisma/schema.prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  age       Int?     // New field
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🔧 Advanced Example

### Custom Migration

```sql
-- prisma/migrations/20240102000000_add_age_to_user/migration.sql
-- AlterTable
ALTER TABLE "User" ADD COLUMN "age" INTEGER;

-- Update existing records
UPDATE "User" SET "age" = 25 WHERE "age" IS NULL;
```

### Migration with Data

```typescript
// prisma/migrations/20240103000000_seed_data/migration.sql
-- Seed initial data
INSERT INTO "User" ("id", "email", "name", "createdAt", "updatedAt")
VALUES 
  ('1', 'user1@example.com', 'User 1', NOW(), NOW()),
  ('2', 'user2@example.com', 'User 2', NOW(), NOW());
```

### Rollback Strategy

```typescript
// lib/migrations.ts
import { prisma } from './prisma'

export async function rollbackMigration(migrationName: string) {
  // Custom rollback logic
  // This is a simplified example
  // In production, use proper migration tools
}
```

## 📋 Common Patterns

### Pattern 1: Add Column
```sql
ALTER TABLE "User" ADD COLUMN "age" INTEGER;
```
**When to use**: Adding new field

### Pattern 2: Remove Column
```sql
ALTER TABLE "User" DROP COLUMN "age";
```
**When to use**: Removing field

### Pattern 3: Rename Column
```sql
ALTER TABLE "User" RENAME COLUMN "name" TO "fullName";
```
**When to use**: Renaming field

### Pattern 4: Add Index
```sql
CREATE INDEX "User_email_idx" ON "User"("email");
```
**When to use**: Adding index for performance

## ⚠️ Common Mistakes

### Mistake 1: Not Testing Migrations
```bash
# ❌ Wrong: Deploying without testing
npx prisma migrate deploy # In production without testing
```
**Why**: Migrations can fail or cause data loss.

```bash
# ✅ Correct: Test first
npx prisma migrate dev # Test in development
npx prisma migrate deploy # Then deploy
```

### Mistake 2: Not Backing Up
```bash
# ❌ Wrong: No backup before migration
npx prisma migrate deploy
```
**Why**: Always backup before migrations.

```bash
# ✅ Correct: Backup first
# Backup database
npx prisma migrate deploy
```

### Mistake 3: Breaking Changes
```sql
-- ❌ Wrong: Breaking change without migration path
ALTER TABLE "User" DROP COLUMN "email";
```
**Why**: Need migration path for breaking changes.

```sql
-- ✅ Correct: Gradual migration
-- 1. Add new column
ALTER TABLE "User" ADD COLUMN "newEmail" TEXT;
-- 2. Migrate data
UPDATE "User" SET "newEmail" = "email";
-- 3. Remove old column (in separate migration)
ALTER TABLE "User" DROP COLUMN "email";
```

## ✨ Best Practices

1. **Test migrations**: Always test in development first
2. **Backup data**: Backup before production migrations
3. **Small changes**: Keep migrations small and focused
4. **Review migrations**: Review generated SQL
5. **Version control**: Commit migration files
6. **Documentation**: Document complex migrations

## 🔗 Related Concepts

- [Prisma](./prisma.md) - Prisma migrations
- [TypeORM](./typeorm.md) - TypeORM migrations

## 📚 Resources

### Official Documentation
- [Prisma Migrations](https://www.prisma.io/docs/concepts/components/prisma-migrate)

## 🧪 Practice Exercises

### Exercise 1: Basic Migrations
**Difficulty**: Beginner  
**Goal**: Understand migrations  
**Instructions**:
1. Create initial migration
2. Add new field
3. Test migration
4. Rollback if needed

### Exercise 2: Complex Migration
**Difficulty**: Intermediate  
**Goal**: Practice complex migrations  
**Instructions**:
1. Create complex schema change
2. Handle data migration
3. Test thoroughly
4. Deploy safely

## 🎓 Key Takeaways

- Migrations version control schema
- Test migrations before deploying
- Always backup before migrations
- Keep migrations small
- Review generated SQL
- Document complex changes

## ❓ FAQ

### Q: How do I create a migration?
**A**: Run `npx prisma migrate dev --name migration_name`.

### Q: How do I apply migrations?
**A**: Run `npx prisma migrate deploy` in production.

### Q: Can I rollback migrations?
**A**: Yes, but it depends on your migration tool. Prisma doesn't support automatic rollback.

### Q: How do I handle data migrations?
**A**: Write custom SQL in migration files or use migration scripts.

### Q: Should I commit migration files?
**A**: Yes, always commit migration files to version control.

---

**Next Steps**: 
- Review: [Prisma](./prisma.md) for Prisma migrations
- Practice: Create and test migrations
- Build: Manage schema changes

