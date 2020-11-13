import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import 'source-map-support/register';
import productService from '../services/productService';
import { Headers, regexUUID } from '../utils/constants';

export const handle = async (event: APIGatewayProxyEvent, _context: Context) => { 
    try {
        console.log(event);
        const { productId } =  event.pathParameters;   
        if(!regexUUID.test(productId)) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: "Invalid format product id!",
                }, null, 2),
                headers: Headers,
            };  
        }

        const product = await productService.getProduct(productId);

        if(!product) {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: "Product not found!",
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
    } catch(error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Server error!",
            }, null, 2),
            headers: Headers,
        };
    }
}
