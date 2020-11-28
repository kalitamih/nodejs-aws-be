import pg from "pg";
import { IProductHandler, Product } from "../utils/interfaces";
import dbCreds from "./dbCreds";

class ProductHandler implements IProductHandler {
    async createProduct(product: Product): Promise<void> {
        const client = new pg.Client(dbCreds);      
        try {
            const { title, description, price, count } = product;
            client.connect();
            await client.query('BEGIN');            
            const queryProduct = {
                text: 'INSERT INTO products (title, description, price) VALUES($1, $2, $3) RETURNING id',
                values: [title, description, price],
            }
            const result = await client.query(queryProduct);
            const queryStock = {
                text: 'INSERT INTO stocks (product_id, count) VALUES($1, $2)',
                values: [result.rows[0].id, count],
            }
            await client.query(queryStock);
            await client.query('COMMIT');
            return;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.end();
        }
    }
}

const productHandler = new ProductHandler();

export default productHandler;