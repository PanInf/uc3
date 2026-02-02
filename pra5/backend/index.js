import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { getAllExpenses } from './database.js'

const app = new Hono()

app.get('/expanses', (c) => {
  return c.json(getAllExpenses())
})

serve({
  fetch: app.fetch,
  port: 3005
})
