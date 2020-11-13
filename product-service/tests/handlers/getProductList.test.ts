import { handle } from "../../src/handlers/getProductList";
import productService from "../../src/services/productService";

describe('getProducById', () => { 
    it('statusResponse 404', async () => {

      jest
        .spyOn(productService, 'getProducts')
        .mockImplementation(() => null);

      const result =  await handle(null, null);
      
      expect(result.statusCode).toEqual(404);   
    });

    it('statusResponse 500', async () => {

      jest
        .spyOn(productService, 'getProducts')
        .mockImplementation(() => { throw new Error();});

      const result =  await handle(null, null);
      
      expect(result.statusCode).toEqual(500);   
    });

    it('statusResponse 200', async () => {
 
      jest
        .spyOn(productService, 'getProducts')
        .mockImplementation(() => Promise.resolve([{
          uuid: '9cedbdd7-a4f1-495c-a6b3-1f2e2c086dbe',
          title: 'Product1',
          price: 100,
          count: 10,
          description: 'Best Product',
          image: 'images/default.jpg'       
      }]));

      const result =  await handle(null, null);
      
      expect(result.statusCode).toEqual(200);   
    });
});