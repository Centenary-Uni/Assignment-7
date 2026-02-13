import React, { createContext, useEffect, useMemo, useState } from "react";

export const MovieContext = createContext();

export function MovieProvider({ children }) {
  // Load from localStorage on first render
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  function addToWatchlist(movie) {
    setWatchlist(prev => {
      
      const exists = prev.some(m => m.id === movie.id);
      if (exists) return prev;
      return [...prev, movie];
    });
  }

  function removeFromWatchlist(movieId) {
    setWatchlist(prev => prev.filter(m => m.id !== movieId));
  }

  function isInWatchlist(movieId) {
    return watchlist.some(m => m.id === movieId);
  }

  const value = useMemo(
    () => ({
      watchlist,
      addToWatchlist,
      removeFromWatchlist,
      isInWatchlist,
    }),
    [watchlist]
  );

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
}
