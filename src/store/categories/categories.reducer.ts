import { ICategoryAction } from "./categories.actions";
import { Category, SET_CATEGORIES_TYPES } from "./categories.types";

export type ICategoriesInitialState = {
    readonly isLoading: boolean;
    readonly categories: Category[];
    readonly error: Error | null;
}

const INITIAL_STATE: ICategoriesInitialState = {
    categories: [],
    isLoading: false,
    error: null
}



export const categoriesReducer =
    (
        state = INITIAL_STATE,
        action = {} as ICategoryAction
    ): ICategoriesInitialState => {
        switch (action.type) {
            case SET_CATEGORIES_TYPES.FETCH_CATEGORIES_START:
                return {
                    ...state,
                    isLoading: true,
                }
            case SET_CATEGORIES_TYPES.FETCH_CATEGORIES_SUCCESS:
                return {
                    ...state,
                    isLoading: false,
                    categories: action.payload
                }
            case SET_CATEGORIES_TYPES.FETCH_CATEGORIES_FAILED:
                return {
                    ...state,
                    isLoading: false,
                    error: action.payload
                }
            default:
                return state
        }
    }