// Import required modules
const express = require('express'); // Express.js framework for creating the server
const cors = require('cors'); // Middleware to handle Cross-Origin Resource Sharing

// Create an Express application
const app = express();

// Middleware setup
app.use(cors()); // Allow requests from different origins (like our React app)
app.use(express.json()); // Parse JSON data from requests

// In-memory storage for todos (in a real app, you'd use a database)
let todos = [
  { id: 1, text: "Learn JavaScript", completed: false },
  { id: 2, text: "Learn React", completed: false },
  { id: 3, text: "Build a todo app", completed: false }
];

// Counter for generating unique IDs
let nextId = 4;

// GET /api/todos - Get all todos
app.get('/api/todos', (req, res) => {
  // Send all todos as JSON response
  res.json(todos);
});

// POST /api/todos - Create a new todo
app.post('/api/todos', (req, res) => {
  // Get the todo text from the request body
  const { text } = req.body;
  
  // Create a new todo object
  const newTodo = {
    id: nextId++, // Assign a unique ID and increment the counter
    text: text, // The todo text from the request
    completed: false // New todos start as incomplete
  };

  console.debug('Ayush newTodo', newTodo);
  
  // Add the new todo to our array
  todos.push(newTodo);
  
  // Send back the created todo
  res.status(201).json(newTodo);
});

// PUT /api/todos/:id - Update a todo (toggle completion)
app.put('/api/todos/:id', (req, res) => {
  // Get the todo ID from the URL parameters
  const id = parseInt(req.params.id);
  
  // Find the todo in our array
  const todo = todos.find(todo => todo.id === id);
  
  if (!todo) {
    // If todo not found, return 404 error
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  // Toggle the completed status
  todo.completed = !todo.completed;
  
  // Send back the updated todo
  res.json(todo);
});

// PUT /api/todos/:id/edit - Edit a todo text
app.put('/api/todos/:id/edit', (req, res) => {
  // Get the todo ID from the URL parameters
  const id = parseInt(req.params.id);
  
  // Get the new text from the request body
  const { text } = req.body;
  
  // Find the todo in our array
  const todo = todos.find(todo => todo.id === id);
  
  if (!todo) {
    // If todo not found, return 404 error
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  // Update the todo text
  todo.text = text;
  
  // Send back the updated todo
  res.json(todo);
});

// DELETE /api/todos/:id - Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  // Get the todo ID from the URL parameters
  const id = parseInt(req.params.id);
  
  // Find the index of the todo in our array
  const todoIndex = todos.findIndex(todo => todo.id === id);
  
  if (todoIndex === -1) {
    // If todo not found, return 404 error
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  // Remove the todo from the array
  todos.splice(todoIndex, 1);
  
  // Send back a success message
  res.json({ message: 'Todo deleted successfully' });
});

// Set the port number for the server
const PORT = 3001;

// Start the server and listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  GET    /api/todos     - Get all todos');
  console.log('  POST   /api/todos     - Create a new todo');
  console.log('  PUT    /api/todos/:id - Toggle todo completion');
  console.log('  PUT    /api/todos/:id/edit - Edit todo text');
  console.log('  DELETE /api/todos/:id - Delete a todo');
});
