import { serve } from "@hono/node-server";
import app from "./server.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = Number(process.env.PORT) || 3004;

serve({
  fetch: app.fetch,
  port: PORT,
});

console.log(`Serwer wystartował → http://localhost:${PORT}/expenses`);