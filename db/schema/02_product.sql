DROP TABLE IF EXISTS product CASCADE;

CREATE TABLE product (
  id SERIAL PRIMARY KEY NOT NULL,
  seller_id INT REFERENCES artist(id),
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  link_to_pic TEXT,
  sold BOOLEAN DEFAULT false,
  price_in_cents INT NOT NULL,
  is_deleted BOOLEAN DEFAULT false
);
