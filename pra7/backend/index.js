import express from 'express'
import cors from 'cors'
import { getAllExpenses } from './database/database.js'

const app = express()
const PORT = 3001

app.use(cors())

app.get('/expenses', (req, res) => {
  res.json(getAllExpenses())
})

app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`)
})
