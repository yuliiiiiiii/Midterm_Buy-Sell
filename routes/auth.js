const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const usersQuery = require('../db/queries/users.js');

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

  let userData = usersQuery.getUserByEmail(email);
  userData.then(function(result) {
    console.log(result.rows);
    if (result.rows.length = 0) {
      res.status(400);
      res.send("Email is already in use, please login");
    }
    else {
      const newPassword = bcrypt.hashSync(password, 10);
      usersQuery.addUser(name, email, newPassword).then(
        (artist) => {
          req.session.artist_id = artist.rows[0].id;
          res.redirect("/");
        }
      );
    }
  })
    .catch((error) => {
      console.error(error);
    });
});

//login
router.get("/login", (req, res) => {

  res.render('login');
});

const login = function(email, password) {
  return usersQuery.getUserByEmail(email)
    .then(artist => {
      if (bcrypt.compareSync(password, artist.rows[0].password)) {
        return artist;
      }
      return null;
    });
};

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  login(email, password)
    .then(artist => {

      if (!artist) {
        res.send({ error: "No account found with that email, please register to continue!"});
        return;
      }
      req.session.artist_id = artist.rows[0].id;
      //res.send({ user: { name: artist.rows[0].name, email: artist.rows[0].email, id: artist.rows[0].id } });
      res.redirect("/");
    })
    .catch(e => res.send(e));
});


//logout
router.post("/logout", (req, res) => {
  res.clearCookie('session');
  res.redirect("/");
});

module.exports = router;
