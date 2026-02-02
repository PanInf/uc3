import { Hono } from "hono";
import { getAllExpenses } from "./backend.js";
import { corse} from "hono/corse";

export const App = new Hono();
App.get('/expenses', (c) =>{
    return c.json(getAllExpenses())
});

export default App