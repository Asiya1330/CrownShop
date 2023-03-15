import { createSelector } from 'reselect';
import { IRootState } from '../store';
import { ICategoriesInitialState } from './categories.reducer';
import { ICategoryMap } from './categories.types';

const selectCategoriesReducer = (state: IRootState): ICategoriesInitialState => state.categories;
/**
 * CreateSelector memoize selector and only run if we have different output.. 
 * becuase we have pure function
 * 
 * createSelector have two inputs
 *  inputSection []
 *  OutputSection ()=>{}
 * 
 */
const selectcategories = createSelector(
    [selectCategoriesReducer],
    (categoriesSlice) => categoriesSlice.categories
)

export const selectcategoriesMap = createSelector(
    [selectcategories],
    (categories) => categories.reduce((acc, category) => {
        acc[category.title.toLowerCase()] = category.items;
        return acc
    }, {} as ICategoryMap)
)
export const selectCategoriesIsLoading = createSelector(
    [selectCategoriesReducer],
    (categoriesSlice) => categoriesSlice.isLoading
)
