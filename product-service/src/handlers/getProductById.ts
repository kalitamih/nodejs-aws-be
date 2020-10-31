import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import 'source-map-support/register';
import productService from '../services/productService';
import { Headers } from '../utils/constants';

export const handle = async (event: APIGatewayProxyEvent, _context: Context) => {
    const { productId } =  event.pathParameters;
 
    try {
        const id = parseInt(productId, 10);
        if(isNaN(id)) {
            return {
                statusCode: 422,
                body: JSON.stringify({
                    error: "ProductId id invalid!",
                }, null, 2),
                headers: Headers,
            };
        }

        const product = await productService.getProduct(id);

        if(!product) {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    error: "Product not found!",
                }, null, 2),
                headers: Headers,
            };
        }
        return {
            statusCode: 200,
            body: JSON.stringify({
                ...product,
            }, null, 2),
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
