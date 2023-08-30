const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const userQueries = require('../db/queries/users');
const productQueries = require('../db/queries/products');
const favoriteQueries = require('../db/queries/favorites');
const categoryQueries = require('../db/queries/categories')
const { Template } = require('ejs');

router.get('/', (req, res) => {

  Promise.all([  //this contains an array with four queries

    userQueries.getUserById(3) //this will need to be made dynamic, here & in query??
      .then(data => {
        const userData = data.rows[0];
        // console.log("---- user data", userData)
        // const templateVars = { userProfile }
        // return res.render('profile', templateVars)
        return userData;
      }),
    // .catch(err => {
    //   res
    //     .status(500)
    //     .json({ error: err.message });
    // }),

    productQueries.getProductsbySeller(3) //dynamic
      .then(data => {
        const sellersProducts = data;
        // console.log("--------product data", sellersProducts)
        // const templateVars = {sellersProducts}
        // return res.render('profile', templateVars)
        return sellersProducts;
      }),

    favoriteQueries.getFavoritesOfSeller(3) // dynamic, here & in query??
      .then(data => {
        const favoritesData = data;
        // console.log("---- favorites data", favoritesData);
        // const templateVars = { userProfile }
        // return res.render('profile', templateVars)
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
      categoryData = data[3]
      templateVars = { userData, sellersProducts, favoritesData , categoryData};
      // console.log('promiseALLTHEDATA', data);
      return res.render('profile', templateVars);
    });
});

module.exports = router;
