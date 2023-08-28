const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const userQueries = require('../db/queries/users');

router.get('/', (req, res) => {

  userQueries.getUserById() //this will need to be made dynamic, here or in query??
    .then(data => {
      const userProfile = data.rows[0]; //rows?
      console.log("----data", userProfile)
      // res.json({ userProfile });  //do i need to json the sata for one user's info
      const templateVars = { userProfile }
      return res.render('profile', templateVars)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
