//////////////////////////////
//not being used right now, need help to connect this for the main page??
const express = require('express');
const router = express.Router();
const app = express();
const db = require('../db/connection');
const productQueries = require('../db/queries/products');
const { Template } = require('ejs');
