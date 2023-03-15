import { useEffect, useState } from 'react'
import './index.style';
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/product-card';
import { CategoryContainer, Title } from './index.style'
import { useSelector } from 'react-redux';
import { selectCategoriesIsLoading, selectcategoriesMap } from '../../store/categories/categories.selector';
import Spinner from '../../components/spinner/index';
import { CategoryItem } from '../../store/categories/categories.types';

type CategoryRouteParams = {
    category: string
}

export default function Category() {
    const { category } = useParams<CategoryRouteParams>() as CategoryRouteParams; //enforce the category to always be a string not undefined
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
