import { createSelector } from "reselect";
import { IRootState } from "../store";
import { ICartInitialState } from "./cart.reducer";

const selectCartReducer = (state: IRootState): ICartInitialState => state.cart;

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems
)

export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems && cartItems.reduce((count, item) => count + item.quantity, 0)
)

export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems && cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
)

export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.isCartOpen
)
