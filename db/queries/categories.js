const db = require('../connection');

const getCategoriesByProduct = (product_id) => {
  return db.query (`SELECT category.name
                    FROM category
                    JOIN product_category
                    ON category.id = product_category.category
                    WHERE product_category.product = ${product_id}`)
  .then(data => {
    return data.rows;
  });
}

module.exports = { getCategoriesByProduct }
