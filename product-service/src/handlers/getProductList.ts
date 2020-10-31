import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import 'source-map-support/register';
import productService from '../services/productService';
import { Headers } from '../utils/constants';

export const handle = async (_event: APIGatewayProxyEvent, _context: Context) => {
    try {
        const products = await productService.getProducts();

        if(!Array.isArray(products)) {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    error: "Products not found!",
                }, null, 2),
                headers: Headers,
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(products),
            headers: Headers,          
        };
    } catch(err) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: "Server error!",
            }, null, 2),
            headers: Headers,
        };
    }
}
