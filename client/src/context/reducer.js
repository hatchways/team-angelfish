export const initialState = {
  authenticated: false,
  user: {},
  cart: [],
};

export const userReducer = (initialState, action) => {
  console.log(action);
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
    case "ADD_TO_CART":
      return {
        ...initialState,
        cart: [...initialState.cart, action.item],
      };
    case "REMOVE_FROM_CART":
      const indOfItem = action.index;
      const newCart = [...initialState.cart];
      const filteredCart = newCart.filter((_, ind) => ind !== indOfItem);
      return {
        ...initialState,
        cart: filteredCart,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
