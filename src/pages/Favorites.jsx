import { useEffect, useState } from "react"
import MovieGrid from "../components/MovieGrid"

function Favorites() {
  const [favoriteMovies, setFavoriteMovies] = useState([])

  useEffect(() => {
    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem("favorites")

    if (storedFavorites) {
      setFavoriteMovies(JSON.parse(storedFavorites))
    }
  }, [])

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>My Favorites</h2>
        <p>Your saved movies collection</p>
      </div>

      {favoriteMovies.length > 0 ? (
        <MovieGrid movies={favoriteMovies} />
      ) : (
        <div className="empty-state">
          <p>No favorite movies yet. Start adding some from the home page!</p>
        </div>
      )}
    </main>
  )
}

export default Favorites
