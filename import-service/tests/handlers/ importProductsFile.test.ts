import { handle } from "../../src/handlers/importProductsFile";
import * as AWSMock from 'aws-sdk-mock';

describe('importProductsFile', () => { 
   
    it('statusResponse 200', async () => {  

      await AWSMock.mock('S3', 'getSignedUrlPromise', 'test');
 
      const result = await handle(null, null);
      
      expect(result.statusCode).toEqual(200);   
      expect(result.body).toEqual(200);  
    });
});