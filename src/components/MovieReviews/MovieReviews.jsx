import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { movieReviews } from "../../api/movies-api";
import css from "./MovieReviews.module.css";
import toast, { Toaster } from "react-hot-toast";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const data = await movieReviews(movieId);
        setReviews(data.results);
      } catch {
        // console.error("Error fetching movie reviews!");
        toast.error("An error occurred while fetching for movie reviews.", {
          duration: 2500,
          position: "top-center",
          style: {
            background: "#ffcccb",
          },
        });
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  return (
    <div className={css.container}>
      {reviews.length > 0 ? (
        <ul className={css.reviewList}>
          {reviews.map((review) => (
            <li key={review.id} className={css.reviewItem}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available for this movie.</p>
      )}
      <Toaster />
    </div>
  );
};

export default MovieReviews;
