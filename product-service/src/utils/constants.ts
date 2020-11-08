const Headers =  {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': 'GET, PUT, PATCH, POST, DELETE, OPTIONS',
    "Access-Control-Allow-Headers": 'Content-Type,x-requested-with,Access-Control-Allow-Origin,Access-Control-Allow-Headers,Access-Control-Allow-Methods',
    'Content-Type': 'application/json;charset=utf-8'
};

const regexUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export {
    Headers,
    regexUUID
}