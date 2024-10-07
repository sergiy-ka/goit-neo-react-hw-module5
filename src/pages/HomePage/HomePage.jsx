import { useState, useEffect } from "react";
import { trendingMovies } from "../../api/movies-api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";
import toast, { Toaster } from "react-hot-toast";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const data = await trendingMovies();
        setMovies(data.results);
      } catch {
        // console.error("Error fetching trending movies!");
        toast.error("An error occurred while fetching for trending movies.", {
          duration: 2500,
          position: "top-center",
          style: {
            background: "#ffcccb",
          },
        });
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div className={css.container}>
      <h1>Trending today</h1>
      <MovieList movies={movies} />
      <Toaster />
    </div>
  );
};

export default HomePage;
