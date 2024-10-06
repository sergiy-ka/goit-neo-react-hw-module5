import { Link } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movies, query }) => {
  const currentPath = window.location.pathname;

  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.item}>
          <Link
            to={`/movies/${movie.id}`}
            state={{
              from: currentPath,
              movies,
              query,
            }}
            className={css.link}
          >
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
