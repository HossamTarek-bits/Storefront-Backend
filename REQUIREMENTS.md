# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index -> '/products' [GET]
- Show -> '/products/:id' [GET]
- Create [token required] -> '/products' [POST]
- Products by category (args: product category) -> '/products/category/:category' [GET]

#### Users
- Index [token required] -> '/users' [GET]
- Show [token required] -> '/users/:id' [GET]
- Create New [token required] -> '/users' [POST]

#### Orders
- Current Order by user (args: user id)[token required] -> 'orders/current_orders/:id' [GET]
- Completed Orders by user (args: user id)[token required] -> '/orders/completed_orders/:id' [GET]
- Create [token required] -> '/orders' [POST]
- Create order product [token required] -> '/orders/:order_id/products' [POST]

## Data Shapes
#### Product
-  id
- name
- price
- category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## Database Tables

#### Products
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price NUMERIC NOT NULL,
    category VARCHAR(100)
)

#### Users
(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password VARCHAR NOT NULL
)

#### Orders
(
    id SERIAL PRIMARY KEY,
    status VARCHAR(15),
    user_id bigint REFERENCES users(id)
)

#### Order_Products
(
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
)