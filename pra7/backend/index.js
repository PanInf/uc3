import { Hono } from 'hono'
import { getAllExpenses } from './database/database.js'
import dotenv from 'dotenv'
dotenv.config()
const app = new Hono()
app.get('/expenses', (c) => {
  const expenses = getAllExpenses()
  return c.json(expenses)
})
const port = process.env.PORT || 3001
console.log(`Serwer działa na http://localhost:${port}`)
export default {
  port,
  fetch: app.fetch
}