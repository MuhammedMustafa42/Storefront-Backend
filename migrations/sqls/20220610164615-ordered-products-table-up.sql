/* Replace with your SQL commands */
CREATE TABLE ordered_products (
  id SERIAL PRIMARY KEY,
  order_id integer REFERENCES orders(id),
  product_id integer REFERENCES cyberwares(id),
  quantity integer NOT NULL
);