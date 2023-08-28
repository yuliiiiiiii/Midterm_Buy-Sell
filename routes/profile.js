const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
// const userQueries = require('../db/queries/users');
const productQueries = require('../db/queries/products');

router.get('/', (req, res) => {


  // userQueries.getUserById() //this will need to be made dynamic, here or in query??
  //   .then(data => {
  //     const userProfile = data.rows[0];
  //     console.log("----data", userProfile)
  //     // const templateVars = { userProfile }
  //     // return res.render('profile', templateVars)
  //     return userProfile
  //   })
  //   .catch(err => {
  //     res
  //       .status(500)
  //       .json({ error: err.message });
  //   });

  productQueries.getProductsbySeller() //dynamic
    .then(data => {
      const sellersProducts = data;
      console.log("--------product data", sellersProducts)
      const templateVars = {sellersProducts}
      return res.render('profile', templateVars)
  })

});

module.exports = router;
