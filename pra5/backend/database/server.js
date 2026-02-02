import { Hono } from 'hono'
import { getAllExpenses } from './db.js'

const app = new Hono()

app.get('/expenses', (c) => {
  return c.json(getAllExpenses())
})