import { serve } from "@hono/node-server";
import {app} from "./server.js";
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config()

app.use(cors({
    origin: 'http://localhost:3000'
}))

serve({ 
    fetch: app.fetch, 
    port: process.env.PORT
})

// GET
app.get('/expenses', (req, res) => {
    res.json(db.prepare('SELECT * FROM Expenses').all())
})

// POST
app.post('/expenses', (req, res) => {
    const { category_id, Name, Description, Amount } = req.body
    db.prepare(`
        INSERT INTO Expenses (category_id, Name, Description, Amount)
        VALUES (?, ?, ?, ?)
    `).run(category_id, Name, Description, Amount)

    res.json({ message: 'Dodano' })
})

// PUT
app.put('/expenses/:id', (req, res) => {
    const { id } = req.params
    const { Name, Description, Amount } = req.body

    db.prepare(`
        UPDATE Expenses
        SET Name = ?, Description = ?, Amount = ?
        WHERE ExpenseID = ?
    `).run(Name, Description, Amount, id)

    res.json({ message: 'Zaktualizowano' })
})

// DELETE
app.delete('/expenses/:id', (req, res) => {
    db.prepare('DELETE FROM Expenses WHERE ExpenseID = ?')
      .run(req.params.id)

    res.json({ message: 'Usunięto' })
})

app.listen(3001, () => console.log('🚀 Backend: http://localhost:3001'))