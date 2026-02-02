import { useState, useEffect } from 'react';

type Expense = {
  ExpenseID: number;
  category_id: number;
  Name: string;
  Description: string;
  Amount: number;
  Date: string;
};

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/expenses")
      .then(res => res.json())
      .then((data: Expense[]) => setExpenses(data))
      .catch(err => console.error("Błąd pobierania:", err));
  }, []);

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
          {expenses.map((expense) => (
            <tr key={expense.ExpenseID}>
              <td>{expense.Name}</td>
              <td>{expense.Description}</td>
              <td>{expense.Amount} zł</td>
              <td>{expense.Date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
