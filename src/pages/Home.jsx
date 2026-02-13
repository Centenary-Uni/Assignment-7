import { useEffect, useState } from "react"
import MovieGrid from "../components/MovieGrid"
import { getPopularMovies } from "../services/movieService"

export default function Home({ movies, setMovies }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (movies?.length) return

    let ignore = false

    async function load() {
      try {
        setLoading(true)
        setError("")
        const data = await getPopularMovies()
        if (!ignore) setMovies(data.results || [])
      } catch (e) {
        if (!ignore) setError(e.message || "Failed to load movies.")
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    load()
    return () => (ignore = true)
  }, [movies, setMovies])

  if (loading) return <p>Loading...</p>
  if (error) return <p style={{ color: "red" }}>{error}</p>

  return (
    <div>
      <h2>Popular Movies</h2>
      <MovieGrid movies={movies} />
    </div>
  )
}
