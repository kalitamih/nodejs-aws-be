interface Product  {
    count: number,
    description: string,
    id?: string,
    price: number,
    title: string,
    image?: string
}

interface IProductHandler {
    createProduct(products: Product): Promise<void>;
}

export {
    Product,
    IProductHandler,
}