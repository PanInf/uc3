import express from 'express';
const app = express();
app.get('/expanses', (req, res) => {
  res.json([
    { id: 1, name: "Chleb", price: 5 },
    { id: 2, name: "Mleko", price: 3 }
  ]);
});
app.listen(3001, () => console.log('Server running on http://localhost:3001'));
