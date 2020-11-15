import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'import-service',
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
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
    iamRoleStatements: [ 
      {
        Effect: "Allow",        
        Action: ["s3:ListBucket"], 
        Resource: "arn:aws:s3:::kalitamih-task5"
      },
      {
        Effect: "Allow",        
        Action: ["s3:*"], 
        Resource: "arn:aws:s3:::kalitamih-task5/uploaded/*"
      },
      {
        Effect: "Allow",        
        Action: ["s3:*"], 
        Resource: "arn:aws:s3:::kalitamih-task5/parsed/*"
      }
    ],
  },
  functions: {
    importProductsFile: {
      handler: 'src/handlers/importProductsFile.handle',
      events: [
        {
          http: {
            method: 'get',
            path: 'import',
            cors: true,   
            request: {
              parameters: {
                querystrings: {                      
                  name: true,         
                }                
              }        
            },   
          }
        }
      ],
    },
    importFileParser: {
      handler: 'src/handlers/importFileParser.handle',
      events: [
        {
          s3: {
            bucket: 'kalitamih-task5',
            event: 's3:ObjectCreated:*',
            rules: [
              {
                prefix: 'uploaded/',
                suffix: '.csv'
              }
            ],
            existing: true
          }
        }
      ],
    }
  }
}

module.exports = serverlessConfiguration;
