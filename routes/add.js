const express = require('express');
const router = express.Router();
const addItemQueries = require('../db/queries/add-item');

router.post('/', (res, req) => {
  const artist_id = 3 // need to be made dynamic with cookie
  addItemQueries.addItem(req.body.name, req.body.description, req.body.link_to_pic, (parseInt(req.body.price)*100), artist_id)
    .then((data) => {
      const id = data[0].id
      console.log("new item id now", id, data)
      res.redirect('/indi_item_seller') //this needs to be CHANGED
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});
module.exports = router;
