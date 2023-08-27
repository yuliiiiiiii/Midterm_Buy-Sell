DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE user (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  avatar_choice INT DEFAULT '1'
  -- dont have to use avatar if we dont want it
);
