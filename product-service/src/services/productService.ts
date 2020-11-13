import productHandler from "../data-access/products";
import { IProductHandler, IProductService, Product } from "../utils/interfaces";

class ProductService implements  IProductService  {
    constructor (private _productHandler: IProductHandler) {}

    async getProduct(id: string): Promise<Product> {
        return this._productHandler.getProduct(id);
    }

    async getProducts(): Promise<Product[]> {
        return this._productHandler.getListProduct();
    }

    async createProduct(product: Product): Promise<void> {
        return this._productHandler.createProduct(product);
    }
}

const productService = new ProductService(productHandler);

export default productService;