import { useState, useEffect } from 'react'

function App() {

  const [expenses, setExpenses] = useState([])
  const [newExpense, setNewExpense] = useState({ Name: '',Description: '', Amount: '', CategoryID: ''});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<Omit<Expense, 'id'>>({ title: '', amount: 0, category: 0 });

  useEffect(
    () => {
      fetch("http://localhost:3003/expenses")
        .then(res => res.json())
        .then(data => setExpenses(data))
        .catch(err => console.error("error", err));
    }, []
  )
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3003/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newExpense)
    });

    if (response.ok) {
      const savedExpense = await response.json();
      setExpenses([...expenses, savedExpense]);
      setNewExpense({ Name: '',Description: '', Amount: '', CategoryID: ''});
    }
  };

  const handleDelete = async (id: number) => {
    const response = await fetch(`http://localhost:3003/expenses/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setExpenses(prev => prev.filter(expense => expense.ExpenseID !== id));
    } else {
      alert("Błąd podczas usuwania");
    }
  };

  const handleSaveEdit = async (id: number) => {
    const response = await fetch(`http://localhost:3003/expenses/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editFormData),
    });

    if (response.ok) {
      setExpenses(expenses.map(exp => exp.id === id ? { ...exp, ...editFormData } : exp));
      setEditingId(null);
    }
  };


  return (
    <div>
      <h1>Lista Wydatków</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nazwa</th>
            <th>Kwota</th>
            <th>Opis</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.ExpenseID}>
              <td>{expense.ExpenseID}</td>
              <td>{expense.Name}</td>
              <td>{expense.Amount} zł</td>
              <td>{expense.Description}</td>
              <td><button onClick={() => handleDelete(expense.ExpenseID)}>Usuń</button></td>
            </tr>
          ))}
        </tbody>
      </table> 
      {expenses.length === 0 && <p>Ładowanie danych lub brak wydatków...</p>}
      <hr></hr>
      <h2>Dodaj nowy wydatek</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input type="text" placeholder="Nazwa" value={newExpense.Name} onChange={(e) => setNewExpense({...newExpense, Name: e.target.value})} required/>
        <input type="text" placeholder="Opis" value={newExpense.Description} onChange={(e) => setNewExpense({...newExpense, Description: e.target.value})} required/>
        <input type="number" placeholder="Kwota" value={newExpense.Amount} onChange={(e) => setNewExpense({...newExpense, Amount: e.target.value})} required/>
        <input type="number" placeholder="ID kategorii" value={newExpense.CategoryID} onChange={(e) => setNewExpense({...newExpense, CategoryID: e.target.value})} required/>
        <button type="submit">Dodaj</button>
      </form>
       <hr></hr>
      <h2>Edytuj wydatek</h2>
    </div>
  )
}

export default App
