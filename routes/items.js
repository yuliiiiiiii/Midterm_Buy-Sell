const express = require('express');
const db = require('../db/connection');
const router = express.Router();
// const { Template } = require('ejs');
const productQueries = require('../db/queries/products');

router.get('/:id', (req, res) => {
  // the actual url will be /items/:id, see server.js
  const product_id = req.params.id
  // req.params is an object, like {"id":"1"}
  // so need req.params.id to get the integer 1
  const userId = 1;
  // not dynamic
  // const userId = req.session.user_id => need to set <req.session.user_id = artist.id> at log in

  db
   productQueries.getProductbyProductId(product_id)
   .then( product => {
    //product is an object
    // {
//   id: 1,
//   seller_id: 1,
//   name: 'Self-Portrait with a Straw Hat',
//   description: 'Oil on canvas',
//   link_to_pic: 'https://images.metmuseum.org/CRDImages/ep/original/DT1502_cropped2.jpg',
//   sold: false,
//   price_in_cents: 3000,
//   is_deleted: false
// }
   const sellerId = product.seller_id
    if(sellerId !== userId) {
      //if user is not the seller of the product, show buyer page

    const templateVars = {
      picture: product.link_to_pic,
      name: product.name,
      description: product.description,
      price: `$${product.price_in_cents / 100}`,
      sold: product.sold
      // still need to add more variable for header partial, and find way to hide sold
    };
    res.render("Indi_item_buyer", templateVars);
    return
    }

    if(sellerId === userId) {
      // if user is the seller of the product, show seller page

    const templateVars = {
      picture: product.link_to_pic,
      name: product.name,
      description: product.description,
      price:`$${product.price_in_cents / 100}`,
      sold: product.sold
      // still need to add more variable for header partial, and find way to change sold status
    };
    res.render("Indi_item_seller", templateVars);
    return
    }
   })
   .catch(error => {
    console.error(error);
    res.send(error)
   })
});

// router.post('/item_buyer/:id/delete', (req,res) => {
//   // need to write query to change is_deleted column in product into true

// })

module.exports = router;
// each rount file needs to export the router, and import to server.js!
