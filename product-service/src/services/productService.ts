import productHandler from "../data-access/products";
import { IProductHandler, IProductService, Product } from "../utils/interfaces";

class ProductService implements  IProductService  {
    constructor (private _productHandler: IProductHandler) {}

    async getProduct(id: number): Promise<Product> {
        return this._productHandler.getProduct(id - 1);
    }

    async getProducts(): Promise<Product[]> {
        return this._productHandler.getListProduct();
    }
}

const productService = new ProductService(productHandler);

export default productService;