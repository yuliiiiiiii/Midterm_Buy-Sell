DROP TABLE IF EXISTS favorite CASCADE;

CREATE TABLE favorite (
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INTEGER REFERENCES product(id) ON DELETE CASCADE,
  artist_id INTEGER REFERENCES artist(id) ON DELETE CASCADE
);