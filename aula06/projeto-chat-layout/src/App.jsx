
import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState('');
  const [editName, setEditName] = useState('');
  const nextId = useRef(1);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const handleAdd = (e) => {
    e.preventDefault();
    const trimmedName = newName.trim(); // Remove espaços em branco do nome
    if (!trimmedName) return;
    
    setItems(prev => [...prev, { id: nextId.current, name: trimmedName }]);
    setNewName('');
    nextId.current += 1;
  };

  const handleRemove = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditName(item.name);
  };

  const saveEdit = () => {
    const trimmedName = editName.trim();
    if (!trimmedName) return;
    
    setItems(prev =>
      prev.map(item =>
        item.id === editingId ? { ...item, name: trimmedName } : item
      )
    );
    setEditingId(null);
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Gerenciador</h1>
      
      <div className="search-section">
        <input
          type="text"
          placeholder="Pesquisar nome"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <form onSubmit={handleAdd} className="add-form">
        <input
          type="text"
          placeholder="Adicionar novo nome"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button type="submit" className="add-btn">ADD</button>
      </form>

      <div className="items-list">
        {filteredItems.map(item => (
          <div key={item.id} className="item">
            <div className="item-content">
              {editingId === item.id ? (
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  
                  autoFocus
                />
              ) : (
                <span>{item.name} <small>(ID: {item.id})</small></span>
              )}
            </div>
            
            <div className="buttons">
              {editingId === item.id ? (
                <>
                  <button className="save-btn" onClick={saveEdit}>Salvar</button>
                  <button className="cancel-btn" onClick={() => setEditingId(null)}>Cancelar</button>
                </>
              ) : (
                <>
                  <button className="edit-btn" onClick={() => startEdit(item)}>Editar</button>
                  <button className="remove-btn" onClick={() => handleRemove(item.id)}>Remover</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App
