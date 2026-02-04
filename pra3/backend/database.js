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
        ExpenseID INTEGER PRIMARY KEY AUTOINCREMENT,
        CategoryID INTEGER,
        Name VARCHAR(50),
        Description VARCHAR(200),
        Amount REAL
    )`
);

const deleteExpense = (id) => {
  return DB.prepare('DELETE FROM Expenses WHERE ExpenseID = ?').run(id);
};

const addExpense = (name, description, amount, categoryID) => {
  return DB.prepare(
    'INSERT INTO Expenses (Name, Description, Amount, CategoryID) VALUES (?, ?, ?, ?)'
  ).run(name, description, amount, categoryID);
};

const updateExpense = (expenseID, name, description, amount, categoryID) => {
  return DB.prepare(
    'UPDATE Expenses SET Name = ?, Description = ?, Amount = ?, CategoryID = ? WHERE ExpenseID = ?'
  ).run(name, description,amount, categoryID, expenseID);
};

export const getAllExpenses = () => {
    return DB.prepare(
        'SELECT * FROM Expenses'
    ).all();
}

export default {addExpense, deleteExpense, updateExpense};