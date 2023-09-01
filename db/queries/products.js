const db = require('../connection');

const getAllProducts = () => {
  return db.query (`SELECT * FROM product`)
  .then(data => data.rows)
}

const getAllProductsWithCategoryName = () => {
  return db.query (`SELECT p.*, array_agg(c.name) AS category_names
                  FROM product p
                  JOIN product_category pc ON p.id = pc.product
                  JOIN category c ON pc.category = c.id
                  GROUP BY p.id;`)
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

const getProductsbySellerWithName = (id) => {
  return db.query(`SELECT *, product.id as product_id, artist.name as artist_name, product.name as product_name
                  FROM product
                  JOIN artist ON product.seller_id = artist.id
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

const filterProductByPriceWithCategoryName = (min, max) => {
  return db.query (`SELECT p.*, array_agg(c.name) AS category_names
                  FROM product p
                  JOIN product_category pc ON p.id = pc.product
                  JOIN category c ON pc.category = c.id
                  WHERE price_in_cents BETWEEN ${min} AND ${max}
                  GROUP BY p.id;`)
  .then(data => data.rows)
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

const filterProductByCategoryWithCategoryName = (id) => {
  return db.query (`SELECT p.*, array_agg(c.name) AS category_names
                  FROM product p
                  JOIN product_category pc ON p.id = pc.product
                  JOIN category c ON pc.category = c.id
                  WHERE pc.category = ${id}
                  GROUP BY p.id;`)
  .then(data => data.rows)
}

const deleteProduct = function(product_id) {
  return db
  .query(`
  UPDATE product
  SET is_deleted = true
  WHERE id = ${product_id}
  RETURNING *;
  `)
  .then(res => {
    console.log("deleted product:", res.rows[0]);
    return;
  })
  .catch (error => {
    console.log("error", error.message);
  });
};

const changeToSoldByProductId = function(product_id) {
return db
.query(`
UPDATE product
SET sold = true
WHERE id = ${product_id}
RETURNING *;
`)
.then(res => {
  console.log("Sold product:", res.rows[0]);
  return;
})
.catch (error => {
  console.log("error", error.message);
});
};

const changeToNot_SoldByProductId = function(product_id) {
  return db
  .query(`
  UPDATE product
  SET sold = false
  WHERE id = ${product_id}
  RETURNING *;
  `)
  .then(res => {
    console.log("Not Sold product:", res.rows[0]);
    return;
  })
  .catch (error => {
    console.log("error", error.message);
  });
};

module.exports = { getAllProducts,
                  getAllProductsWithCategoryName,
                  getProductsbySeller,
                  getProductsbySellerWithName,
                  getProductbyProductId,
                  filterProductByCategory,
                  filterProductByCategoryWithCategoryName,
                  filterProductByPrice,
                  filterProductByPriceWithCategoryName,
                  deleteProduct, changeToSoldByProductId, changeToNot_SoldByProductId };
