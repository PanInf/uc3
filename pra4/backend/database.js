const Database = require('better-sqlite3');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const dbPath = path.join(__dirname, '../database', process.env.DB_NAME || 'Expanses.db');

console.log('Ścieżka do bazy danych:', dbPath);

const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS Expenses (
    ExpenseID     INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id   INTEGER NOT NULL,
    Name          TEXT,
    Description   TEXT,
    Amount        REAL,
    Date          TEXT
  )
`);

const checkCount = db.prepare('SELECT COUNT(*) as count FROM Expenses').get().count;

if (checkCount === 0) {
  const insert = db.prepare(`
    INSERT INTO Expenses (category_id, Name, Description, Amount, Date)
    VALUES (?, ?, ?, ?, ?)
  `);

  insert.run(1, 'Kawa', 'Poranna kawa na mieście', 15.50, '2025-02-01');
  insert.run(2, 'Obiad', 'Lunch w pracy', 32.00, '2025-02-02');

  console.log('Dodano przykładowe wydatki');
} else {
  console.log('Dane już istnieją – pomijam dodawanie');
}

function getAllExpenses() {
  const stmt = db.prepare('SELECT * FROM Expenses ORDER BY Date DESC');
  return stmt.all();
}

module.exports = {
  getAllExpenses
};

console.log('\nAktualne dane w bazie:');
console.log(getAllExpenses());