//////////////////////////////
//not being used right now, need help to connect this for the main page??


const express = require('express');
const router = express.Router();
const app = express();
const db = require('../db/connection');
const productQueries = require('../db/queries/products');
const { Template } = require('ejs');

router.get('/', (req, res) => {
  productQueries.getAllProducts()
  .then((data) => {
    const allArtData = data.rows
    // console.log("logging all art---------------------", allArtData)
    return allArtData
  })
  .then(data => {
    allArtData = data[0]
    templateVars = { allArtData }
    return res.render('index', templateVars)
  })
  .catch(err => {
    res
    .status(500)
    .json({ error: err.message });
  })
})
