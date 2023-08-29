const db = require('../connection');

const getFavoritesOfSeller = () => {
  return db.query(`SELECT *
                    FROM favorite
                    JOIN product
                      ON favorite.product_id = product.id
                    JOIN artist
                      ON favorite.artist_id = artist.id
                    WHERE favorite.artist_id = 1;`)  //this will need to be made dynamic
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
     return res.rows
  })
  .catch (error => {
    console.log(error.message);
  });
};

module.exports = { getFavoritesOfSeller, addFavorite };
