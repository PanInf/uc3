import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import Database from 'better-sqlite3';
const __dirName = path.dirname(fileURLToPath(import.meta.url));
dotenv.config();
const dbPath = path.join(__dirName , '../database' , process.env.DB_NAME);
const db = new Database(dbPath);
db.exec(`
CREATE TABLE IF NOT EXISTS Expenses (
    ExpenseID INTEGER PRIMARY KEY,
    category_id INTEGER NOT NULL,
    Name VARCHAR(50),
    Description VARCHAR(200),
    Amount REAL,
    Date DATE
)
`);
db.exec(`
INSERT INTO Expenses (category_id, Name, Description, Amount, Date) VALUES
(1, 'Zakup ksiazki', 'Ksiazka', 120.50, '2026-02-02'),
(2, 'Obiad', 'Obiad w restauracji', 45.00, '2026-02-02')
`);
const expenses = db.prepare('SELECT * FROM Expenses').all();
console.log(expenses);
db.close()