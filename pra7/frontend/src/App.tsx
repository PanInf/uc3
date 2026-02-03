import { useEffect, useState } from 'react'

/**
 * Typ pojedynczego wydatku
 * MUSI odpowiadać temu, co zwraca backend
 */
type Expense = {
  ExpenseID: number
  category_id: number
  Name: string
  Description: string
  Amount: number
}

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('http://localhost:3001/expenses')
      .then(res => {
        if (!res.ok) {
          throw new Error('Błąd odpowiedzi serwera')
        }
        return res.json()
      })
      .then((data: Expense[]) => {
        setExpenses(data)
      })
      .catch(err => {
        console.error(err)
        setError('Nie udało się pobrać wydatków')
      })
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>Lista wydatków</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nazwa</th>
            <th>Opis</th>
            <th>Kwota</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => (
            <tr key={expense.ExpenseID}>
              <td>{expense.ExpenseID}</td>
              <td>{expense.Name}</td>
              <td>{expense.Description}</td>
              <td>{expense.Amount} zł</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App