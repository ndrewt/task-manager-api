const path = require('path')
const config = {
    logs_folder: path.join(process.cwd(), 'logs'),

    service_port: (typeof(process.env.INIT_SERVICE_PORT) !== 'undefined') ? process.env.INIT_SERVICE_PORT : 3000,
    service_cors: (typeof(process.env.INIT_SERVICE_CORS) !== 'undefined') ? process.env.INIT_SERVICE_CORS : true,

    mongo_url: (typeof(process.env.INIT_MONGODB_URL) !== 'undefined') ? process.env.INIT_MONGODB_URL : '',
    db_database: (typeof(process.env.INIT_MONGODB_DATABASE) !== 'undefined') ? process.env.INIT_MONGODB_DATABASE : null,

    swagger: (typeof(process.env.INIT_SWAGGER) !== 'undefined') ? parseInt(process.env.INIT_SWAGGER) : 0,
    swagger_url: (typeof(process.env.INIT_SWAGGER_URL) !== 'undefined') ? process.env.INIT_SWAGGER_URL : `http://localhost:${process.env.INIT_SERVICE_PORT || 3000}`,
    jwt_secret: (typeof(process.env.INIT_JWT_SECRET_KEY) !== 'undefined') ? rocess.env.INIT_JWT_SECRET_KEY : 'task-managet-s@cret',

    //token
    test_token: (typeof(process.env.INIT_TEST_TOKEN) !== 'undefined') ? process.env.INIT_TEST_TOKEN : null
}
module.exports = config