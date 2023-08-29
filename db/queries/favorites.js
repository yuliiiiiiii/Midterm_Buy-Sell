const db = require('../connection');

const getFavoritesOfSeller = () => {
  return db.query(`SELECT *, product.name as product_name, artist.name as artist_name
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
const addFavorite = function(likedProduct, artistId) {
  const favoriteId = Object.keys(favorite).length + 1;
  favorite.id = favoriteId;
  favorite.product_id = likedProduct.id
  favorite.artist_id = artistId
  favorite[favoriteId] = {favorite.id, favorite.product_id, favorite.artist_id}
  return Promise.resolve(likedProduct);
};

module.exports = { getFavoritesOfSeller, addFavorite };
