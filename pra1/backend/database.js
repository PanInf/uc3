import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import Database from 'better-sqlite3'
dotenv.config()
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, process.env.DB_NAME)
const ensureTableAndSeed = () => {
  const db = new Database(dbPath)
  db.exec(`
    CREATE TABLE IF NOT EXISTS Expenses (
      ExpenseID INTEGER PRIMARY KEY,
      category_id INTEGER,
      Name TEXT,
      Description TEXT,
      Amount REAL,
      Date TEXT
    )
  `)
  const count = db.prepare('SELECT COUNT(*) AS c FROM Expenses').get().c
  if (count === 0) {
    db.exec(`
      INSERT INTO Expenses (category_id, Name, Description, Amount, Date) VALUES
      (1, 'Zakup książki', 'Ksiazka o programowaniu', 120.50, '2026-02-03'),
      (2, 'Obiad', 'Obiad w restauracji', 45.00, '2026-02-03')
    `)
  }
  db.close()
}
export const getAllExpenses = () => {
  ensureTableAndSeed()
  const db = new Database(dbPath)
  const expenses = db.prepare('SELECT * FROM Expenses').all()
  db.close()
  return expenses
}
export const insertExpense = (data) => {
  const db = new Database(dbPath)
  const stmt = db.prepare('INSERT INTO Expenses (category_id, Name, Description, Amount, Date) VALUES (?, ?, ?, ?, ?)')
  const info = stmt.run(data.category_id, data.Name, data.Description, data.Amount, data.Date)
  const newExpense = db.prepare('SELECT * FROM Expenses WHERE ExpenseID=?').get(info.lastInsertRowid)
  db.close()
  return newExpense
}
export const updateExpense = (id, data) => {
  const db = new Database(dbPath)
  db.prepare('UPDATE Expenses SET category_id=?, Name=?, Description=?, Amount=?, Date=? WHERE ExpenseID=?')
    .run(data.category_id, data.Name, data.Description, data.Amount, data.Date, id)
  const updated = db.prepare('SELECT * FROM Expenses WHERE ExpenseID=?').get(id)
  db.close()
  return updated
}
export const deleteExpense = (id) => {
  const db = new Database(dbPath)
  const info = db.prepare('DELETE FROM Expenses WHERE ExpenseID=?').run(id)
  db.close()
  return info.changes > 0
}
