### Task Manager API

#### Steps to start

1. Before start you need to install node.js 20+ version

2. Open source folder and run in command line $ npm i

3. initializate parameters in .env file (watch .env-example)

4. For testing run in command line $ npm run test

5. For start run $ npm run start

# initialization parameters in docker container:

| Mode   | Environment variable            | Description                                                               |
| ------ | ------------------------------- | ------------------------------------------------------------------------- |
| all    | INIT_SERVICE_PORT               | Port for run node app (default 3000)                                      |
| all    | INIT_SERVICE_CORS               | Cors status (0 or 1)                                                      |
| ------ | ------------------------------- | --------------------------------------------------------------------------|
| all    | INIT_MONGODB_URL                | Mongo db connection data in url format                                    |
| all    | INIT_MONGODB_DATABASE           | Database name                                                             |
| ---    | ---                             | ---                                                                       |
| all    | INIT_SWAGGER                    | Swagger config, if needed use **1**, default **1**                        |
| all    | INIT_SWAGGER_URL                | Swagger url, example  default **null**                                             |
| all    | INIT_JWT_SECRET_KEY             | JWT secret key for encripting ,default **task-managet-s@cret**            |
