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

-  id
- name
- price

#### User

- id
- firstname
- lastname
- email
- password_digest

#### Orders

- id
- user_id
- order_status

### OrderedProducts

- id
- order_id
- product_id
- quantity
