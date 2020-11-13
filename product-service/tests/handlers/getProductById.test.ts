import { handle } from "../../src/handlers/getProductById";
import productService from "../../src/services/productService";
import { event } from "../mockApiGateway";

describe('getProducById', () => { 

    it('statusResponse 400', async () => {
        event.pathParameters = {
          productId: 'yes'
        }
        const result =  await handle(event, null);
        expect(result.statusCode).toEqual(400);   
    });

    it('statusResponse 404', async () => {

      event.pathParameters = {
        productId: '9cedbdd7-a4f1-495c-a6b3-1f2e2c086dbe'
      }
 
      jest
        .spyOn(productService, 'getProduct')
        .mockImplementation(() => null);

      const result =  await handle(event, null);
      
      expect(result.statusCode).toEqual(404);   
    });

    it('statusResponse 500', async () => {

      event.pathParameters = {
        productId: '9cedbdd7-a4f1-495c-a6b3-1f2e2c086dbe'
      }
 
      jest
        .spyOn(productService, 'getProduct')
        .mockImplementation(() => { throw new Error();});

      const result =  await handle(event, null);
      
      expect(result.statusCode).toEqual(500);   
    });

    it('statusResponse 200', async () => {

      event.pathParameters = {
        productId: '9cedbdd7-a4f1-495c-a6b3-1f2e2c086dbe'
      }
 
      jest
        .spyOn(productService, 'getProduct')
        .mockImplementation(() => Promise.resolve({
          uuid: '9cedbdd7-a4f1-495c-a6b3-1f2e2c086dbe',
          title: 'Product1',
          price: 100,
          count: 10,
          description: 'Best Product', 
          inages: '/images/default.jpg'     
      }));

      const result =  await handle(event, null);
      
      expect(result.statusCode).toEqual(200);   
    });
});