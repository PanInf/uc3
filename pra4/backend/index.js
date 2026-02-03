const { serve } = require('@hono/node-server');
const app = require('./server.js');
const dotenv = require('dotenv');

dotenv.config();

const PORT = Number(process.env.PORT) || 3004;

serve({
  fetch: app.fetch,
  port: PORT
});

console.log(`Serwer wystartował → http://localhost:${PORT}/expenses`);