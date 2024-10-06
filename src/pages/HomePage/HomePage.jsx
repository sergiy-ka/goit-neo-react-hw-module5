import { useState, useEffect } from "react";
import { trendingMovies } from "../../api/movies-api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const data = await trendingMovies();
        setMovies(data.results);
      } catch {
        // console.error("Error fetching trending movies!");
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div className={css.container}>
      <h1>Trending today</h1>
      <MovieList movies={movies} />
    </div>
  );
}

export default HomePage;
