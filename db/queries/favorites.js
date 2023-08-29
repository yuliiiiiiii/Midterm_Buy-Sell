const db = require('../connection');

const getFavoritesOfSeller = (id) => {
  return db.query(`SELECT *, product.name as product_name, artist.name as artist_name
                    FROM favorite
                    JOIN product
                      ON favorite.product_id = product.id
                    JOIN artist
                      ON favorite.artist_id = artist.id
                    WHERE favorite.artist_id = ${id};`)
    .then(data => {
      return data.rows;
    });
};

//likedItem - An object containing all of the product details
const addFavorite = function(product) {
  return db
  .query(`INSERT INTO favorite(product_id, artist_id)
  VALUES('${product.id}', '3') RETURNING *;`)
  // artist_id is not dynamic, 'artistId'as second parameter
  .then(res => {
     return res.rows[0];
  })
  .catch (error => {
    console.log(error.message);
  });
};

module.exports = { getFavoritesOfSeller, addFavorite };
