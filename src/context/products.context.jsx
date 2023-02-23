import React, { createContext, useState } from 'react';
import SHOP_DATA from '../shop-data.json'

export const ProductsContext = createContext({
    products: [],
    setShopData: () => null
})

export default function ProductsProvider({ children }) {
    const [products, setShopData] = useState(SHOP_DATA);
    const value = { products, setShopData }
    return (
        <ProductsContext.Provider value={value}> {children}</ProductsContext.Provider>
    )
}
