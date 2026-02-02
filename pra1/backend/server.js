import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { getAllExpenses } from "./database.js"; 
const app = new Hono();
app.get('/expenses', (c) => {
  return c.json(getAllExpenses());
});
app.get('/', (c) => {
  return c.html(`
    <h1>Serwer działa</h1>
  `);
});
serve({
  fetch: app.fetch,
  port: 3001
});
console.log("Server running in http://localhost:3001");
