/** @format */

export const initialState = {
	authenticated: false,
	user: {},
	cart: { flights: [], hotels: [], rentalCar: [] },
};

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case "LOADING":
			return {
				...initialState,
				loading: true,
			};
		case "AUTHENTICATED":
			return {
				...state,
				authenticated: true,
				user: action.payload.user,
			};
		case "UNAUTHENTICATED":
			return {
				...state,
				authenticated: false,
				user: null,
			};
		case "ADD_TO_CART":
			return {
				...state,
				cart: {
					...state.cart,
					[action.purhcaseType]: [
						...state.cart[action.purhcaseType],
						action.item,
					],
				},
			};
		case "REMOVE_FROM_CART":
			return {
				...state,
				cart: {
					...state.cart,
					[action.purchaseType]: [],
				},
			};
		case "LOG_OUT":
			return initialState;
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};
