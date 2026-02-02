import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(dirname, '../database', process.env.DB_NAME)

const db = new Database(dbPath)
