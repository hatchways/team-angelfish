export const initialState = {
  authenticated: false,
  user: {},
};

export const userReducer = (initialState, action) => {
  switch (action.type) {
    case "AUTHENTICATED":
      return {
        ...initialState,
        authenticated: true,
        user: action.payload.user,
      };
    case "UNAUTHENTICATED":
      return {
        ...initialState,
        authenticated: false,
        user: null,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
