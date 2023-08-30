const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { getUserByEmail, addUser } = require('../db/queries/users.js');

module.exports = function(router, database) {
  //registration
  router.get('/register', (req, res) => {
    res.render('register');
  });

  router.post("/register", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    //checks for incomplete forms and sends error 400 if incomplete
    if (!email || !password || !name) {
      res.status(400);
      res.send("Please fill out both the email and password boxes!");
    }

    let userData = getUserByEmail(email);
    userData.then(function(result) {
      console.log(result.rows);
      if (result.rows.length = 0) {
        res.status(400);
        res.send("Email is already in use, please login");
      }
      else {
        const artist = req.body;
        artist.password = bcrypt.hashSync(password, 10);
        database.addUser(artist,);
      }
      req.session.userId = user.id;
      res.redirect("/");
    })
      .catch((error) => {
        console.error(error);
      });
  });

  //login
  router.get("/login", (req, res) => {
    res.render('login');
  });

  const login =  function(email, password) {
    return database.getUserWithEmail(email)
    .then(artist => {
      if (bcrypt.compareSync(password, artist.password)) {
        return artist;
      }
      return null;
    });
  }
  exports.login = login;

  router.post('/login', (req, res) => {
    const {email, password} = req.body;
    login(email, password)
      .then(user => {
        if (!user) {
          res.send({error: "error"});
          return;
        }
        req.session.userId = user.id;
        res.send({user: {name: user.name, email: user.email, id: user.id}});
      })
      .catch(e => res.send(e));
  });

  //logout
  router.post("/logout", (req, res) => {
    res.clearCookie('session');
    res.redirect("/");
  });



};
