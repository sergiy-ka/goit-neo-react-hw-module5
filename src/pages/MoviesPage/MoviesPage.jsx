import { useState } from "react";
import { searchMovie } from "../../api/movies-api";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css";

function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await searchMovie(searchQuery);
      setSearchResults(data.results);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.input}
          placeholder="Enter movie title"
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
      <MovieList movies={searchResults} />
    </div>
  );
}

export default MoviesPage;
