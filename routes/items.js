const express = require('express');
const db = require('../db/connection');
const router = express.Router();
const { Template } = require('ejs');
const productQueries = require('../db/queries/products');

router.get('/:id', (req, res) => {
  // the actual url will be /items/:id, see server.js
  const product_id = req.params.id
  // req.params is an object, like {"id":"1"}
  // so need req.params.id to get the integer 1

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

    res.send( product )

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
