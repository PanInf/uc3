
import { Hono } from "hono";
import { cors } from 'hono/cors';
import DB from "./database.js";
import { getAllExpenses } from "./database.js";

const App = new Hono();

App.use('*', cors({ origin: 'http://localhost:5173' }));

App.get('/expenses',(c) => {
    return c.json(getAllExpenses())
})

App.post('/expenses', async (c) => {
  const { Name, Description, Amount, CategoryID } = await c.req.json();
  const info = DB.addExpense(Name, Description, Amount, CategoryID);
  
  return c.json({ ExpenseID: info.lastInsertRowid, Name, Description, Amount, CategoryID });
});

App.delete('/expenses/:id', (c) => {
  const id = c.req.param('id');
  DB.deleteExpense(id);
  return c.json({ message: 'Usunięto z bazy SQL' });
});

App.put('/expenses/:id', async (c) => {
  const id = c.req.param('id');
  const { Name, Description, Amount, CategoryID } = await c.req.json();
  
  DB.updateExpense(id, Name, Description, Amount, CategoryID);
  
  return c.json({ message: 'Zaktualizowano pomyślnie' });
});

export default App