import { useState, useEffect} from 'react'


function App() {
  const [expenses, setExpenses] = useState([])
  useEffect( () => {
    fetch("http://localhost:3002/expenses")
    .then(res => res.json())
    .then(data => setExpenses(data))
    .catch(err => console.error("Błąd pobierania: ", err))
  }, [])
  return (
    <div>
      <h1>Lista wydatków</h1>
      <table>{expenses.map(
          expense => (
          <tr>
            <td>{expense.Name}</td>
            <td>{expense.Description}</td>
          </tr>
          )
        )}
      </table>
    </div>  
  )
}

export default App
