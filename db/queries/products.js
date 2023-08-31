const db = require('../connection');

const getAllProducts = () => {
  return db.query (`SELECT * FROM product`)
  .then(data => data.rows)
}

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
    // console.log("+++++", res.rows[0]);
    return res.rows[0];
    // returns an object
  })
  .catch(err => {
    console.log("-------", err.message);
  });
};
const filterProductByPrice = (min, max) => {
  return db.query(`SELECT *
                    FROM product
                    WHERE price_in_cents BETWEEN ${min} AND ${max};`)
    .then(data => {
      console.log("BY PRICE---------", data.rows)
      return data.rows;
    });
}

const filterProductByCategory = (id) => {
  return db.query(`SELECT *
                    FROM product
                    JOIN product_category
                    ON product_category.product = product.id
                    WHERE product_category.category = ${id};`)
    .then(data => {
      return data.rows;
    });
}

module.exports = { getAllProducts, getProductsbySeller, getProductbyProductId, filterProductByCategory, filterProductByPrice };
