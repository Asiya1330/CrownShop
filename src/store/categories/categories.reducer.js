import { SET_CATEGORIES_TYPES } from "./categories.types";

const INITIAL_STATE = {
    categories: [],
    isLoading: false,
    error: null
}

export const categoriesReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_CATEGORIES_TYPES.FETCH_CATEGORIES_START:
            return {
                ...state,
                isLoading: true,
            }
        case SET_CATEGORIES_TYPES.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                categories: payload
            }
        case SET_CATEGORIES_TYPES.FETCH_CATEGORIES_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        default:
            return state
    }
}