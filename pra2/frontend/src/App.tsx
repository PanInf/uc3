import { useState, useEffect } from 'react'

function App() {
  const [expenses, setExpenses] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [updateId, setUpdateId] = useState(null)

  const fetchExpenses = () => {
    fetch("http://localhost:3002/expenses")
      .then(res => res.json())
      .then(data => setExpenses(data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchExpenses()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = { CategoryID: 1, Name: name, Description: description, Amount: parseFloat(amount), Date: date }

    if (updateId) {
      fetch(`http://localhost:3002/expenses/${updateId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(() => {
        fetchExpenses()
        resetForm()
      })
    } else {
      fetch("http://localhost:3002/expenses", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(() => {
        fetchExpenses()
        resetForm()
      })
    }
  }

  const deleteExpense = (id) => {
    fetch(`http://localhost:3002/expenses/${id}`, { method: 'DELETE' })
      .then(() => fetchExpenses())
  }

  const editExpense = (e) => {
    setUpdateId(e.ExpenseID)
    setName(e.Name)
    setDescription(e.Description)
    setAmount(e.Amount)
    setDate(e.Date)
  }

  const resetForm = () => {
    setUpdateId(null)
    setName('')
    setDescription('')
    setAmount('')
    setDate('')
  }

  return (
    <div>
      <h1>Lista wydatków</h1>

      <form onSubmit={handleSubmit}>
        <input placeholder="Nazwa" value={name} onChange={e => setName(e.target.value)} required />
        <input placeholder="Opis" value={description} onChange={e => setDescription(e.target.value)} required />
        <input type="number" placeholder="Kwota" value={amount} onChange={e => setAmount(e.target.value)} required />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
        <button type="submit">{updateId ? "Aktualizuj" : "Dodaj"}</button>
        {updateId && <button type="button" onClick={resetForm}>Anuluj</button>}
      </form>

      <table>
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Opis</th>
            <th>Kwota</th>
            <th>Data</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(e => (
            <tr key={e.ExpenseID}>
              <td>{e.Name}</td>
              <td>{e.Description}</td>
              <td>{e.Amount}</td>
              <td>{e.Date}</td>
              <td>
                <button onClick={() => editExpense(e)}>Edytuj</button>
                <button onClick={() => deleteExpense(e.ExpenseID)}>Usuń</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
