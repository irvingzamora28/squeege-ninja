import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

const dbPath = path.resolve(process.cwd(), 'database/allset.sqlite')
const schemaPath = path.resolve(process.cwd(), 'database/schema.sql')

// Run schema if DB is new or on every startup (idempotent)
const schema = fs.readFileSync(schemaPath, 'utf-8')
const db = new Database(dbPath)
db.exec(schema)

export default db
