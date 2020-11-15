import { handle } from "../../src/handlers/importProductsFile";
import S3 from "aws-sdk/clients/s3";
import { event } from "../mockApiGateway";

describe('importProductsFile', () => { 
    afterAll(() => {
        jest.restoreAllMocks();
    });
    
    it('statusResponse 200 and return test signed url', async () => { 
        jest.spyOn(S3.prototype, 'getSignedUrlPromise').mockImplementation(() => Promise.resolve('test'));

        event.queryStringParameters = { name: "example.csv"};

        const result = await handle(event, null);
        const body = JSON.parse(result.body);
        
        expect(result.statusCode).toEqual(200);   
        expect(body.signedUrl).toEqual('test');  
    });

    it('statusResponse 500', async () => { 
        jest.spyOn(S3.prototype, 'getSignedUrlPromise').mockImplementation(() => Promise.reject('testError'));

        event.queryStringParameters = { name: "example.csv"};

        const result = await handle(event, null);
        const body = JSON.parse(result.body);
        
        expect(result.statusCode).toEqual(500);   
        expect(body.message).toEqual('Server error!');  
    });
});