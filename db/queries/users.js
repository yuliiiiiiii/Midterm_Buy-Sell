const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM artist;')
    .then(data => {
      return data.rows;
    });
};

const getUserById = (id) => {
  return db.query(`SELECT *
                    FROM artist
                    WHERE id=${id};`)
    .then(data => {
      console.log("user/artist by id data", data.rows)
      return data
    })
}

module.exports = { getUsers, getUserById };
