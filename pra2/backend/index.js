import { serve } from "@hono/node-server";
import app from './server.js';
import dotenv from 'dotenv';

dotenv.config();

serve({
    fetch: app.fetch,
    port: Number(process.env.PORT) || 3002
});
