const express = require('express');
const db = require('../db/connection');
const router = express.Router();
const { Template } = require('ejs');

router.post('/profile', (req, res) => {
  // const artistId = req.session.artistId;
  //in post /login, req.session.artistId = artist.id
  // from artist table

  // if(!artistId) {
    // return res.send({error: "please log in to like items"})
  // }
  const product = req.body;

  db
   .addFavorite(product)
   .then(favorite => {
    // res.send (favorite);
    // need to create a function to append card to the profile favorite section
   })
   .catch (err => {
    console.error(err);
    res.send(err);
   });

});

module.exports = router;
