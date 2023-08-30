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
  .query(`SELECT * FROM product WHERE id =$1 AND is_deleted = $2;`, [id, false])
  .then(res => {
    console.log("+++++", res.rows[0]);
    return res.rows[0];
  })
  .catch(err => {
    console.log("-------", err.message, id);
  });
};

module.exports = { getProductsbySeller, getProductbyProductId };
