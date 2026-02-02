import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()

const dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(dirname, '../database', process.env.DB_NAME)
const db = new Database(dbPath)

db.exec(`
    CREATE TABLE Expenses (
    ExpenseID INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER NOT NULL,
    Name TEXT,
    Description TEXT,
    Amount REAL)
    `)

db.exec(`
    INSERT INTO Expenses (category_id, Name, Description, Amount)
    VALUES (1, 'Kawa', 'Poranna kawa na mieście', 15.50);
    `)

db.exec(`
    INSERT INTO Expenses (category_id, Name, Description, Amount)
    VALUES (2, 'Obiad', 'Lunch w pracy', 32.00);
    `)