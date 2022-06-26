# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products

- index [token required] - ```http://localhost:3030/cyberwares``` - [GET]
- show [token required] - ```http://localhost:3030/cyberware/:id``` - [GET]
- create - ```http://localhost:3030/cyberware``` - [POST]
- update [token required] - ```http://localhost:3030/updatecyberware/:id``` - [PUT]
- destroy [token required] - ```http://localhost:3030/delcyberware/:id``` - [DELETE]

#### Users

- index [token required] - ```http://localhost:3030/users``` - [GET]
- show [token required] - ```http://localhost:3030/user/:id``` - [GET]
- create - ```http://localhost:3030/user``` - [POST]
- update [token required] - ```http://localhost:3030/updateuser/:id``` - [PUT]
- destroy [token required] - ```http://localhost:3030/deluser/:id``` - [DELETE]

#### Orders

- index [token required] - ```http://localhost:3030/orders``` - [GET]
- show [token required] - ```http://localhost:3030/order/:id``` - [GET]
- create - ```http://localhost:3030/order``` - [POST]
- update [token required] - ```http://localhost:3030/updateorder/:id``` - [PUT]
- destroy [token required] - ```http://localhost:3030/delorder/:id``` - [DELETE]
- order [token required] - ```http://localhost:3030/placeorder``` - [POST]

## Data Shapes
#### Product

```
CREATE TABLE cyberwares (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  price integer
);
```

#### User
```
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  password_digest VARCHAR(100) NOT NULL
);
```

#### Orders
```
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id integer REFERENCES users(id),
    order_status VARCHAR(100)
);
```
 
### OrderedProducts

```
CREATE TABLE ordered_products (
  id SERIAL PRIMARY KEY,
  order_id integer REFERENCES orders(id),
  product_id integer REFERENCES cyberwares(id),
  quantity integer NOT NULL
);
```
