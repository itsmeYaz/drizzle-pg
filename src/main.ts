import 'dotenv/config'
import { db } from './drizzle/db'
import { UserPreferenceTable, UserTable } from './drizzle/schema'
import { asc, desc, eq, sql } from 'drizzle-orm'

async function main() {
  //insert data in user preference
  //   await db.insert(UserPreferenceTable).values({
  //     emailUpdates: true,
  //     userId: 'e130aba2-bd72-414c-a994-e58ff6e08fc4',
  //   })

  const users = await db.query.UserTable.findMany({
    columns: {
      id: true,
      name: true,
      age: true,
    },
    //  orderBy: desc(UserTable.age),
    //search functionality finding the age with 100
    //  where: (table, funcs) =>
    //    funcs.eq(table.id, 'e130aba2-bd72-414c-a994-e58ff6e08fc4'),
    //ah basta hahaha
    //  with: { preferences: true },
    //nested response
    //  with: {
    //    posts: {
    //      with: {
    //        postCategories: true,
    //      },
    //    },
    //  },
  })

  //   const usersPreference = await db.query.UserPreferenceTable.findMany({
  //     columns: {
  //       id: false,
  //       emailUpdates: true,
  //     },
  //     with: {
  //       user: {
  //         columns: { role: false, email: false, age: false, name: false },
  //       },
  //     },
  //   })
  console.log(users)
  //   console.log(usersPreference)
}

//Update
async function updateData() {
  await db
    .update(UserTable)
    .set({ name: 'Rimuru Tempest' })
    .where(eq(UserTable.id, '67982505-8d82-404d-81ba-8a495c7ae996'))
}

async function deleteData() {
  await db
    .delete(UserTable)
    .where(eq(UserTable.id, '67982505-8d82-404d-81ba-8a495c7ae996'))
}

main()
