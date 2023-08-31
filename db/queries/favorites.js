const db = require('../connection');

const getFavoritesOfUser  = (id) => {
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
const addFavorite = function(product_id, artist_id) {
  return db
  .query(`INSERT INTO favorite(product_id, artist_id)
  VALUES($1, $2) RETURNING *;`, [product_id, artist_id])
  // artist_id is not dynamic, 'artistId'as second parameter
  .then(res => {
     return res.rows[0];
  })
  .catch (error => {
    console.log(error.message);
  });
};

const getFavoriteByProductAndUserId = function(product_id, userId) {
  return db
  .query(`
  SELECT * FROM favorite
  WHERE product_id = ${product_id} AND artist_id = ${userId}
  `)
  .then(res => {
    if (!res.rows[0]) {
      return false;
    }
    if(res.rows[0]) {
      return true;
    }
  })
}

module.exports = { getFavoritesOfUser , addFavorite, getFavoriteByProductAndUserId };
