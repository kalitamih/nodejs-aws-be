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
      DB_USER: '${opt:DB_USER}',
      DB_PASSWORD:'${opt:DB_PASSWORD}',
      DB_HOST: '${opt:DB_HOST}',
      DB_PORT: '${opt:DB_PORT}',
      DB_NAME: '${opt:DB_NAME}',
      SQS_URL: { Ref: "SQSQueue" },
      SNS_ARN: { Ref: "SNSTopic" }
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
      },
      { 
        Effect: "Allow",
        Action: "sqs:*",
        Resource: [
          {
             "Fn::GetAtt": [ "SQSQueue", "Arn" ]
          }
        ]
      },
      {
        Effect: "Allow",
        Action: "sns:*",
        Resource: { Ref: "SNSTopic"}
      }
    ],
  },
  resources: {
    Resources: {
      SQSQueue: {
          Type: "AWS::SQS::Queue",
          Properties: {
              QueueName: "kalitamih-task-6"
          }
      },    
      SNSTopic: {
        Type: "AWS::SNS::Topic",
        Properties: {
            TopicName: "createProductTopic"
        }         
      },
      SNSSubscription: {
        Type: "AWS::SNS::Subscription",
        Properties: 
          {
            Endpoint: "kalita2007@yandex.ru",
            Protocol: "email",
            TopicArn: { Ref: "SNSTopic" },
            FilterPolicy: { priceFilter: ['GT300'] }
          }, 
      },
      SNSSubscriptionLTE300: {
        Type: "AWS::SNS::Subscription",
        Properties: 
          {
            Endpoint: "mkalita1991@gmail.com",
            Protocol: "email",
            TopicArn: { Ref: "SNSTopic" },
            FilterPolicy: { priceFilter: ['LTE300'] }
          }, 
      }
    },
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
    },
    catalogBatchProcess: {
      handler: 'src/handlers/catalogBatchProcess.handle',
      events: [
        {
          sqs: {
            batchSize: 5,
            arn: {
              "Fn::GetAtt": [ "SQSQueue", "Arn" ]
            }
          }
        }
      ],
    }
  }
}

module.exports = serverlessConfiguration;
