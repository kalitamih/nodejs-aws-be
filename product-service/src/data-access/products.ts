import pg from "pg";
import { IProductHandler, Product } from "../utils/interfaces";
import dbCreds from "./dbCreds";


class ProductHandler implements IProductHandler {
    async getProduct(id: string): Promise<Product> {
        const client = new pg.Client(dbCreds);      
        try {
            client.connect();
            console.log(id);
            const result = await client.query(
                `SELECT products.id AS id, title, description, image, price * 0.01 AS price, 
                    (SELECT count FROM stocks WHERE stocks.product_id = '${id}') AS count 
                    FROM products WHERE products.id = '${id}';`
            );
            console.log(result);
            const products = result.rows as Product[];
            return products[0];
        } finally {
            await client.end();
        }
    }

    async getListProduct(): Promise<Product[]> {
        const client = new pg.Client(dbCreds);
        client.connect();
        try {
           
            const result = await client.query(
                `SELECT products.id AS id, title, description, image, price * 0.01 AS price, stocks.count AS count
                    FROM products LEFT JOIN stocks ON products.id = stocks.product_id;`
            );
            const products = result.rows as Product[];
            return products;
        } finally {
            client.end();
        }
    }

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