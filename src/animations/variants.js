// Page flip animation variants
export const pageFlipVariants = {
  initial: (direction) => ({
    rotateY: direction > 0 ? -90 : 90,
    opacity: 0
  }),
  animate: {
    rotateY: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1] // Custom cubic-bezier for smooth flip
    }
  },
  exit: (direction) => ({
    rotateY: direction > 0 ? 90 : -90,
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: 'easeInOut'
    }
  })
};

// Book container animation
export const bookContainerVariants = {
  initial: { scale: 0.95, opacity: 0, y: 20 },
  animate: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

// Notebook card animation
export const notebookCardVariants = {
  initial: { scale: 0.9, opacity: 0, y: 20 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.3 }
  },
  hover: {
    scale: 1.05,
    y: -5,
    transition: { duration: 0.2 }
  },
  exit: {
    scale: 0.9,
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

// Stagger container for list animations
export const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

// Individual item animation
export const itemVariants = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 }
  }
};

// Modal animation
export const modalVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 }
  }
};

// Backdrop animation
export const backdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

// Button ripple effect
export const rippleVariants = {
  initial: { scale: 0, opacity: 1 },
  animate: {
    scale: 4,
    opacity: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};