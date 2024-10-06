import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org";
axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjgxZTY2ZWRhYzllZmUyMWNjOTc0MGFhYzUxMzYxMSIsIm5iZiI6MTcyODExOTUxOC42ODM2MTIsInN1YiI6IjY3MDBmYTE3ZTQ4MDE0OTE0Njg1NTVjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zbgxWR0iwNjy9HEOHUi7HekrbKiKv8rOzNJneaYqFCE"}`;

export const trendingMovie = async () => {
  const { data } = await axios.get(`/3/trending/movie/day`);
  return data;
};

export const searchMovie = async (query) => {
  const { data } = await axios.get(`/3/search/movie?query=${query}`);
  return data;
};

export const movieDetails = async (movieId) => {
  const { data } = await axios.get(`/3/movie/${movieId}`);
  return data;
};

export const movieCredits = async (movieId) => {
  const { data } = await axios.get(`/3/movie/${movieId}/credits`);
  return data;
};

export const movieReviews = async (movieId) => {
  const { data } = await axios.get(`/3/movie/${movieId}/reviews`);
  return data;
};
