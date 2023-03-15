import { AnyAction } from "redux";
import { CART_ACTION_TYPES, ICartItem } from "./cart.types";

// state is immmtable
export type ICartInitialState = {
    readonly isCartOpen: boolean;
    readonly cartItems: ICartItem[];
    readonly cartCount: number;
    readonly cartTotal: number;
}
const INITIAL_STATE: ICartInitialState = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

export const cartReducer = (state = INITIAL_STATE, action: AnyAction): ICartInitialState => {
    switch (action.type) {
        case CART_ACTION_TYPES.SET_CART:
            return {
                ...state,
                cartItems: action.payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: !(state.isCartOpen)
            }
        default:
            return state
    }
}

