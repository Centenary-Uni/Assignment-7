import { useState, useEffect } from "react"

export default function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false)

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster"

  useEffect(() => {
    const favorites =
      JSON.parse(localStorage.getItem("favorites")) || []

    const exists = favorites.some(
      (fav) => fav.id === movie.id
    )

    setIsFavorite(exists)
  }, [movie.id])

  function toggleFavorite() {
    const favorites =
      JSON.parse(localStorage.getItem("favorites")) || []

    let updated

    if (isFavorite) {
      updated = favorites.filter(
        (fav) => fav.id !== movie.id
      )
    } else {
      updated = [...favorites, movie]
    }

    localStorage.setItem(
      "favorites",
      JSON.stringify(updated)
    )

    setIsFavorite(!isFavorite)
  }

  return (
    <div className="movie-card">
      <img src={posterUrl} alt={movie.title} />

      <h3>{movie.title}</h3>

      <button onClick={toggleFavorite}>
        {isFavorite
          ? "Remove Favorite"
          : "Add Favorite"}
      </button>
    </div>
  )
}
