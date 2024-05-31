import {
  pgTable,
  varchar,
  uuid,
  integer,
  pgEnum,
  index,
  uniqueIndex,
  unique,
  boolean,
  real,
  timestamp,
  primaryKey,
} from 'drizzle-orm/pg-core'

export const UserRole = pgEnum('userRole', ['ADMIN', 'BASIC'])

export const UserTable = pgTable(
  'user',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    age: integer('age').notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    role: UserRole('userRole').default('BASIC').notNull(),
  },
  (table) => {
    return {
      emailIndex: uniqueIndex('emailIndex').on(table.email),
      uniqueNameAndAge: unique('uniqueNameAndAge').on(table.name, table.age),
    }
  },
)

export const UserPreferenceTable = pgTable('userPreferences', {
  id: uuid('id').primaryKey().defaultRandom(),
  emailUpdates: boolean('emailUpdates').notNull().default(false),
  //foreign key
  userId: uuid('userId')
    .references(() => UserTable.id, { onDelete: 'cascade' }) //you know this haha
    .notNull(),
})

//one to many rel
export const PostTable = pgTable('post', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  averageRating: real('averageRating').notNull().default(0),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
  //foreignkey
  authorId: uuid('id')
    .references(() => UserTable.id)
    .notNull(),
})

//many to many rel
export const CategoryTable = pgTable('category', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
})

//join table in sql
export const PostCategoryTable = pgTable(
  'postCategory',
  {
    postId: uuid('postId')
      .references(() => PostTable.id)
      .notNull(),
    categoryId: uuid('categoryId')
      .references(() => CategoryTable.id)
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.postId, table.categoryId] }),
    }
  },
)
