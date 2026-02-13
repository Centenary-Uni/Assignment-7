const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL

if (!API_KEY) {
  console.warn("Missing VITE_TMDB_API_KEY in .env")
}

async function request(path) {
  const url = `${BASE_URL}${path}${path.includes("?") ? "&" : "?"}api_key=${API_KEY}`

  const res = await fetch(url)
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`TMDB request failed (${res.status}): ${text}`)
  }
  return res.json()
}

export async function getPopularMovies() {
  
  return request("/movie/popular")
}

export async function searchMovies(query) {
  const safe = encodeURIComponent(query)
  return request(`/search/movie?query=${safe}`)
}
