import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'product-service',
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
      models: [
        {     
          name: "NoContentResponse",
          description: "No content!",
          contentType: "application/json",
          schema: {
            type: "object",
            properties: {
                message: {
                  type: "string"
                }
            },
        }                       
        },
        {     
            name: "ErrorResponse",
            description: "This is an error",
            contentType: "application/json",
            schema: {
                type: "object",
                properties: {
                    message: {
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
                      type: "string",
                      format: "uuid"
                    },
                    price: {
                      type: "number"
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
                            type: "string",
                             format: "uuid"
                        },
                        price: {
                            type: "number"
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
          },        

      ],
      
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack', 'serverless-offline', 'serverless-aws-documentation'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    stage: '${opt:stage, \'dev\'}',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      DB_USER: '${opt:DB_USER}',
      DB_PASSWORD:'${opt:DB_PASSWORD}',
      DB_HOST: '${opt:DB_HOST}',
      DB_PORT: '${opt:DB_PORT}',
      DB_NAME: '${opt:DB_NAME}',
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
                  statusCode: 400,
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
                  required: true
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
                    statusCode: 400,
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
    createProduct: {
      handler: 'src/handlers/createProduct.handle',
      events: [
        {
          http: {
            method: 'post',
            path: 'products',
            cors: {
              // @ts-ignore
              origin: "*", 
              headers: [
                "Content-Type",
                "X-Amz-Date",
                "Authorization",
                "X-Api-Key",
                "X-Amz-Security-Token",
                "X-Amz-User-Agent",
                "Cache-Control"
               ]                    
            },           
            request: {
              schema: {
                "application/json":  "${file(product.json)}"
              }              
            },             
              // @ts-ignore
            documentation: {
                tags: [
                  "CreateProduct"
                ],              
                methodResponses: [
                  {
                    statusCode: 200,
                    responseModels: {
                      "application/json": "ProductResponse"
                    }
                  },
                  {
                    statusCode: 400,
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
  },
  Resources: {
    GatewayResponseDefault4XX: {
      Type: 'AWS::ApiGateway::GatewayResponse',
      Properties: {
        ResponseParameters: {          
          "gatewayresponse.header.Access-Control-Allow-Origin": "'*'", 
          "gatewayresponse.header.Access-Control-Allow-Headers": "'*'"
        },
        ResponseType: "DEFAULT_4XX",
        RestApiId: {
          Ref: 'ApiGatewayRestApi'
        }
      }
    },
    GatewayResponseDefault5XX: {
      Type: 'AWS::ApiGateway::GatewayResponse',
      Properties: {
        ResponseParameters: {          
          "gatewayresponse.header.Access-Control-Allow-Origin": "'*'", 
          "gatewayresponse.header.Access-Control-Allow-Headers": "'*'"
        },
        ResponseType: "DEFAULT_4XX",
        RestApiId: {
          Ref: 'ApiGatewayRestApi'
        }
      },
    },
  },
  
}

module.exports = serverlessConfiguration;
