import React, { useContext } from 'react';
import ProductCard from '../../components/product-card';
import ProductsProvider, { ProductsContext } from '../../context/products.context';
import './index.scss'
export default function Shop() {

  const { products } = useContext(ProductsContext)

  return (
    // <ProductsProvider>
    <div className='shop'>
      {
        products.map((product) => {
          return <ProductCard key={product.id} product={product} />
        })
      }
    </div>
    // </ProductsProvider>
  )
}
