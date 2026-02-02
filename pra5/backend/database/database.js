import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()

const dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(dirname, '../database', process.env.DB_NAME)

const db = new Database(dbPath)

db.exec(`
    CREATE TABLE IF NOT EXISTS Expenses (
        ExpenseID INTEGER PRIMARY KEY AUTOINCREMENT,
        category_id INTEGER NOT NULL,
        Name TEXT,
        Description TEXT,
        Ammount REAL,
        Date DATE
    )
`)

const insertExpense = db.prepare(`
    INSERT INTO Expenses (category_id, Name, Description, Ammount, Date)
    VALUES (?, ?, ?, ?, ?)
`)

insertExpense.run(1, 'Zakupy', 'Jedzenie', 300.00, '2026-01-10')
insertExpense.run(2, 'Transport', 'Bilet miesięczny', 99.00, '2026-01-05')

function getAllExpenses() {
    const sum = db.prepare('SELECT * FROM Expenses')
    return sum.all()
}

const expenses = getAllExpenses()
console.log(expenses)

db.close()
