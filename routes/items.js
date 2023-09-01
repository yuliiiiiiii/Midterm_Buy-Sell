const express = require('express');
const db = require('../db/connection');
const router = express.Router();
// const bcrypt = require("bcrypt");
// const { Template } = require('ejs');
const productQueries = require('../db/queries/products');
const favoriteQueries = require('../db/queries/favorites');
const userQueries = require('../db/queries/users')


router.get('/:id', (req, res) => {
  // the actual url will be /items/:id, see server.js
  const product_id = req.params.id;
  // req.params is an object, like {"id":"1"}
  // so need req.params.id to get the integer 1
  // const userId = 1;
  const userId = req.session.artist_id;

  if (!userId) {
    return res.send({ error: "Please log in" });
  };
  // Need to check if user is logged in!!!!

  db
  productQueries.getProductbyProductId(product_id)
    .then(product => {
      //product is an object
      // {
      //   id: 1,
      //   seller_id: 1,
      //   name: 'Self-Portrait with a Straw Hat',
      //   description: 'Oil on canvas',
      //   link_to_pic: 'https://images.metmuseum.org/CRDImages/ep/original/DT1502_cropped2.jpg',
      //   sold: false,
      //   price_in_cents: 3000,
      //   is_deleted: false
      // }
      const sellerId = product.seller_id;
      if (sellerId !== userId) {
        //if user is not the seller of the product, show buyer page

        favoriteQueries.getFavoriteByProductAndUserId(product.id, userId)
          //getFavoriteByProductAndUserId returns a promise so needs a then after, in order to pass the result to a variable
          .then( favorite => {
            userQueries.getUserByIdForItem(favorite.artist_id)
            .then((user) => {
              const templateVars = {
                // picture: product.link_to_pic,
                // name: product.name,
                // description: product.description,
                // price: `$${product.price_in_cents / 100}`,
                // sold: product.sold,
                id: product.id,
                item: product,
                favorite,
                artist_id: req.session && req.session.artist_id,
                user
                // It shows liked icon on every page so it does not work
              };
              console.log(user);
              res.render("Indi_item_buyer", templateVars);
            });
          return;
            })
      }

      if (sellerId === userId) {
        // if user is the seller of the product, show seller page

        const templateVars = {
          // picture: product.link_to_pic,
          // name: product.name,
          // description: product.description,
          // price:`$${product.price_in_cents / 100}`,
          // sold: product.sold,
          id: product.id, //in order to make the delete post request!
          item: product,
          favorite: false,
          artist_id: req.session && req.session.artist_id
        };
        res.render("Indi_item_seller", templateVars);
        return;
      }
    })
    .catch(error => {
      console.error(error);
      res.send(error);
    });
});

router.post('/:id/delete', (req, res) => {
  const product_id = req.params.id;
  // const userId = 1;
  const userId = req.session.artist_id;

  if (!userId) {
    return res.send({ error: "Please log in" });
  };

  db
  productQueries.deleteProduct(product_id)
    .then(() => {
      console.log("Product deleted!");
      res.redirect('/profile');
    })
    .catch(error => {
      console.error(error);
      res.send(error);
    });
});

router.post('/:id/sold', (req, res) => {
  const product_id = req.params.id;
  //  console.log("product_id:", product_id);
  const userId = req.session.artist_id;

  if (!userId) {
    return res.send({ error: "Please log in" });
  };

  db
  productQueries.getProductbyProductId(product_id)
    .then(product => {

      if (!product.sold) {
        productQueries.changeToSoldByProductId(product.id)
          .then(() => {
            console.log("Product marked Sold!");
            res.redirect(`/items/${product.id}`);
          })
          .catch(error => {
            console.error(error);
            res.send(error);
          });
      } else {
        productQueries.changeToNot_SoldByProductId(product.id)
          .then(() => {
            console.log("Product Not Sold!");
            res.redirect(`/items/${product.id}`);
          })
          .catch(error => {
            console.error(error);
            res.send(error);
          });
      };
    });
});

router.post('/:id/like', (req, res) => {
  const product_id = req.params.id;
  //  console.log("product_id:", product_id);
  const userId = req.session.artist_id;

  if (!userId) {
    return res.send({ error: "Please log in" });
  };

  db
  favoriteQueries.getFavoriteByProductAndUserId(product_id, userId)
  .then(result => {
    if (!result) {
      favoriteQueries.addFavorite(product_id, userId)
    .then(() => {
      console.log("+++Liked product!");
      res.redirect(`/items/${product_id}`);
    })
    .catch(error => {
      console.error(error);
      res.send(error);
    })
    } else{
      favoriteQueries.removeFavorite(product_id, userId)
      .then(()=> {
        console.log("+++product unliked!");
        res.redirect(`/items/${product_id}`);
      })
    };
  });
});



  router.post('/:id/message', (req, res) => {
    //message logic here
    res.status(200);
    res.send();
  });



module.exports = router;
// each rount file needs to export the router, and import to server.js!
