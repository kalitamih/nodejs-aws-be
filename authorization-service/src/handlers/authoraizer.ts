import { APIGatewayTokenAuthorizerHandler } from 'aws-lambda';
import 'source-map-support/register';

export const handle: APIGatewayTokenAuthorizerHandler = async (event, _context) => {

    if (event.type !== 'TOKEN') throw 'Unauthorized';


    try {
        const principalId = event.authorizationToken.split(' ')[1];  

        if(!principalId) {
            throw `Unauthorized`;
        }

        const [username, password] = Buffer.from(principalId, 'base64').toString('utf-8').split(':');
       
        const effect = process.env[username] && (process.env[username] === password) ? 'Allow' : 'Deny';

        return {
            principalId, 
            policyDocument: {
                Version: '2012-10-17',
                Statement: [
                    { Effect: effect, Resource: event.methodArn, Action: 'execute-api:Invoke' },
                ],
            }
          };
        }
    catch(error){
        console.log(error);
        throw `Unauthorized`;
    }
}
