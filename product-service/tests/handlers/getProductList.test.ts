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
          uuid: '111',
          name: 'Product1',
          price: 100
      }]));

      const result =  await handle(null, null);
      
      expect(result.statusCode).toEqual(200);   
    });
});