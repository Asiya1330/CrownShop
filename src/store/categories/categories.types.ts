// convert this into ennumas enumhas fixed values, and not changeable
//enum is datastructure, introduced in ts
export const enum SET_CATEGORIES_TYPES {
    FETCH_CATEGORIES_START = 'category/FETCH_CATEGORIES_START',
    FETCH_CATEGORIES_SUCCESS = 'category/FETCH_CATEGORIES_SUCCESS',
    FETCH_CATEGORIES_FAILED = 'category/FETCH_CATEGORIES_FAILED'
}

//one category-item shape
export type CategoryItem = {
    id: number
    imageUrl: string,
    name: string,
    price: number
}

//one category shape
export type Category = {
    title: string,
    imageUrl: string
    items: CategoryItem[]
}

export type ICategoryMap = {
    [key: string]: CategoryItem[]
}
