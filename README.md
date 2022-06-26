# Storefront-Backend

Second Project for Udacity Nanodgree Course for backend-web development.

## Installation

1.```npm install``` - installs the project modules.
2.```npm run build``` - creates the build directory.
3.```npm run start``` - starts the server.

## Database setting up

- Connect to the default postgres database: sudo su - postgres
- psql
- Create the user: ```CREATE USER postgres WITH PASSWORD '@n@rchyG@te';```
- Create the databases: 1- CREATE DATABASE cyberwares_store; 2- CREATE DATABASE cyberwares_store_test;
- Connect to the databases to grant all privileges:
1. \c cyberwares_store
2.  GRANT ALL PRIVILEGES ON DATABASE cyberwares_store to postgres;
3. \c cyberwares_store_test
4. GRANT ALL PRIVILEGES ON DATABASE cyberwares_store_test to postgres;

## Migration

- ```npm run migrate```
- or ```db-migrate up```

## Endpoints

### Users

- index [token required] - ```http://localhost:3030/users``` - [GET]
- show [token required] - ```http://localhost:3030/user/:id``` - [GET]
- create - ```http://localhost:3030/user``` - [POST]
- update [token required] - ```http://localhost:3030/updateuser/:id``` - [PUT]
- destroy [token required] - ```http://localhost:3030/deluser/:id``` - [DELETE]

### Orders

- index [token required] - ```http://localhost:3030/orders``` - [GET]
- show [token required] - ```http://localhost:3030/order/:id``` - [GET]
- create - ```http://localhost:3030/order``` - [POST]
- update [token required] - ```http://localhost:3030/updateorder/:id``` - [PUT]
- destroy [token required] - ```http://localhost:3030/delorder/:id``` - [DELETE]
- order [token required] - ```http://localhost:3030/placeorder``` - [POST]

### Products

- index [token required] - ```http://localhost:3030/cyberwares``` - [GET]
- show [token required] - ```http://localhost:3030/cyberware/:id``` - [GET]
- create - ```http://localhost:3030/cyberware``` - [POST]
- update [token required] - ```http://localhost:3030/updatecyberware/:id``` - [PUT]
- destroy [token required] - ```http://localhost:3030/delcyberware/:id``` - [DELETE]

## Scripts
- ```npm run lint``` 
- ```npm run prettier```
- ```npm run test```
- ```npm run start```
- ```npm install```
- ```npm run build```
- ```npm run migrate```
` ```npm run demigrate```

## Resources and Credits

- https://github.com/HossamAbubakr/Productify-Storefront-API
- https://github.com/HossamGouda/UD-storefornt-backend

## ENV variables

- PORT=3030
- ENV=dev
- POSTGRES_HOST=localhost
- POSTGRES_PORT=5432
- POSTGRES_DB=cyberwares_dev
- POSTGRES_DB_TEST=cyberwares_test
- POSTGRES_USER=postgres
- POSTGRES_PASSWORD=@n@rchyG@te
- BCRYPT_PASSWORD=open-sesame
- SALT_ROUNDS=10
- TOKEN_SECRET=thisismysecrettoken123
