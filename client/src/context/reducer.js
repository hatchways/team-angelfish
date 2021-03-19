export const initialState = {
  authenticated: false,
  user: {},
  loading: true,
};

export const userReducer = (initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...initialState,
        loading: true,
      };
    case "AUTHENTICATED":
      return {
        ...initialState,
        authenticated: true,
        user: action.payload.user,
        loading: false,
      };
    case "UNAUTHENTICATED":
      return {
        ...initialState,
        authenticated: false,
        user: null,
        loading: false,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
