import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { createAction } from "../../utils/reducers/reducers.utils";
import { SET_CATEGORIES_TYPES } from "./categories.types";

export const fetchCategoriesStart = () => createAction(SET_CATEGORIES_TYPES.FETCH_CATEGORIES_START);
export const fetchCategoriesSuccess = (categories) => createAction(SET_CATEGORIES_TYPES.FETCH_CATEGORIES_SUCCESS, categories);
export const fetchCategoriesFailed = (error) => createAction(SET_CATEGORIES_TYPES.FETCH_CATEGORIES_FAILED, error);

//no longer use in saga
export const fetchCategoriesAsync = () => async (dispatch) => {
    try {
        dispatch(fetchCategoriesStart());
        const categories = await getCategoriesAndDocuments();
        dispatch(fetchCategoriesSuccess(categories));
    } catch (error) {
        dispatch(fetchCategoriesFailed(error));
    }
}