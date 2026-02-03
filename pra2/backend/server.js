import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { getAllExpenses } from './backend.js'

export const App = new Hono();

App.use('*', cors())
App.get('/expenses', (c) =>{
    return c.json(getAllExpenses())
});



export default App