const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM artist;')
    .then(data => {
      return data.rows;
    });
};

const getUserById = () => {
  return db.query(`SELECT *
                    FROM artist
                    WHERE id=1;`) //this will need to be made dynamic
    .then(data => {
      console.log("user/artist by id data", data.rows)
      return data
    })
}

module.exports = { getUsers, getUserById };
