const express = require('express');
const db = require('../db/connection');
const router = express.Router();
const bcrypt = require("bcrypt");
// const { Template } = require('ejs');
const productQueries = require('../db/queries/products');

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

        const templateVars = {
          // picture: product.link_to_pic,
          // name: product.name,
          // description: product.description,
          // price: `$${product.price_in_cents / 100}`,
          // sold: product.sold,
          id: product.id,
          item: product
          // still need to add more variable for header partial, and find way to hide sold
        };
        res.render("Indi_item_buyer", templateVars);
        return;
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
          item: product
          // still need to add more variable for header partial, and find way to change sold status
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
  //const userId = req.session.userId;
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

router.post('/:id', (req, res) => {
  const product_id = req.params.id;
  //  console.log("product_id:", product_id);
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
      };
      if (product.sold) {

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

router.post('/:id/message', (req, res) => {
  //message logic here
});

module.exports = router;
// each rount file needs to export the router, and import to server.js!
