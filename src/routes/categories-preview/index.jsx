import React, { useContext } from 'react';
import { CategoriesContext } from '../../context/categories.context';
import CategoryPreview from '../category-preview';

export default function CategoriesPreview() {
    const { categoriesMap } = useContext(CategoriesContext)

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
