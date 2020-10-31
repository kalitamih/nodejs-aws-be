interface Product  {
    count: number,
    description: string,
    id: string,
    price: number,
    title: string,
    image: string
}

interface IProductHandler {
    getProduct(id: number): Promise<Product>;
    getListProduct(): Promise<Product[]>;
}

interface IProductService {
    getProduct(id: number): Promise<Product>;
    getProducts(): Promise<Product[]>;
}

export {
    Product,
    IProductHandler,
    IProductService
}