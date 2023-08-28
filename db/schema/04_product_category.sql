DROP TABLE IF EXISTS product_category CASCADE;

CREATE TABLE product_category (
  id SERIAL PRIMARY KEY NOT NULL,
  product INTEGER REFERENCES product(id),
  category INTEGER REFERENCES category(id)
);
