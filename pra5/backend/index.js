import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { getAllExpenses } from './database.js'
import { cors } from 'hono/cors'
import dotenv from 'dotenv'
dotenv.config()


const app = new Hono()

app.use('*', cors({ origin: 'http://localhost:5173' }))

app.get('/expenses', (c) => {
  const expenses = getAllExpenses()
  return c.json(expenses)
})

serve({
  fetch: app.fetch,
  port: 3005
})
