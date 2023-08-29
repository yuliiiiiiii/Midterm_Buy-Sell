const express = require('express');
const router  = express.Router();
const addItemQueries = require('../db/queries/add-item');

router.get('/', (req, res) => {
  res.render('add-item');
});

router.post('/', (req, res) => {
  console.log("REQUEST", req.body)
  const seller_id = 3 // need to be made dynamic with cookie
  addItemQueries.addItem(req.body.name, req.body.description, req.body.link_to_pic, (parseInt(req.body.price)*100), seller_id)
    .then((data) => {
      // const product_id = data[0].id
      console.log("new item id now", data.id)
      return data.id
    })
    .then((data) =>{
      res.redirect('/auth/login') //this needs to be CHANGED
    })
      .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

module.exports = router;
