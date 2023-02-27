import React from 'react'
import ProductCard from '../../components/product-card'
import { CategoryPreviewContainer, Preview, Title } from './index.style';
import { useNavigate } from 'react-router-dom'
export default function CategoryPreview({ title, products }) {
    const navigate = useNavigate();

    const handleCategoryNav = () => navigate(`${title.toLowerCase()}`)
    return (
        <CategoryPreviewContainer>
            <Title onClick={handleCategoryNav}>{title.toUpperCase()}</Title>
            <Preview>
                {
                    products
                        .filter((_, idx) => idx < 4)
                        .map((product) => {
                            return <ProductCard key={product.id} product={product} />
                        })}
            </Preview>
        </CategoryPreviewContainer>
    )
}
