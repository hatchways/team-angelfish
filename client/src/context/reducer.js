export const initialState = {
  authenticated: false,
  user: {},
  cart: { flights: [], hotels: [], rentalCar: [] },
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
        cart: {
          ...initialState.cart,
          [action.purhcaseType]: [
            ...initialState.cart[action.purhcaseType],
            action.item,
          ],
        },
      };
    case "REMOVE_FROM_CART":
      return {
        ...initialState,
        cart: {
          ...initialState.cart,
          [action.purchaseType]: [],
        },
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
