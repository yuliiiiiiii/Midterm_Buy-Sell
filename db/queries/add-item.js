const db = require('../connection');

const addItem = (name, description, link_to_pic, price_in_cents, seller_id) => {
  return db.query(
    `INSERT INTO product (name, description, link_to_pic, price_in_cents, seller_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;`,
    [name, description, link_to_pic, price_in_cents, seller_id]
  )
  .then(data => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
};

module.exports = { addItem };

