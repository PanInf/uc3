import { Hono } from "hono";
import { getAllExpenses } from "./backend.js";

export const App = new Hono();
App.get('/expenses', (c) =>{
    return c.json(getAllExpenses())
});

export default App