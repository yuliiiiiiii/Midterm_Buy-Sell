const express = require('express');
const db = require('../db/connection');
const router = express.Router();
const { Template } = require('ejs');
const favoriteQueries = require('../db/queries/favorites');

router.post('/profile', (req, res) => {
  // const artistId = req.session.artistId;
  //in post /login, req.session.artistId = artist.id
  // from artist table

  // if(!artistId) {
    // return res.send({error: "please log in to like items"})
  // }
  const product = req.body;

  db
   favoriteQueries.addFavorite(product)
   .then(favorite => {
    // res.send (favorite);
    res.send(favorite);
    //need to add ajax to show the newly added favorite item on profile page
   })
   .catch (err => {
    console.error(err);
    res.send(err);
   });

});

module.exports = router;
// server.js hasn't imported this router yet!
