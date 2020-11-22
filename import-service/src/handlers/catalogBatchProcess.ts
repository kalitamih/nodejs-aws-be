import { Context, SQSEvent } from 'aws-lambda';
import SNS from 'aws-sdk/clients/sns';
import productHandler from '../data-access/products';
import { Product } from '../utils/interfaces';

export const handle = async(event: SQSEvent, _context: Context) => {   
    const sns = new SNS({ region: 'eu-west-1' });
    for (const record of event.Records) {
        try {
            const product = JSON.parse(record.body) as Product;
            console.log(product);
            if (!product.count || !product.price || !product.title) {
                continue;
            }
            product.price = Math.round(product.price * 100);
            await productHandler.createProduct(product);
            console.log(process.env.SNS_ARN);
            await sns.publish({
                Message: `${product.title} was created`,
                TopicArn: process.env.SNS_ARN
            }).promise();
        } catch(error) {
            console.log(error);
        }
    }  
}
