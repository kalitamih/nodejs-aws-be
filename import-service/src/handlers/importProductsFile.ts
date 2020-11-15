import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import 'source-map-support/register';
import S3 from 'aws-sdk/clients/s3';
import { Bucket, Headers } from '../utils/constants';


export const handle = async (event: APIGatewayProxyEvent, _context: Context) => {

    try {
        const { name } = event.queryStringParameters;

        const s3 = new S3({ region: 'eu-west-1' });
        
        const signedUrl = await s3.getSignedUrlPromise('putObject',  {
            Bucket,
            Key: `uploaded/${name}`,
            Expires: 60,
            ContentType: "text/csv"
        });
    
        return {
            statusCode: 200,
            body: JSON.stringify({
            signedUrl,
            }, null, 2),
            headers: Headers,
        };
    } catch(error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Server error!",
            }, null, 2),
            headers: Headers,
        };
    }   
}
