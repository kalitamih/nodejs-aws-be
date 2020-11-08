import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import 'source-map-support/register';
import productService from '../services/productService';
import { Headers } from '../utils/constants';
import { Product } from '../utils/interfaces';

export const handle = async (event: APIGatewayProxyEvent, _context: Context) => {  
    try {    
        const body = JSON.parse(event.body) as Product;  
        body.price = Math.round(body.price * 100);
        await productService.createProduct(body);
        return {
            statusCode: 204,
            body: JSON.stringify({}, null, 2),
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
