import { useState, useEffect } from 'react'

function App() {
  const [expenses, setExpenses] = useState([])
  useEffect(
    () => {
      fetch("http://localhost:3003/expenses")
      .then(res => res.json())
      .then(data => setExpenses(data))
      .catch(err => console.error("chuj",err));
      
    },[]
  )

  return (
    <div>
      <h1>Lista Wydatków</h1>
      <table>{expenses.map(
        e => (
          <tr key={e}>
            <td>{e}</td>
          </tr>
        )
      )}</table>
      </div>
  )
}

export default App
