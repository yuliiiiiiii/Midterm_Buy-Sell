const db = require('../connection');

const getProductsbySeller = () => {
  return db.query(`SELECT *
                  FROM product
                  WHERE seller_id = 3;`)
    .then(data => {
      return data.rows;
    });
};


module.exports = { getProductsbySeller };
