import {hono} from 'hono'
import { getAllExpanses } from './database'
const app = new Hono()
app.get('/expenses', (c) => {
    return c.json(getAllExpanses())
})
