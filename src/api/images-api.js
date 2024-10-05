import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";
axios.defaults.headers.common[
  "Authorization"
] = `Client-ID ${"wwRK_xEuqhYpbpxqL-IKLbk9FXW3uJDGqqPP-hfErIQ"}`;

export const fetchImages = async (query, page) => {
  const { data } = await axios.get(
    `/search/photos?query=${query}&page=${page}&per_page=12`
  );
  return data;
};
