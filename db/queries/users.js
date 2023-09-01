const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM artist;')
    .then(data => {
      return data.rows;
    })
    .catch((error) => {
      console.error(error);
    });
};

const getUserByEmail = (email) => {
  return db.query("SELECT * FROM artist WHERE email=$1;", [email])
    .then(data => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};


const getUserById = (id) => {
  return db.query(`SELECT *
                    FROM artist
                    WHERE id=${id};`)
    .then(data => {
      console.log("user/artist by id data", data.rows);
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};

const addUser = (name, email, password) => {
  return db.query(
    `INSERT INTO artist (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;`,
    [name, email, password]
  )
    .then(data => {
      return data;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getUsers, getUserByEmail, getUserById, addUser };
