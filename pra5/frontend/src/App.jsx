import { useState, useEffect } from 'react'

function App() {
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    fetch('http://localhost:3005/expenses')
      .then(res => res.json())
      .then(data => setExpenses(data))
      .catch(err => console.error('Błąd pobierania:', err))
  }, [])

  return (
    <div>
      <h1>Lista wydatków</h1>
      <table>
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Opis</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(e => (
            <tr key={e.ExpenseID}>
              <td>{e.Name}</td>
              <td>{e.Description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
