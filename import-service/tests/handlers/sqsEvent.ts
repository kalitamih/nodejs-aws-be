const sqsEvent = {
    "Records": [
      {
        "messageId": "19dd0b57-b21e-4ac1-bd88-01bbb068cb78",
        "receiptHandle": "MessageReceiptHandle",
        "body": "Hello from SQS!",
        "attributes": {
          "ApproximateReceiveCount": "1",
          "SentTimestamp": "1523232000000",
          "SenderId": "123456789012",
          "ApproximateFirstReceiveTimestamp": "1523232000001"
        },
        "messageAttributes": {},
        "md5OfBody": "{{{md5_of_body}}}",
        "eventSource": "aws:sqs",
        "eventSourceARN": "arn:aws:sqs:eu-west-1:123456789012:MyQueue",
        "awsRegion": "eu-west-1"
      },
      {
        "messageId": "19dd0b57-b21e-4ac1-bd88-01bbb068cb79",
        "receiptHandle": "MessageReceiptHandle",
        "body": "Hello from SQS!",
        "attributes": {
          "ApproximateReceiveCount": "1",
          "SentTimestamp": "1523232000002",
          "SenderId": "123456789012",
          "ApproximateFirstReceiveTimestamp": "1523232000003"
        },
        "messageAttributes": {},
        "md5OfBody": "{{{md5_of_body}}}",
        "eventSource": "aws:sqs",
        "eventSourceARN": "arn:aws:sqs:eu-west-1:123456789012:MyQueue",
        "awsRegion": "eu-west-1"
      }
    ]
}

export {
  sqsEvent
}