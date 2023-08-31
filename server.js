// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');

//
const productQueries = require('./db/queries/products');
const categoryQueries = require('./db/queries/categories');


const PORT = process.env.PORT || 8080;
const app = express();

app.use(cookieSession({
  name: 'session',
  keys: ["ILoveSecureThingsThey'reSoSecure"],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const profileRoutes = require('./routes/profile');
const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products');
const itemsRoutes = require('./routes/items');// const indexRoutes = require('./routes/index')

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/add-item', productsRoutes);
app.use('/items', itemsRoutes);
//app.use('/items')

// app.use('/', indexRoutes)

// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  let dbquery;
  const { min, max, category } = req.query;
  if (min && max) {
    dbquery = productQueries.filterProductByPrice((min * 100), (max * 100));
  } else if (category) {
    dbquery = productQueries.filterProductByCategory(category);
  } else {
    dbquery = productQueries.getAllProducts();
  }

  Promise.all([
    dbquery.then((allArtData) => {
      console.log('WHAT DOES ALL ART DATA LOOK LIKE AGAIN', allArtData);
      return allArtData;
    }),
    categoryQueries.getCategoriesByProduct(6) // needs to dynamic from product <-- this will need to be on more than the profile page???
      .then(data => {
        const categoryData = data;
        console.log("---- category data", categoryData);
        return categoryData;
      }),
  ])

    .then(data => {
      allArtData = data[0];
      categoryData = data[1];
      const templateVars = { allArtData, categoryData, artist_id: req.session && req.session.artist_id };
      console.log("testing templateVars", templateVars);
      res.render('index', templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});



