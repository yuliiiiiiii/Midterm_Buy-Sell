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


module.exports = { getFavoritesOfSeller };
