import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '../database', process.env.DB_NAME);


const db = new Database(dbPath);

db.exec(
    'CREATE TABLE IF NOT EXISTS Expenses (ExpenseID INTEGER PRIMARY KEY,CategoryID INTEGER,Name VARCHAR(50),Description VARCHAR(200),Amount REAL,Date TEXT)'
);

export function addExpense(data) {
  const stmt = db.prepare(
    'INSERT INTO Expenses (CategoryID, Name, Description, Amount, Date) VALUES (?, ?, ?, ?, ?)'
  );
  return stmt.run(data.CategoryID, data.Name, data.Description, data.Amount, data.Date);
}

export function deleteExpense(id) {
  const stmt = db.prepare('DELETE FROM Expenses WHERE ExpenseID = ?');
  return stmt.run(id);
}

export function updateExpense(id, data) {
  const stmt = db.prepare(
    'UPDATE Expenses SET CategoryID = ?, Name = ?, Description = ?, Amount = ?, Date = ? WHERE ExpenseID = ?'
  );
  return stmt.run(data.CategoryID, data.Name, data.Description, data.Amount, data.Date, id);
}

export function getAllExpenses() {
  return db.prepare('SELECT * FROM Expenses').all()
}