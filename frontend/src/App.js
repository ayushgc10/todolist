// Import React hooks for managing state and side effects
import React, { useState, useEffect } from 'react';

// Import our TodoItem component
import TodoItem from './TodoItem';

// Main App component
function App() {
  // State to store the list of todos
  const [todos, setTodos] = useState([]);
  
  // State to store the current input value
  const [newTodo, setNewTodo] = useState('');
  
  // State to track loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API base URL - this is where our backend server runs
  const API_URL = 'http://localhost:3001/api';

  // Function to fetch all todos from the server
  const fetchTodos = async () => {
    try {
      setLoading(true); // Show loading state
      const response = await fetch(`${API_URL}/todos`); // Make GET request to server
      const data = await response.json(); // Convert response to JSON
      setTodos(data); // Update todos state with fetched data
      setError(null); // Clear any previous errors
    } catch (err) {
      setError('Failed to load todos'); // Set error message
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  // Function to add a new todo
  const addTodo = async (text) => {
    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: 'POST', // HTTP method
        headers: {
          'Content-Type': 'application/json', // Tell server we're sending JSON
        },
        body: JSON.stringify({ text }), // Send todo text as JSON
      });
      
      const newTodo = await response.json(); // Get the created todo from server
      setTodos(prevTodos => [...prevTodos, newTodo]); // Add new todo to state
      setNewTodo(''); // Clear the input field
    } catch (err) {
      setError('Failed to add todo'); // Set error message
      console.error('Error adding todo:', err);
    }
  };

  // Function to toggle todo completion status
  const toggleTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT', // HTTP method for updating
      });
      
      const updatedTodo = await response.json(); // Get updated todo from server
      setTodos(prevTodos => 
        prevTodos.map(todo => 
          todo.id === id ? updatedTodo : todo // Replace the specific todo
        )
      );
    } catch (err) {
      setError('Failed to update todo'); // Set error message
      console.error('Error updating todo:', err);
    }
  };

  // Function to delete a todo
  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE', // HTTP method for deleting
      });
      
      setTodos(prevTodos => 
        prevTodos.filter(todo => todo.id !== id) // Remove todo from state
      );
    } catch (err) {
      setError('Failed to delete todo'); // Set error message
      console.error('Error deleting todo:', err);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page from refreshing
    if (newTodo.trim()) { // Only add if todo is not empty
      addTodo(newTodo.trim()); // Add the new todo
    }
  };

  // Load todos when component first mounts (runs once)
  useEffect(() => {
    fetchTodos();
  }, []); // Empty array means this effect runs only once

  // If loading, show loading message
  if (loading) {
    return (
      <div className="app-container">
        <div className="loading">Loading todos...</div>
      </div>
    );
  }

  // Main app render
  return (
    <div className="app-container">
      {/* App header */}
      <div className="app-header">
        <h1 className="app-title">My Todo List</h1>
        <p>Keep track of your tasks!</p>
      </div>

      {/* Error message display */}
      {error && (
        <div className="error">
          {error}
          <button onClick={fetchTodos} style={{ marginLeft: '10px', padding: '5px 10px' }}>
            Retry
          </button>
        </div>
      )}

      {/* Form to add new todos */}
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)} // Update input value
          placeholder="Add a new todo..."
          className="todo-input"
        />
        <button 
          type="submit" 
          className="add-button"
          disabled={!newTodo.trim()} // Disable button if input is empty
        >
          Add Todo
        </button>
      </form>

      {/* List of todos */}
      <ul className="todo-list">
        {todos.map(todo => (
          <TodoItem
            key={todo.id} // React needs unique keys for list items
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>

      {/* Show message when no todos */}
      {todos.length === 0 && !loading && (
        <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
          No todos yet. Add one above!
        </p>
      )}
    </div>
  );
}

// Export the App component so it can be used in index.js
export default App;
