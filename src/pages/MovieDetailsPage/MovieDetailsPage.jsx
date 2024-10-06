import { useState, useEffect } from "react";
import {
  useParams,
  Link,
  NavLink,
  Outlet,
  useLocation,
} from "react-router-dom";
import { movieDetails } from "../../api/movies-api";
import css from "./MovieDetailsPage.module.css";
import clsx from "clsx";

const generateActiveClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.isActive);
};

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLinkHref = location.state?.from ?? "/";
  const previousMovies = location.state?.movies || [];
  const previousQuery = location.state?.query || "";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await movieDetails(movieId);
        setMovie(data);
      } catch {
        // console.error("Error fetching movie details!");
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) return <div className={css.loading}>Loading...</div>;

  return (
    <div className={css.container}>
      <Link
        to={backLinkHref}
        state={{ movies: previousMovies, query: previousQuery }}
        className={css.backLink}
      >
        &#11104; Go back
      </Link>
      <div className={css.containerMovie}>
        <div className={css.containerImg}>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            alt={movie.title}
            className={css.poster}
          />
        </div>
        <div className={css.containerInfo}>
          <h1>
            {movie.title}
            {movie.release_date
              ? ` (${new Date(movie.release_date).getFullYear()})`
              : ""}
          </h1>
          <p>User Score: {(movie.vote_average * 10).toFixed(2)}%</p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <ul>
            {movie.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={css.additionalInfo}>
        <h4>Additional information</h4>
        <div className={css.additionalInfoLinks}>
          <NavLink
            to="cast"
            state={{
              from: backLinkHref,
              movies: previousMovies,
              query: previousQuery,
            }}
            className={generateActiveClass}
          >
            Cast
          </NavLink>
          <NavLink
            to="reviews"
            state={{
              from: backLinkHref,
              movies: previousMovies,
              query: previousQuery,
            }}
            className={generateActiveClass}
          >
            Reviews
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
