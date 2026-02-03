import { Hono } from 'hono'
import { getAllExpenses, insertExpense, updateExpense, deleteExpense } from './database.js'
import http from 'http'
import dotenv from 'dotenv'
dotenv.config()
const app = new Hono()
app.use('*', async (c, next) => {
  c.header('Access-Control-Allow-Origin', '*')
  c.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  c.header('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  if (c.req.method === 'OPTIONS') return c.text('', 204)
  await next()
})
app.get('/', (c) => c.text('Backend działa!'))
app.get('/expenses', (c) => c.json(getAllExpenses()))
app.post('/expenses', async (c) => c.json(insertExpense(await c.req.json())))
app.put('/expenses/:id', async (c) => c.json(updateExpense(Number(c.req.param('id')), await c.req.json())))
app.delete('/expenses/:id', (c) => c.json({ success: deleteExpense(Number(c.req.param('id'))) }))
const PORT = process.env.PORT || 3001
http.createServer(async (req, res) => {
  try {
    const body = ['POST','PUT','PATCH'].includes(req.method) ? req : null
    const r = await app.fetch(new Request(`http://localhost:${PORT}${req.url}`, {
      method: req.method,
      headers: req.headers,
      body
    }))
    r.headers.forEach((v,k)=>res.setHeader(k,v))
    res.writeHead(r.status)
    res.end(Buffer.from(await r.arrayBuffer()))
  } catch(e){
    res.writeHead(500)
    res.end('Server error')
    console.error(e)
  }
}).listen(PORT,()=>console.log(`Server running on http://localhost:${PORT}`))
