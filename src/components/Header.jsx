import { Link } from "react-router-dom"

function Header({ query, onSearch }) {

  function handleChange(e) {
    onSearch(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <header className="header">
      <div className="header-content">

        <Link to="/" className="app-title">
          MovieShelf
        </Link>

        <nav className="nav-links">

          <Link to="/" className="nav-link">
            Home
          </Link>

          <Link to="/favorites" className="nav-link">
            Favorites
          </Link>

          <Link to="/watchlist" className="nav-link">
            Watchlist
          </Link>

        </nav>

        <form className="search-container" onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Search movies..."
            className="search-input"
            value={query}
            onChange={handleChange}
          />

          <button type="submit" className="search-button">
            Search
          </button>

        </form>

      </div>
    </header>
  )
}

export default Header
