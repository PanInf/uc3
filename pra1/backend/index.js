import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { getAllExpenses } from "./database.js";
import dotenv from 'dotenv';
dotenv.config()
const app = new Hono();
app.get('/expenses',(c) => {
    return c.json(getAllExpenses())
})
serve({ 
    fetch: app.fetch, 
    port: process.env.PORT
})