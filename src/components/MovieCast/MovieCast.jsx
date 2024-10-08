import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { movieCredits } from "../../api/movies-api";
import css from "./MovieCast.module.css";
import toast, { Toaster } from "react-hot-toast";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        const data = await movieCredits(movieId);
        setCast(data.cast);
      } catch {
        // console.error("Error fetching movie cast!");
        toast.error("An error occurred while fetching for movie cast.", {
          duration: 2500,
          position: "top-center",
          style: {
            background: "#ffcccb",
          },
        });
      }
    };

    fetchMovieCast();
  }, [movieId]);

  return (
    <div className={css.container}>
      <ul className={css.castList}>
        {cast.map((actor) => (
          <li key={actor.id} className={css.castItem}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : "https://via.placeholder.com/200x300?text=No+Image"
              }
              alt={actor.name}
              className={css.actorImage}
            />
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
      <Toaster />
    </div>
  );
};

export default MovieCast;
