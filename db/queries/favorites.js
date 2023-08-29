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


module.exports = { getFavoritesOfSeller };
