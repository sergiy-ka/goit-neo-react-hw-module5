import css from "./MoviesPage.module.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { searchMovies } from "../../api/movies-api";
import MovieList from "../../components/MovieList/MovieList";
import toast, { Toaster } from "react-hot-toast";

const MoviesPage = () => {
  const location = useLocation();
  const [query, setQuery] = useState(location.state?.query || "");
  const [movies, setMovies] = useState(location.state?.movies || []);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (query.trim() === "") {
      toast.error("Please enter a search query!", {
        duration: 2500,
        position: "top-center",
        style: {
          background: "#ffcccb", // Change background color
        },
      });
      setQuery("");
      setMovies([]);
      return;
    }

    try {
      const data = await searchMovies(query);
      setMovies(data.results);
    } catch {
      // console.error("Error searching movies!");
    }
  };

  useEffect(() => {
    if (location.state?.movies) {
      setMovies(location.state.movies);
    }
  }, [location.state?.movies]);

  return (
    <div className={css.container}>
      <form onSubmit={handleSearch} className={css.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={css.input}
          placeholder="Enter movie title"
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
      <MovieList movies={movies} query={query} />
      <Toaster />
    </div>
  );
};

export default MoviesPage;
