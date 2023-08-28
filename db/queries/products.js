const db = require('../connection');

const getProductsbySeller = () => {
  return db.query(`SELECT *, product.name as product_name
                  FROM product
                  JOIN artist
                  ON product.seller_id = artist.id
                  WHERE seller_id = 3;`)
    .then(data => {
      return data.rows;
    });
};


module.exports = { getProductsbySeller };
