// Import React hooks for managing state
import React, { useState } from 'react';

// TodoItem component - displays a single todo item
function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  // State to track if this todo is being edited
  const [isEditing, setIsEditing] = useState(false);
  
  // State to store the edited text
  const [editText, setEditText] = useState(todo.text);

  // Handle checkbox change (toggle completion)
  const handleToggle = () => {
    onToggle(todo.id); // Call the parent's toggle function with this todo's ID
  };

  // Handle edit button click
  const handleEdit = () => {
    setIsEditing(true); // Enter edit mode
    setEditText(todo.text); // Set the current text as the edit value
  };

  // Handle save button click
  const handleSave = () => {
    if (editText.trim()) { // Only save if text is not empty
      onEdit(todo.id, editText.trim()); // Call the parent's edit function
      setIsEditing(false); // Exit edit mode
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    setIsEditing(false); // Exit edit mode
    setEditText(todo.text); // Reset to original text
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
      
      {/* Show edit form when editing, otherwise show text */}
      {isEditing ? (
        <div className="todo-edit-form">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)} // Update edit text
            className="todo-edit-input"
            autoFocus // Automatically focus the input
          />
          <button onClick={handleSave} className="save-button">
            Save
          </button>
          <button onClick={handleCancel} className="cancel-button">
            Cancel
          </button>
        </div>
      ) : (
        <>
          {/* Todo text - shows strikethrough if completed */}
          <span 
            className={`todo-text ${todo.completed ? 'completed' : ''}`}
          >
            {todo.text} {/* Display the todo text */}
          </span>
          
          {/* Action buttons */}
          <div className="todo-actions">
            <button 
              onClick={handleEdit} // Call handleEdit when button is clicked
              className="edit-button"
            >
              Edit
            </button>
            <button 
              onClick={handleDelete} // Call handleDelete when button is clicked
              className="delete-button"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}

// Export the TodoItem component so it can be used in App.js
export default TodoItem;
