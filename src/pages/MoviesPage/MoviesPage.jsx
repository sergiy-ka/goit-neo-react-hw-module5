import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { searchMovies } from "../../api/movies-api";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css";

function MoviesPage() {
  const location = useLocation();
  const [query, setQuery] = useState(location.state?.query || "");
  const [movies, setMovies] = useState(location.state?.movies || []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await searchMovies(query);
      setMovies(data.results);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  useEffect(() => {
    console.log("location.state?.movies", location.state?.movies);
    if (location.state?.movies) {
      setMovies(location.state.movies);
    }
  }, [location.state?.movies]);

  return (
    <div className={styles.container}>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.input}
          placeholder="Enter movie title"
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
      <MovieList movies={movies} query={query} />
    </div>
  );
}

export default MoviesPage;
