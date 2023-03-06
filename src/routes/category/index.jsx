import React, { useEffect, useState } from 'react'
import './index.style.jsx';
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/product-card';
import { CategoryContainer,Title} from'./index.style'
import { useSelector } from 'react-redux';
import { selectCategoriesIsLoading, selectcategoriesMap } from '../../store/categories/categories.selector.js';
import Spinner from '../../components/spinner/index.jsx';

export default function Category() {
    const { category } = useParams();
    const categoriesMap = useSelector(selectcategoriesMap)
    const isLoading = useSelector(selectCategoriesIsLoading);
    // const products = categoriesMap[category] // we can use it, but everytime compoenent mount it redeclafre this..so we use useEffect hook
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    return (
        <>
            <Title>{category.toUpperCase()}</Title>
            {
                isLoading ?
                    <Spinner /> :  
                    <CategoryContainer>
                        <>
                            {products && products.map((product) => {
                                return <ProductCard key={product.id} product={product} />
                            })}
                        </>
                    </CategoryContainer>
            }
        </>
    )
}
