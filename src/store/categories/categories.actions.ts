import { Action, ActionWithPayload, createAction } from "../../utils/reducers/reducers.utils";
import { Category, SET_CATEGORIES_TYPES } from "./categories.types";


export type IfetchCategoriesStart = Action<SET_CATEGORIES_TYPES.FETCH_CATEGORIES_START>;
export type IfetchCategoriesSucess = ActionWithPayload<SET_CATEGORIES_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>;
export type IfetchCategoriesFailed = ActionWithPayload<SET_CATEGORIES_TYPES.FETCH_CATEGORIES_FAILED, Error>;

export type ICategoryAction =
    IfetchCategoriesFailed
    | IfetchCategoriesStart
    | IfetchCategoriesSucess


export const fetchCategoriesStart = (): IfetchCategoriesStart => createAction(SET_CATEGORIES_TYPES.FETCH_CATEGORIES_START);
export const fetchCategoriesSuccess = (categories: Category[]): IfetchCategoriesSucess => createAction(SET_CATEGORIES_TYPES.FETCH_CATEGORIES_SUCCESS, categories);
export const fetchCategoriesFailed = (error: Error): IfetchCategoriesFailed => createAction(SET_CATEGORIES_TYPES.FETCH_CATEGORIES_FAILED, error);

//no longer use in saga
// export const fetchCategoriesAsync = () => async (dispatch) => {
//     try {
//         dispatch(fetchCategoriesStart());
//         const categories = await getCategoriesAndDocuments();
//         dispatch(fetchCategoriesSuccess(categories));
//     } catch (error) {
//         dispatch(fetchCategoriesFailed(error));
//     }
// }