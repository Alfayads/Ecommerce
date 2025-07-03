// Utility to load state from localStorage
export const loadState = () => {
  try {
    // Guard against being in a non-browser environment
    if (typeof window === 'undefined') {
      return undefined;
    }
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined; // No state in localStorage, Redux will use reducers' initial state
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state from localStorage", err);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    // Guard against being in a non-browser environment
    if (typeof window === 'undefined') {
      return;
    }
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
};