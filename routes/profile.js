/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  // const query = `SELECT * FROM users WHERE id = 1`; //will need to make this query
  // console.log("---query", query);
  // db.query(query)
  //   .then(data => {
  //     const userProfile = data.rows; //rows?
  //     console.log("----data", userProfile)
  //     res.json({ userProfile });  //do i need to json the sata for one user's info
      res.render('profile')// syntax to put in variables??
    })
    // .catch(err => {
    //   res
    //     .status(500)
    //     .json({ error: err.message });
    // });
// });

module.exports = router;
