const { Hono } = require('hono');
const Database = require('better-sqlite3');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const dbPath = path.join(__dirname, '../database', process.env.DB_NAME || 'Expanses.db');
const db = new Database(dbPath);

const app = new Hono();

app.use('*', (c, next) => {
  c.header('Access-Control-Allow-Origin', '*');
  c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  c.header('Access-Control-Allow-Headers', 'Content-Type');
  if (c.req.method === 'OPTIONS') {
    return c.body(null, 204);
  }
  return next();
});

app.get('/expenses', (c) => {
  const stmt = db.prepare('SELECT * FROM Expenses ORDER BY Date DESC');
  const expenses = stmt.all();
  return c.json(expenses);
});

app.post('/expenses', async (c) => {
  const body = await c.req.json();
  const { category_id, Name, Description, Amount, Date } = body;

  const stmt = db.prepare(`
    INSERT INTO Expenses (category_id, Name, Description, Amount, Date)
    VALUES (?, ?, ?, ?, ?)
  `);
  const info = stmt.run(category_id, Name, Description, Amount, Date);

  return c.json({ message: 'Dodano wydatek', id: info.lastInsertRowid }, 201);
});

app.put('/expenses/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const { category_id, Name, Description, Amount, Date } = body;

  const stmt = db.prepare(`
    UPDATE Expenses SET
      category_id = COALESCE(?, category_id),
      Name = COALESCE(?, Name),
      Description = COALESCE(?, Description),
      Amount = COALESCE(?, Amount),
      Date = COALESCE(?, Date)
    WHERE ExpenseID = ?
  `);
  const info = stmt.run(category_id, Name, Description, Amount, Date, id);

  if (info.changes === 0) {
    return c.json({ error: 'Nie znaleziono wydatku' }, 404);
  }

  return c.json({ message: 'Zaktualizowano wydatek' }, 200);
});

app.delete('/expenses/:id', (c) => {
  const id = c.req.param('id');

  const stmt = db.prepare('DELETE FROM Expenses WHERE ExpenseID = ?');
  const info = stmt.run(id);

  if (info.changes === 0) {
    return c.json({ error: 'Nie znaleziono wydatku' }, 404);
  }

  return c.json({ message: 'Usunięto wydatek' }, 200);
});

module.exports = app;