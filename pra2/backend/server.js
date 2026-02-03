import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { getAllExpenses } from './backend.js';
import { addExpense, deleteExpense, updateExpense } from './backend.js';

export const App = new Hono();

App.use('*', cors());
App.get('/expenses', (c) => {
  return c.json(getAllExpenses());
});

App.post('/expenses', (c) => {
  return c.req.json().then(data => {
    const result = addExpense(data);
    return c.json({ success: true, ExpenseID: result.lastInsertRowid });
  });
});

App.delete('/expenses/:id', (c) => {
  const id = c.req.param('id');
  const result = deleteExpense(id);
  return c.json({ success: result.changes > 0 });
});

App.put('/expenses/:id', (c) => {
  return c.req.json().then(data => {
    const id = c.req.param('id');
    const result = updateExpense(id, data);
    return c.json({ success: result.changes > 0 });
  });
});

export default App
