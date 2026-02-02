import path from 'path'
import {fileURLToPath} from 'url'
import dotenv from 'dotenv'
import Database from 'better-sqlite3'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbpath = path.join(__dirname,"../database", process.env.DB_NAME)
const db = new Database(dbpath)

db.exec(
    `CREATE TABLE expenses (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER NOT NULL,
    amount      REAL NOT NULL, 
    description TEXT,
    expense_date DATE NOT NULL, 
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP)`
)

const insertExpense = `
    INSERT INTO expenses (category_id, amount, description, expense_date)
    VALUES (?, ?, ?, ?)
`;

db.run(insertExpense, [1, 50.25, 'Zakupy spożywcze', '2026-02-01']);
db.run(insertExpense, [2, 15.00, 'Bilet autobusowy', '2026-02-02']);

function getExpenses(callback) {
    const query = `SELECT * FROM expenses`;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            callback(err, null);
            return;
        }
        callback(null, rows);
    });
}

getExpenses((err, expenses) => {
    if (err) return;
    console.log('Wydatki:', expenses);
});