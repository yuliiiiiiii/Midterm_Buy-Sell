DROP TABLE IF EXISTS product-category CASCADE;

CREATE TABLE product-category (
  id SERIAL PRIMARY KEY NOT NULL,
  product INTEGER REFERENCES product(id),
  category INTEGER REFERENCES category(id)
)
