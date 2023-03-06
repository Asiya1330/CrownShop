import React from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../../components/spinner';
import { selectCategoriesIsLoading, selectcategoriesMap } from '../../store/categories/categories.selector';
import CategoryPreview from '../category-preview';

export default function CategoriesPreview() {
    const categoriesMap = useSelector(selectcategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    return (
        <>
            {isLoading ? <Spinner /> :
                Object.keys(categoriesMap).map((category) => {
                    const products = categoriesMap[category];
                    return (
                        <CategoryPreview key={category} title={category} products={products} />
                    )
                })
            }
        </>
    )
}
