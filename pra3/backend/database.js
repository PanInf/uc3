import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DBpath = path.join(__dirname,"../database",process.env.DB_NAME)
console.log(DBpath)

const DB = new Database(DBpath)

DB.exec(
    `CREATE TABLE IF NOT EXISTS Expenses (
        ExpenseID INTEGER PRIMARY KEY ,
        CategoryID INTEGER,Name VARCHAR(50),
        Description VARCHAR(200),
        Amount REAL,
        Date TEXT
    )`
);

DB.exec(
    `INSERT INTO Expenses (ExpenseID,CategoryID,Name,Description,Amount,Date) 
        VALUES (1,1,'www','wwwwwwwwwwwww',2500,2023-01-22)`
);

DB.exec(
    `INSERT INTO Expenses (ExpenseID,CategoryID,Name,Description,Amount,Date) 
        VALUES (2,2,'ww1w','wwwwww2wwwwwww',2500,2023-01-22)`
);

// DB.each("SELECT * FROM Expenses", (err, row) => { console.log(row); });