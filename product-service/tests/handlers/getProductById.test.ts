import { handle } from "../../src/handlers/getProductById";
import productService from "../../src/services/productService";
import { event } from "../mockApiGateway";

describe('getProducById', () => { 

    it('statusResponse 422', async () => {
        event.pathParameters = {
          productId: 'yes'
        }
        const result =  await handle(event, null);
        expect(result.statusCode).toEqual(422);   
    });

    it('statusResponse 404', async () => {

      event.pathParameters = {
        productId: '100'
      }
 
      jest
        .spyOn(productService, 'getProduct')
        .mockImplementation(() => null);

      const result =  await handle(event, null);
      
      expect(result.statusCode).toEqual(404);   
    });

    it('statusResponse 500', async () => {

      event.pathParameters = {
        productId: '100'
      }
 
      jest
        .spyOn(productService, 'getProduct')
        .mockImplementation(() => { throw new Error();});

      const result =  await handle(event, null);
      
      expect(result.statusCode).toEqual(500);   
    });

    it('statusResponse 200', async () => {

      event.pathParameters = {
        productId: '100'
      }
 
      jest
        .spyOn(productService, 'getProduct')
        .mockImplementation(() => Promise.resolve({
          uuid: '111',
          name: 'Product1',
          price: 100
      }));

      const result =  await handle(event, null);
      
      expect(result.statusCode).toEqual(200);   
    });
});