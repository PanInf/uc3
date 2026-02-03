import { useState, useEffect } from 'react'
type Expense = { ExpenseID: number; category_id: number; Name: string; Description: string; Amount: number; Date: string }
export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [name, setName] = useState(''); const [desc, setDesc] = useState(''); const [amount, setAmount] = useState(0); const [date, setDate] = useState('')
  useEffect(() => { fetch('http://localhost:3001/expenses').then(r => r.json()).then(setExpenses) }, [])
  const add = async () => {
    const res = await fetch('http://localhost:3001/expenses', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Name: name, Description: desc, Amount: amount, Date: date, category_id: 1 })
    })
    const data = await res.json(); setExpenses(prev => [...prev, data]); setName(''); setDesc(''); setAmount(0); setDate('')
  }
  const remove = async (id: number) => {
    await fetch(`http://localhost:3001/expenses/${id}`, { method: 'DELETE' })
    setExpenses(prev => prev.filter(e => e.ExpenseID !== id))
  }
  const update = async (e: Expense) => {
    const newName = prompt('Nowa nazwa', e.Name)
    if (!newName) return
    const res = await fetch(`http://localhost:3001/expenses/${e.ExpenseID}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...e, Name: newName })
    })
    const data = await res.json()
    setExpenses(prev => prev.map(x => x.ExpenseID === data.ExpenseID ? data : x))
  }
  return (
    <div>
      <h1>Lista wydatków</h1>
      <input placeholder="Nazwa" value={name} onChange={e=>setName(e.target.value)} />
      <input placeholder="Opis" value={desc} onChange={e=>setDesc(e.target.value)} />
      <input type="number" placeholder="Kwota" value={amount} onChange={e=>setAmount(Number(e.target.value))} />
      <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
      <button onClick={add}>Dodaj</button>
      <table>
        <thead><tr><th>Nazwa</th><th>Opis</th><th>Kwota</th><th>Data</th><th>Akcje</th></tr></thead>
        <tbody>
          {expenses.map(e => (
            <tr key={e.ExpenseID}>
              <td>{e.Name}</td><td>{e.Description}</td><td>{e.Amount} zł</td><td>{e.Date}</td>
              <td>
                <button onClick={()=>update(e)}>Edytuj</button>
                <button onClick={()=>remove(e.ExpenseID)}>Usuń</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
