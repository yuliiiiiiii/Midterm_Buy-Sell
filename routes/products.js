const express = require('express');
const router  = express.Router();
const addItemQueries = require('../db/queries/add-item');

router.get('/', (req, res) => {
  if (!req.session.artist_id){
    res.status(400);
      res.send("Please log in to add your art!");
      // res.redirect('/')
  } else {
    res.render('add-item');
  }
});

router.post('/', (req, res) => {
  console.log("REQUEST", req.body)
  const seller_id = req.session.artist_id //cookie
  console.log("seller_id")
  //this adds a new product to the db
  addItemQueries.addItem(req.body.name, req.body.description, req.body.link_to_pic, (parseInt(req.body.price)*100), seller_id)
    .then((data) => {
      item_id = data[0].id
      console.log("new item id now", data[0].id)
      res.redirect('/items/:item_id') /////syntax to add a variable
    })
      .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

module.exports = router;
