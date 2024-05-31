import 'dotenv/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

async function main() {
  console.log('Connecting to database...')
  const sql = postgres(process.env.DATABASE_URL as string, { max: 1 })
  const db = drizzle(sql)
  console.log('Running migrations...')
  await migrate(db, { migrationsFolder: './src/drizzle/migrations' })
  console.log('Migrations completed. Closing database connection...')
  await sql.end()
  console.log('Done.')
}

main().catch((error) => {
  console.error('An error occurred:', error)
})
