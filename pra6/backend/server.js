import {Hono} from 'hono'
import {getAllExpenses} from './database.js'

const app = new Hono()

app.get('/expenses', (c) => {
    return c.json(getAllExpenses())
})

export default app