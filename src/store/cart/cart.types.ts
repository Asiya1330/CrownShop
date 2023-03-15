import { CategoryItem } from "../categories/categories.types";

export enum CART_ACTION_TYPES {
    SET_CART= 'cart/SET_CART',
    SET_IS_CART_OPEN= 'cart/SET_IS_CART_OPEN'
}


export type ICartItem = CategoryItem & {
    quantity: number
}