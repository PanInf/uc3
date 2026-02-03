import { useState, useEffect } from 'react'

function App() {
  const [expenses, setExpenses] = useState(() => [] as {
    ExpenseID: number
    CategoryID: number
    Name: string
    Description: string
    Amount: number
    Date: string
  }[])

  useEffect(() => {
    fetch("http://localhost:3002/expenses")
      .then(res => res.json())
      .then(data => setExpenses(data))
      .catch(err => console.error("Błąd pobierania:", err))
  }, [])

  return (
    <div>
      <h1>Lista wydatków</h1>
      <table>
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Opis</th>
            <th>Kwota</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e, index) => (
            <tr key={index}>
              <td>{e.Name}</td>
              <td>{e.Description}</td>
              <td>{e.Amount}</td>
              <td>{e.Date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
