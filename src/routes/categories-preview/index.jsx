import React from 'react';
import { useSelector } from 'react-redux';
import { selectcategoriesMap } from '../../store/categories/categories.selector';
import CategoryPreview from '../category-preview';

export default function CategoriesPreview() {
    const categoriesMap = useSelector(selectcategoriesMap);

    return (
        <>
            {
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
