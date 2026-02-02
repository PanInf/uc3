
import { serve } from "@hono/node-server";
import App from "./server.js";
import dotenv from 'dotenv';

dotenv.config()

serve({ 
    fetch: App.fetch, 
    port: process.env.PORT
})