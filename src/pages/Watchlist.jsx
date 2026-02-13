import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

export default function Watchlist() {
  const { watchlist } = useContext(MovieContext);

  return (
    <div>
      <h2>Watchlist</h2>

      {watchlist.length === 0 ? (
        <p>No movies in your watchlist yet.</p>
      ) : (
        <div className="movie-grid">
          {watchlist.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

