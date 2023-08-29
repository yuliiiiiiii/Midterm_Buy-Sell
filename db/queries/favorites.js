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


module.exports = { getFavoritesOfSeller };
