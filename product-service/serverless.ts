import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'product-service',
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    },
    documentation: {
      api: {
        info: {
          version: 1,
          title: "Product Service",
          description: "API fro shoes shop",
          contact: {
            name: "Kalita Mikhail",
            url: "https://github.com/kalitamih",
            email: "mkalita1991@gmail.com"
          },
          license: {
            name: "Licensing",
            url: "https://github.com/kalitamih"
          }
        }
      },
      tags: [
        {
          name: "Get product list",
          description: "List of all products"
        },
        {
          name: "Get product by id",
          description: "Information about a certain item"
        }
      ],
      resources: [
        {
          path: "products/",
          description: "This is the list of all products"
        },
        {
          path: "products/{productId}",
          description: "This is information about a certain item",
          pathParams: [{
            name: "productId",
            description: "Id for product item",
            required: true,
            schema: {
              type: "string",
              pattern: "^[1-9][0-9]*$" 
            }                    
          }],
        }
      ],
      models: [
        {     
            name: "ErrorResponse",
            description: "This is an error",
            contentType: "application/json",
            schema: {
                type: "object",
                properties: {
                    error: {
                      type: "string"
                    }
                },
            }                
        },
        {     
            name: "ProductResponse",
            description: "This is product",
            contentType: "application/json",
            schema: {
                type: "object",
                properties: {                 
                    count: {
                      type: "integer"
                    },
                    description:{
                      type: "string"
                    },
                    id: {
                      type: "string"
                    },
                    price: {
                      type: "integer"
                    },
                    title: {
                      type: "string"
                    },
                    image: {
                      type: "string"
                    },              
                },              
              },    
        },
        {     
          name: "ProductsResponse",
          description: "This is product",
          contentType: "application/json",
          schema: {
              type: "array",           
              items: {
                type: "object",
                properties: {                 
                  count: {
                    type: "integer"
                  },
                  description:{
                    type: "string"
                  },
                  id: {
                    type: "string"
                  },
                  price: {
                    type: "integer"
                  },
                  title: {
                    type: "string"
                  },
                  image: {
                    type: "string"
                  },                 
              },
              }
    
          },    
      },
        

      ],
      
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack', 'serverless-offline', 'serverless-aws-documentation'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  functions: {
    getProductList: {
      handler: 'src/handlers/getProductList.handle',
      events: [
        {
          http: {
            method: 'get',
            path: 'products',
            cors: true,
            // @ts-ignore
            documentation: {
              tags: [
                "Products"
              ],
              methodResponses: [
                {
                  statusCode: 200,
                  responseModels: {
                    "application/json": "ProductsResponse"
                  }
                },
                {
                  statusCode: 422,
                  responseModels: {
                    "application/json": "ErrorResponse"
                  }
                },
                {
                  statusCode: 404,
                  responseModels: {
                    "application/json": "ErrorResponse"
                  }
                },
                {
                  statusCode: 500,
                  responseModels: {
                    "application/json": "ErrorResponse"
                  }
                }
              ]
            }
          }
        }
      ]
    },
    getProductById: {
      handler: 'src/handlers/getProductById.handle',
      events: [
        {
          http: {
            method: 'get',
            path: 'product/{productId}',
            cors: true,
            request: {
              parameters: {
                paths: {
                  productId: true
                }                
              }          
            },             
              // @ts-ignore
            documentation: {
                tags: [
                  "Product"
                ],              
                methodResponses: [
                  {
                    statusCode: 200,
                    responseModels: {
                      "application/json": "ProductResponse"
                    }
                  },
                  {
                    statusCode: 422,
                    responseModels: {
                      "application/json": "ErrorResponse"
                    }
                  },
                  {
                    statusCode: 404,
                    responseModels: {
                      "application/json": "ErrorResponse"
                    }
                  },
                  {
                    statusCode: 500,
                    responseModels: {
                      "application/json": "ErrorResponse"
                    }
                  }
                ]
            }
          }
        }
      ]
    },
  }
}

module.exports = serverlessConfiguration;
