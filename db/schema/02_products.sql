DROP TABLE IF EXISTS product CASCADE;

CREATE TABLE product (
  id SERIAL PRIMARY KEY NOT NULL,
  seller_id INTEGER REFERENCES user(id),
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  link_to_pic TEXT,
  price_in_cents INT NOT NULL,
  is_deleted BOOLEAN DEFAULT false
)
