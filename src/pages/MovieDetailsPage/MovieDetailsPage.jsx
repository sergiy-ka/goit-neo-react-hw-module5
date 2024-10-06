import { useState, useEffect } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { movieDetails } from "../../api/movies-api";
import styles from "./MovieDetailsPage.module.css";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLinkHref = location.state?.from ?? "/";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await movieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <Link to={backLinkHref} className={styles.backLink}>
        Go back
      </Link>
      <div className={styles.containerMovie}>
        <div className={styles.containerImg}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className={styles.poster}
          />
        </div>
        <div className={styles.containerInfo}>
          <h1>
            {movie.title}{" "}
            {"(" + new Date(movie.release_date).getFullYear() + ")"}
          </h1>
          <p>User Score: {movie.vote_average * 10}%</p>
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
      <div className={styles.additionalInfo}>
        <h4>Additional information</h4>
        <Link to="cast" state={{ from: backLinkHref }} className={styles.link}>
          Cast
        </Link>
        <Link
          to="reviews"
          state={{ from: backLinkHref }}
          className={styles.link}
        >
          Reviews
        </Link>
      </div>
      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
