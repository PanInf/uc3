import { useEffect, useState } from 'react'

function App() {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({
    category_id: '',
    Name: '',
    Description: '',
    Amount: '',
    Date: ''
  })

  const pobierzWydatki = () => {
    fetch('http://localhost:3004/expenses')
      .then(res => res.json())
      .then(data => {
        setExpenses(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Błąd pobierania:', err)
        setLoading(false)
      })
  }

  useEffect(() => {
    pobierzWydatki()
  }, [])

  const usunWydatek = (id) => {
    fetch(`http://localhost:3004/expenses/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error('Błąd usuwania')
        pobierzWydatki()
      })
      .catch(err => console.error('Błąd usuwania:', err))
  }

  const dodajLubEdytuj = async (e) => {
    e.preventDefault()
    const nowe = {
      category_id: Number(form.category_id),
      Name: form.Name,
      Description: form.Description,
      Amount: Number(form.Amount),
      Date: form.Date
    }

    const url = editingId
      ? `http://localhost:3004/expenses/${editingId}`
      : 'http://localhost:3004/expenses'

    const method = editingId ? 'PUT' : 'POST'

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nowe)
    })

    setForm({ category_id: '', Name: '', Description: '', Amount: '', Date: '' })
    setEditingId(null)
    pobierzWydatki()
  }

  const edytujWydatek = (exp) => {
    setForm({
      category_id: exp.category_id,
      Name: exp.Name,
      Description: exp.Description || '',
      Amount: exp.Amount,
      Date: exp.Date
    })
    setEditingId(exp.ExpenseID)
  }

  if (loading) return <p>Ładowanie wydatków...</p>

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Moje wydatki</h1>

      <form
        onSubmit={dodajLubEdytuj}
        style={{ marginBottom: '30px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}
      >
        <input
          value={form.category_id}
          onChange={e => setForm({...form, category_id: e.target.value})}
          placeholder="ID kategorii"
          type="number"
          required
          style={{ width: '120px' }}
        />
        <input
          value={form.Name}
          onChange={e => setForm({...form, Name: e.target.value})}
          placeholder="Nazwa"
          required
          style={{ width: '180px' }}
        />
        <input
          value={form.Description}
          onChange={e => setForm({...form, Description: e.target.value})}
          placeholder="Opis"
          style={{ width: '220px' }}
        />
        <input
          value={form.Amount}
          onChange={e => setForm({...form, Amount: e.target.value})}
          placeholder="Kwota"
          type="number"
          step="0.01"
          required
          style={{ width: '120px' }}
        />
        <input
          value={form.Date}
          onChange={e => setForm({...form, Date: e.target.value})}
          placeholder="Data (YYYY-MM-DD)"
          required
          style={{ width: '160px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>
          {editingId ? 'Zapisz zmiany' : 'Dodaj wydatek'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setForm({ category_id: '', Name: '', Description: '', Amount: '', Date: '' })
              setEditingId(null)
            }}
            style={{ background: '#888', color: 'white', padding: '8px 16px' }}
          >
            Anuluj
          </button>
        )}
      </form>

      {expenses.length === 0 ? (
        <p>Brak wydatków w bazie</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ border: '1px solid #ddd', padding: '10px' }}>Data</th>
              <th style={{ border: '1px solid #ddd', padding: '10px' }}>Nazwa</th>
              <th style={{ border: '1px solid #ddd', padding: '10px' }}>Opis</th>
              <th style={{ border: '1px solid #ddd', padding: '10px' }}>Kwota</th>
              <th style={{ border: '1px solid #ddd', padding: '10px' }}>Kategoria</th>
              <th style={{ border: '1px solid #ddd', padding: '10px' }}>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(exp => (
              <tr key={exp.ExpenseID}>
                <td style={{ border: '1px solid #ddd', padding: '10px' }}>{exp.Date}</td>
                <td style={{ border: '1px solid #ddd', padding: '10px' }}>{exp.Name}</td>
                <td style={{ border: '1px solid #ddd', padding: '10px' }}>{exp.Description || '—'}</td>
                <td style={{ border: '1px solid #ddd', padding: '10px' }}>{exp.Amount} zł</td>
                <td style={{ border: '1px solid #ddd', padding: '10px' }}>{exp.category_id}</td>
                <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                  <button
                    onClick={() => edytujWydatek(exp)}
                    style={{
                      backgroundColor: '#ffaa00',
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginRight: '5px'
                    }}
                  >
                    Edytuj
                  </button>
                  <button
                    onClick={() => usunWydatek(exp.ExpenseID)}
                    style={{
                      backgroundColor: '#ff4444',
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Usuń
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default App