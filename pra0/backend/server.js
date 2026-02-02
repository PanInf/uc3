import { Hono } from 'hono'
import { getAllExpanses } from './database.js'

const app = new Hono()

app.get('/expenses', (c) => {
  return c.json(getAllExpanses())
})

export default app