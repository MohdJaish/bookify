import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useBookify } from '../context/BookifyContext';
import Header from '../components/Header';
import NotebookCard from '../components/NotebookCard';
import CreateNotebookModal from '../components/modals/CreateNotebookModal';
import { containerVariants } from '../animations/variants';
import './Bookshelf.css';

const Bookshelf = () => {
  const { notebooks, searchQuery } = useBookify();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Filter notebooks based on search query
  const filteredNotebooks = notebooks.filter(notebook =>
    notebook.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNotebookClick = (notebookId) => {
    navigate(`/notebook/${notebookId}`);
  };

  return (
    <div className="bookshelf-page">
      <Header />

      <main className="bookshelf-container">
        {/* Hero Section */}
        <motion.div
          className="bookshelf-hero"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Your Library</h2>
          <p>Organize your thoughts like a real book</p>
        </motion.div>

        {/* Notebooks Grid */}
        <motion.div
          className="notebooks-grid"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {/* Create New Notebook Card */}
          <motion.div
            className="create-notebook-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
          >
            <div className="create-notebook-icon">+</div>
            <p>Create New Notebook</p>
          </motion.div>

          {/* Notebook Cards */}
          <AnimatePresence>
            {filteredNotebooks.length > 0 ? (
              filteredNotebooks.map((notebook) => (
                <NotebookCard
                  key={notebook.id}
                  notebook={notebook}
                  onClick={() => handleNotebookClick(notebook.id)}
                />
              ))
            ) : (
              <motion.div
                className="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p>No notebooks found</p>
                <p className="empty-state-hint">Create one to get started!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Create Notebook Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <CreateNotebookModal onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Bookshelf;