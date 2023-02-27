import React, { createContext, useEffect, useState } from 'react';
import { SHOP_DATA } from '../shop-data.js';
import { addCollectionAndDocuments, getCategoriesAndDocuments } from '../utils/firebase/firebase.utils'

export const CategoriesContext = createContext({
    categoriesMap: {},
    setCategoriesMap: () => null
})

export default function CategoriesProvider({ children }) {
    const [categoriesMap, setCategoriesMap] = useState({});
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, [])

    useEffect(() => {
        const fetchCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap)
        }
        fetchCategoriesMap();
    }, [])
    const value = { categoriesMap, setCategoriesMap }
    return (
        <CategoriesContext.Provider value={value}> {children}</CategoriesContext.Provider>
    )
}
