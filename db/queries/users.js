const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM user;')
    .then(data => {
      return data.rows;
    });
};

const getUserById = () => {
  return db.query('SELECT * FROM user WHERE id=1;') //this will need to be made dynamic
    .then(data => {
      console.log("user by id data", data)
      return data
    })
}

module.exports = { getUsers, getUserById };
