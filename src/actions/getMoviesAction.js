export const getMovies = _ => {
  return {
    type: "GET_MOVIES_REQUEST"
  };
};

export const getMoviesSuccess = result => {
  return {
    type: "GET_MOVIES_SUCCESS",
    payload: result
  };
};
