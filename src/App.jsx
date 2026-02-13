import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Favorites from "./pages/Favorites"
import { getPopularMovies, searchMovies } from "./services/movieService"
import LoadingSpinner from "./components/LoadingSpinner"
import ErrorMessage from "./components/ErrorMessage"

export default function App() {
  const [movies, setMovies] = useState([])
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // load popular movies at start
  useEffect(() => {
    let ignore = false

    async function loadPopular() {
      try {
        setLoading(true)
        setError("")
        const data = await getPopularMovies()
        if (!ignore) setMovies(data.results || [])
      } catch (e) {
        if (!ignore) setError(e.message || "Failed to load popular movies.")
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    loadPopular()
    return () => (ignore = true)
  }, [])

  async function handleSearch(value) {
    setQuery(value)

    try {
      setLoading(true)
      setError("")

      if (!value.trim()) {
        const data = await getPopularMovies()
        setMovies(data.results || [])
        return
      }

      const data = await searchMovies(value)
      setMovies(data.results || [])
    } catch (e) {
      setError(e.message || "Search failed.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header query={query} onSearch={handleSearch} />

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}

      <Routes>
        <Route path="/" element={<Home movies={movies} setMovies={setMovies} />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  )
}
