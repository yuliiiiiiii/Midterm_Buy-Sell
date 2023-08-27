const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM user;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getUsers };
