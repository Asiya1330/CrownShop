import { createAction } from "../../utils/reducers/reducers.utils";
import { SET_CATEGORIES_TYPES } from "./categories.types";

export const setCategories = (categories) => createAction(SET_CATEGORIES_TYPES.SET_CATEGORIES, categories);

