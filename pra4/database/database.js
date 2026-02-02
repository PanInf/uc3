import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(dirname, '../database', process.env.DB_NAME)

const db = new Database(dbPath)

db.exec(`
  CREATE TABLE IF NOT EXISTS Expenses (
    ExpenseID     INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id   INTEGER NOT NULL,
    Name          VARCHAR(50),
    Description   VARCHAR(200),
    Ammount       REAL,
    Date          DATE
  )
`)

const insert = db.prepare(`
  INSERT INTO Expenses (category_id, Name, Description, Ammount, Date)
  VALUES (?, ?, ?, ?, ?)
`)

insert.run(1, 'Zakupy', 'Biedronka', 127.50, '2025-01-15')
insert.run(2, 'Paliwo', 'Stacja BP', 312.00, '2025-01-20')

function pobierzWydatki() {
  const stmt = db.prepare('SELECT * FROM Expenses ORDER BY Date DESC')
  return stmt.all()
}

console.log('Wydatki w bazie:')
console.log(pobierzWydatki())

db.close()