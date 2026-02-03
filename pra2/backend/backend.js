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

// db.exec(`
//   INSERT INTO Expenses (CategoryID, Name, Description, Amount, Date)
//   VALUES (1, 'Biedronka', 'Zakupy', 25, '2026-02-02')
// `);

export function getAllExpenses() {
  return db.prepare('SELECT * FROM Expenses').all()
}