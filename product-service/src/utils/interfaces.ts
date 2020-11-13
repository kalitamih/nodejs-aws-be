interface Product  {
    count: number,
    description: string,
    id?: string,
    price: number,
    title: string,
    image?: string
}

interface IProductHandler {
    getProduct(id: string): Promise<Product>;
    getListProduct(): Promise<Product[]>;
    createProduct(product: Product): Promise<void>;
}

interface IProductService {
    getProduct(id: string): Promise<Product>;
    getProducts(): Promise<Product[]>;
    createProduct(product: Product): Promise<void>;
}

export {
    Product,
    IProductHandler,
    IProductService
}