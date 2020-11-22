import SNS from 'aws-sdk/clients/sns';
import productHandler from "../../src/data-access/products";
import { handle } from "../../src/handlers/catalogBatchProcess";
import { sqsEvent } from "./sqsEvent";

describe('catalogBatchProcess', () => { 

    const sns = new SNS();
    sqsEvent.Records[0].body = '{ "count": 45, "price": 301, "description": "Great boots", "title": "Boots" }';
    sqsEvent.Records[1].body = '{ "count": 35, "price": 299, "description": "Great brogues", "title": "Brogues" }';
    
    beforeAll(async (done) => {
        process.env.SNS_ARN = 'arn:aws:sns:eu-west-1:299662010074:createProductTopic';
        done();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
    
    it('save in DB 2 records without errors', async () => {

        const createProductSpy = jest
            .spyOn(productHandler, 'createProduct')
            .mockImplementation(() => Promise.resolve(null));     

        const publishSNSSpy = jest.spyOn(sns.constructor.prototype, 'publish').mockImplementation(() => null);
        
        await handle(sqsEvent, null);
      
        expect(createProductSpy).toHaveBeenCalledTimes(2);  
        expect(publishSNSSpy).toHaveBeenCalledTimes(2);    
        expect(publishSNSSpy.mock.calls[0][0]).toEqual(
            {
                "Message": "Boots was created",
                "MessageAttributes": {
                    "priceFilter": {
                        "DataType": "String",
                        "StringValue": "GT300",
                    },
                },
                "TopicArn": "arn:aws:sns:eu-west-1:299662010074:createProductTopic",
            }        
        );    
        expect(publishSNSSpy.mock.calls[1][0]).toEqual(
            {
                "Message": "Brogues was created",
                "MessageAttributes": {
                    "priceFilter": {
                        "DataType": "String",
                        "StringValue": "LTE300",
                    },
                },
                "TopicArn": "arn:aws:sns:eu-west-1:299662010074:createProductTopic",
            }        
        );   
    });

    it('not save in DB records because of errors', async () => {

        const createProductSpy = jest
            .spyOn(productHandler, 'createProduct')
            .mockImplementation(() => Promise.reject('test'));

        const publishSNSSpy = jest.spyOn(sns.constructor.prototype, 'publish').mockImplementation(() => null);

        await handle(sqsEvent, null);
      
        expect(createProductSpy).toHaveBeenCalledTimes(2);  
        expect(publishSNSSpy).toHaveBeenCalledTimes(0);
    });

    it('save oonly one record when the second doesn\'t meet validation rules', async () => {

        const createProductSpy = jest
            .spyOn(productHandler, 'createProduct')
            .mockImplementation(() => Promise.resolve(null));
 
        const publishSNSSpy = jest.spyOn(sns.constructor.prototype, 'publish').mockImplementation(() => null);

        sqsEvent.Records[1].body = '{ "count": "a", "price": 299, "description": "Great brogues", "title": "Brogues" }';

        await handle(sqsEvent, null);
      
        expect(createProductSpy).toHaveBeenCalledTimes(1);  
        expect(publishSNSSpy).toHaveBeenCalledTimes(1);
    });
});