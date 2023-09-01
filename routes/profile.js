const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const userQueries = require('../db/queries/users');
const productQueries = require('../db/queries/products');
const favoriteQueries = require('../db/queries/favorites');
const categoryQueries = require('../db/queries/categories')
const { Template } = require('ejs');

router.get('/', (req, res) => {
  if(!req.session.artist_id) {
    res.status(400);
    res.send("Please log in to see your profile!");
    // res.redirect('/')
  } else {

  Promise.all([

    userQueries.getUserById(req.session.artist_id)
      .then(data => {
        const userData = data.rows[0];
        return userData;
      }),
    // .catch(err => {
    //   res
    //     .status(500)
    //     .json({ error: err.message });
    // }),

    productQueries.getProductsbySellerWithName(req.session.artist_id)
      .then(data => {
        const sellersProducts = data;
        console.log("---------my items for sale", sellersProducts)
        return sellersProducts;
      }),

    favoriteQueries.getFavoritesOfUser(req.session.artist_id)
      .then(data => {
        const favoritesData = data;
        console.log("------favoriteData:", favoritesData);
        return favoritesData;
      }),

    categoryQueries.getCategoriesByProduct(6) // needs to dynamic from product <-- this will need to be on more than the profile page???
    .then(data => {
      const categoryData = data;
      console.log("---- category data", categoryData);
      return categoryData;
    }),
  ])
    .then(data => {
      userData = data[0];
      sellersProducts = data[1];
      favoritesData = data[2];
      console.log('this is the favourites data',favoritesData )
      categoryData = data[3]
      templateVars = { userData, sellersProducts, favoritesData , categoryData};
      return res.render('profile', templateVars);
    });
  }
});

module.exports = router;
