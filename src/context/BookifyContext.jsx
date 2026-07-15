import React, { createContext, useContext, useState, useEffect } from 'react';

const BookifyContext = createContext();

export const BookifyProvider = ({ children }) => {
  const [notebooks, setNotebooks] = useState([]);
  const [currentNotebook, setCurrentNotebook] = useState(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Load data from localStorage on mount
  useEffect(() => {
    const savedNotebooks = localStorage.getItem('bookify_notebooks');
    const savedDarkMode = localStorage.getItem('bookify_darkMode');
    
    if (savedNotebooks) {
      setNotebooks(JSON.parse(savedNotebooks));
    }
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Save notebooks to localStorage
  useEffect(() => {
    localStorage.setItem('bookify_notebooks', JSON.stringify(notebooks));
  }, [notebooks]);

  // Save dark mode to localStorage
  useEffect(() => {
    localStorage.setItem('bookify_darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Create new notebook
  const createNotebook = (title) => {
    const newNotebook = {
      id: Date.now(),
      title,
      color: getRandomColor(),
      createdAt: new Date().toISOString(),
      pages: [
        {
          id: Date.now() + 1,
          number: 1,
          notes: []
        }
      ],
      favorites: [],
      bookmarks: [],
      tags: [],
      archived: false
    };
    setNotebooks([...notebooks, newNotebook]);
    return newNotebook;
  };

  // Update notebook
  const updateNotebook = (id, updates) => {
    setNotebooks(notebooks.map(nb => nb.id === id ? { ...nb, ...updates } : nb));
  };

  // Delete notebook
  const deleteNotebook = (id) => {
    setNotebooks(notebooks.filter(nb => nb.id !== id));
    if (currentNotebook?.id === id) {
      setCurrentNotebook(null);
    }
  };

  // Create new page in notebook
  const createPage = (notebookId) => {
    setNotebooks(notebooks.map(nb => {
      if (nb.id === notebookId) {
        const pageNumber = nb.pages.length + 1;
        const newPage = {
          id: Date.now(),
          number: pageNumber,
          notes: []
        };
        return { ...nb, pages: [...nb.pages, newPage] };
      }
      return nb;
    }));
  };

  // Add note to page
  const addNoteToPage = (notebookId, pageIndex, note) => {
    setNotebooks(notebooks.map(nb => {
      if (nb.id === notebookId) {
        const updatedPages = [...nb.pages];
        updatedPages[pageIndex].notes.push({
          id: Date.now(),
          ...note,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
        return { ...nb, pages: updatedPages };
      }
      return nb;
    }));
  };

  // Update note
  const updateNote = (notebookId, pageIndex, noteId, updates) => {
    setNotebooks(notebooks.map(nb => {
      if (nb.id === notebookId) {
        const updatedPages = [...nb.pages];
        updatedPages[pageIndex].notes = updatedPages[pageIndex].notes.map(note =>
          note.id === noteId ? { ...note, ...updates, updatedAt: new Date().toISOString() } : note
        );
        return { ...nb, pages: updatedPages };
      }
      return nb;
    }));
  };

  // Delete note
  const deleteNote = (notebookId, pageIndex, noteId) => {
    setNotebooks(notebooks.map(nb => {
      if (nb.id === notebookId) {
        const updatedPages = [...nb.pages];
        updatedPages[pageIndex].notes = updatedPages[pageIndex].notes.filter(note => note.id !== noteId);
        return { ...nb, pages: updatedPages };
      }
      return nb;
    }));
  };

  // Toggle favorite
  const toggleFavorite = (notebookId, noteId) => {
    setNotebooks(notebooks.map(nb => {
      if (nb.id === notebookId) {
        const isFavorited = nb.favorites.includes(noteId);
        return {
          ...nb,
          favorites: isFavorited
            ? nb.favorites.filter(id => id !== noteId)
            : [...nb.favorites, noteId]
        };
      }
      return nb;
    }));
  };

  // Add bookmark
  const addBookmark = (notebookId, pageIndex) => {
    setNotebooks(notebooks.map(nb => {
      if (nb.id === notebookId) {
        return {
          ...nb,
          bookmarks: nb.bookmarks.includes(pageIndex)
            ? nb.bookmarks.filter(idx => idx !== pageIndex)
            : [...nb.bookmarks, pageIndex]
        };
      }
      return nb;
    }));
  };

  const getRandomColor = () => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
      '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B88B', '#52B788'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <BookifyContext.Provider
      value={{
        notebooks,
        currentNotebook,
        setCurrentNotebook,
        currentPageIndex,
        setCurrentPageIndex,
        darkMode,
        setDarkMode,
        searchQuery,
        setSearchQuery,
        createNotebook,
        updateNotebook,
        deleteNotebook,
        createPage,
        addNoteToPage,
        updateNote,
        deleteNote,
        toggleFavorite,
        addBookmark
      }}
    >
      {children}
    </BookifyContext.Provider>
  );
};

export const useBookify = () => {
  const context = useContext(BookifyContext);
  if (!context) {
    throw new Error('useBookify must be used within BookifyProvider');
  }
  return context;
};