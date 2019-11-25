import axios from "axios";

const MOVIES_ENDPOINT = "movieData.json";

export const getMovies = _ => axios.get(`/${MOVIES_ENDPOINT}`);
