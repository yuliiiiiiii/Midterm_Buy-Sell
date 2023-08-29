const express = require('express');
const db = require('../db/connection');
const { addFavorite } = require('../db/queries/favorites')
const router = express.Router();
const { Template } = require('ejs');

router.post('/profile', (req, res) => {
  // const artistId = req.session.artistId;
  const artistId = 3;
  //in post /login, const artistId = req.body.id
  // from artist table

  if (!artistId) {
    return res.send('Please log in to like product')
  }

  const newLikedItem = req.body;

  db
   .addFavorite(newLikedItem, artistId)
   .then(newLikedItem => {
    res.redirect('/profile')
   })
   .catch(err => {
    console.error(err);
    res.send(err);
   });

});

module.exports = router;
