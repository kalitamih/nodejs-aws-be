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

enum PriceFilter {
    GT300 = "GT300",
    LTE300 = "LTE300"
}

export {
    Product,
    IProductHandler,
    PriceFilter 
}