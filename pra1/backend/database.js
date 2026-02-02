import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
const dirName = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(dirName , '../database' , process.env.DB_NAME);
const db = new Database(dbPath);
db.exec(`
CREATE TABLE Expenses (
    ExpenseID INTEGER PRIMARY KEY,
    category_id INTEGER NOT NULL,
    Name VARCHAR(50),
    Description VARCHAR(200),
    Amount REAL,
    Date DATE
)
`);
db.exec(`
INSERT INTO Expenses (Name, Description, Amount, Date) VALUES
('Zakup ksiazki', 'Ksiazka', 120.50, '2026-02-02'),
('Obiad', 'Obiad w restauracji', 45.00, '2026-02-02')
`);
const expenses = db.prepare('SELECT * FROM Exprenses').all();
console.log(expenses);
db.close()