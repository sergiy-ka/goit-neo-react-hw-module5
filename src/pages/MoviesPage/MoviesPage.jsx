import css from "./MoviesPage.module.css";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../api/movies-api";
import MovieList from "../../components/MovieList/MovieList";
import toast, { Toaster } from "react-hot-toast";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (query) {
      fetchMovies(query);
    }
  }, [query]);

  const fetchMovies = async (searchQuery) => {
    try {
      const data = await searchMovies(searchQuery);
      setMovies(data.results);
    } catch {
      // console.error("Error searching movies:");
      toast.error("An error occurred while searching for movies.", {
        duration: 2500,
        position: "top-center",
        style: {
          background: "#ffcccb",
        },
      });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const searchQuery = form.elements.searchQuery.value.trim();

    if (searchQuery === "") {
      toast.error("Please enter a search query!", {
        duration: 2500,
        position: "top-center",
        style: {
          background: "#ffcccb",
        },
      });
      setSearchParams({});
      setMovies([]);
      searchParams.delete("query");
      return;
    }

    setSearchParams({ query: searchQuery });
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSearch} className={css.form}>
        <input
          type="text"
          name="searchQuery"
          defaultValue={query}
          className={css.input}
          placeholder="Enter movie title"
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
      <MovieList movies={movies} />
      <Toaster />
    </div>
  );
};

export default MoviesPage;
