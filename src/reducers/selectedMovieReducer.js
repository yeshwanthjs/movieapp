export default (state = {}, action) => {
  switch (action.type) {
    case "SELECTED_MOVIE":
      return {
        result: action.payload
      };
    default:
      return state;
  }
};
