// import { takeLatest, all, call, put } from 'redux-saga/effects';
// import { takeLatest, all, call, put } from 'typed-redux-saga'; //use typed saga for typing generators
import { takeLatest, all, call, put } from 'typed-redux-saga/macro'; //leverage babel things


import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesFailed, fetchCategoriesSuccess } from './categories.actions';
import { SET_CATEGORIES_TYPES } from './categories.types';

export function* fetchCategoriesAsync() {
    try {
        //generator effect yield* call(functionaName, parameters)
        const categories = yield* call(getCategoriesAndDocuments); //use yield* instead of yield in typed-saga
        // dispatch(fetchCategoriesSuccess(categories));
        //not dispatch in generator
        yield* put(fetchCategoriesSuccess(categories))
    } catch (error) {
        yield* put(fetchCategoriesFailed(error as Error))

    }
}

export function* onFetchCategories() {
    //takeLatest takes latest action and do something
    // like if button presses mul times, it only take latest action 

    //listening to FETCH_CAT_START...when dispatched.. it will return here and call fetchCategoriesAsync
    yield* takeLatest(SET_CATEGORIES_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}


//whenever action happen, saga do something with it like reducer
export function* categoriesSaga() {
    //yield* -> pause function
    yield* all([call(onFetchCategories)]); //run everything inside and only complete when all of is done
}