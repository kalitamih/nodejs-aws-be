import { Context, SQSEvent } from 'aws-lambda';
import SNS from 'aws-sdk/clients/sns';
import productHandler from '../data-access/products';
import { PriceFilter, Product } from '../utils/interfaces';

export const handle = async(event: SQSEvent, _context: Context) => {   
    const sns = new SNS({ region: 'eu-west-1' });
    for (const record of event.Records) {
        try {
            console.log(record);
            const product = JSON.parse(record.body) as Product;

            if (!product.count || !product.price || !product.title) {
                continue;
            }

            
            product.price = Math.round(product.price * 100);
            await productHandler.createProduct(product);
            const priceFilter = product.price > 30000 ? PriceFilter.GT300 : PriceFilter.LTE300;

            await sns.publish({
                Message: `${product.title} was created`,
                TopicArn: process.env.SNS_ARN, 
                MessageAttributes:  {
                    priceFilter: {
                      DataType: 'String',
                      StringValue: priceFilter
                    }
                }                
            }).promise();
        } catch(error) {
            console.log(error);
        }
    }  
}
