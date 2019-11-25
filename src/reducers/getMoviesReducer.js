const initialState = {
  fetching: false,
  list: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_MOVIES_REQUEST":
      return { ...state, fetching: true };
    case "GET_MOVIES_SUCCESS":
      return { ...state, fetching: false, list: action.payload };
    case "INCREMENT_LIKE":
      return {
        ...state,
        list: state.list.map((l, i) =>
          i === action.payload.index
            ? {
                ...l,
                scenes: l.scenes.map(s =>
                  s.sceneName === action.payload.sceneName
                    ? { ...s, likes: s.likes + 1, isliked: true }
                    : { ...s }
                )
              }
            : { ...l }
        )
      };
    case "DECREMENT_LIKE":
      return {
        ...state,
        list: state.list.map((l, i) =>
          i === action.payload.index
            ? {
                ...l,
                scenes: l.scenes.map(s =>
                  s.sceneName === action.payload.sceneName
                    ? { ...s, likes: s.likes - 1, isliked: false }
                    : { ...s }
                )
              }
            : { ...l }
        )
      };
    default:
      return state;
  }
};
