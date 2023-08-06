export interface IProduct {
    id: number | string,
    name: string,
    price: number,
    description: string,
    image: string,
    categoryId: number
}

export interface ICategory {
    id: number | string,
    name: string,
}