const messageReducer = (
  state = {
    messages: [],
  },
  action
) => {
  switch (action.type) {
    case "GETALLMESSAGES":
      return { ...state, messages: [...action.data] };

    case "STARTLOADING":
      return { ...state, loading: true };

    case "ENDLOADING":
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default messageReducer;
