import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookify } from '../context/BookifyContext';
import { AnimatePresence, motion } from 'framer-motion';
import BookDisplay from '../components/BookDisplay';
import Sidebar from '../components/Sidebar';
import './Notebook.css';

const Notebook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notebooks } = useBookify();
  const notebook = notebooks.find(nb => nb.id === parseInt(id));
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (!notebook) {
    return (
      <div className="notebook-not-found">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="not-found-content"
        >
          <h2>Notebook not found</h2>
          <button onClick={() => navigate('/')} className="back-button">
            ← Back to Bookshelf
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="notebook-page">
      <motion.button
        className="toggle-sidebar-btn"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isSidebarOpen ? '✕' : '☰'}
      </motion.button>

      <AnimatePresence>
        {isSidebarOpen && <Sidebar notebook={notebook} />}
      </AnimatePresence>

      <main className="notebook-main">
        <BookDisplay notebook={notebook} />
      </main>
    </div>
  );
};

export default Notebook;