const express = require('express');
const db = require('../db/connection');
const router = express.Router();
const { Template } = require('ejs');

router.get('/item/:id', (req, res) => {
  // res.render('Indi_item_buyer');
  const product_id = req.params.id
  db
   .getProductbyProductId(product_id)
   .then( product => {
    //product is an object
    res.send( product )
   })
   .catch(error => {
    console.error(error);
    res.send(error)
   })
});

app.post('/item_buyer/:id/delete', (req,res) => {
  // need to write query to change is_deleted column in product into true

})
