// Import React for creating the component
import React from 'react';

// TodoItem component - displays a single todo item
function TodoItem({ todo, onToggle, onDelete }) {
  // Handle checkbox change (toggle completion)
  const handleToggle = () => {
    onToggle(todo.id); // Call the parent's toggle function with this todo's ID
  };

  // Handle delete button click
  const handleDelete = () => {
    onDelete(todo.id); // Call the parent's delete function with this todo's ID
  };

  // Render the todo item
  return (
    <li className="todo-item">
      {/* Checkbox to toggle completion */}
      <input
        type="checkbox"
        checked={todo.completed} // Checkbox state based on todo completion
        onChange={handleToggle} // Call handleToggle when checkbox changes
        className="todo-checkbox"
      />
      
      {/* Todo text - shows strikethrough if completed */}
      <span 
        className={`todo-text ${todo.completed ? 'completed' : ''}`}
      >
        {todo.text} {/* Display the todo text */}
      </span>
      
      {/* Delete button */}
      <button 
        onClick={handleDelete} // Call handleDelete when button is clicked
        className="delete-button"
      >
        Delete
      </button>
    </li>
  );
}

// Export the TodoItem component so it can be used in App.js
export default TodoItem;
