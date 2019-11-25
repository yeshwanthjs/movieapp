export const likeIncrement = (index, sceneName) => {
  return {
    type: "INCREMENT_LIKE",
    payload: {
      index,
      sceneName
    }
  };
};

export const likeDecrement = (index, sceneName) => {
  return {
    type: "DECREMENT_LIKE",
    payload: {
      index,
      sceneName
    }
  };
};
