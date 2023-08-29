const db = require('../connection');

const getProductsbySeller = (id) => {
  return db.query(`SELECT *
                  FROM product
                  WHERE seller_id = ${id};`)
    .then(data => {
      return data.rows;
    });
};

const getProductbyProductId = function(id) {
  return db
  .query(`SELECT * FROM product WHERE id = ${id} AND is_deleted = false`)
  .then(res => {
    return res.rows[0];
  })
  .catch(err => {
    console.log(err.message);
  });
};

module.exports = { getProductsbySeller, getProductbyProductId };
