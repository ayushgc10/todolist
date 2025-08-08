// Import React and ReactDOM from the react library
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import our main App component
import App from './App';

// Import CSS for styling
import './index.css';

// Get the root element from the HTML (div with id="root")
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render our App component inside the root element
root.render(
  // React.StrictMode helps catch potential problems during development
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
