import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import 'source-map-support/register';
import productService from '../services/productService';
import { Headers } from '../utils/constants';

export const handle = async (event: APIGatewayProxyEvent, _context: Context) => {   
    try {
        console.log(event);
        const products = await productService.getProducts();
        if(!Array.isArray(products)) {
            return {
                statusCode: 404,
                body: JSON.stringify({
                    message: "Products not found!",
                }, null, 2),
                headers: Headers,
            };
        }

        console.log(products);

        return {
            statusCode: 200,
            body: JSON.stringify(products),
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

