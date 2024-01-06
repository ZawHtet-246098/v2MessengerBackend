const authReducer = (
  state = {
    authData: JSON.parse(localStorage.getItem("userInfo")) || null,
    authError: null,
    allUsers: [],
    messages: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case "AUTH":
      return { ...state, authData: action.data };

    case "LOGIN":
      return { ...state, authData: action.data };

    case "LOGOUT":
      localStorage.clear();
      return { ...state, authData: null };

    case "GETALLUSERS":
      return { ...state, allUsers: [...action.data] };

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

export default authReducer;
