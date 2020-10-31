import { IProductHandler, Product } from "../utils/interfaces";
import { Products } from "../utils/mockData";

class ProductHandler implements IProductHandler {
    async getProduct(id: number): Promise<Product> {
        return Products[id];
    }

    async getListProduct(): Promise<Product[]> {
        return Products;
    }
}

const productHandler = new ProductHandler;

export default productHandler;