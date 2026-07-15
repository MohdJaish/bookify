import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookifyProvider } from './context/BookifyContext';
import Bookshelf from './pages/Bookshelf';
import Notebook from './pages/Notebook';
import './App.css';

function App() {
  return (
    <BookifyProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Bookshelf />} />
          <Route path="/notebook/:id" element={<Notebook />} />
        </Routes>
      </Router>
    </BookifyProvider>
  );
}

export default App;