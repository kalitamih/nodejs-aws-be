import { Context, S3Event } from 'aws-lambda';
import S3 from 'aws-sdk/clients/s3';
import 'source-map-support/register';
import { Bucket } from '../utils/constants';
import csv from 'csv-parser';

export const handle = (event: S3Event, _context: Context) => {   
    const s3 = new S3({ region: 'eu-west-1' });
    
    event.Records.forEach(record => {      
        const results = [];
        const stream = s3.getObject({ Bucket, Key: record?.s3?.object.key }).createReadStream();
        stream.pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                try {
                    console.log(results);
                    await s3.copyObject({
                        Bucket,
                        CopySource: Bucket + '/' + record.s3.object.key,
                        Key: record.s3.object.key.replace('uploaded', 'parsed')
                    }).promise();
                    await s3.deleteObject({
                        Bucket: Bucket,
                        Key: record.s3.object.key
                    }).promise();

                } catch (error) {
                    console.log(error);           
                }
        });                
    });      
}
