const express = require('express');
const crypto = require('crypto');
const db = require('../db/db.js');
const loginRouter = express.Router();

// GET route for login page
loginRouter.get('/', (req, res) => {
  console.log(req.session.id)
  res.render('pages/login', {title: 'Login | Mr.Coffee Schedule Management'});
});

// POST route for login page
loginRouter.post('/', (req, res) => {
  //const hashedPassword = crypto.createHash('sha256').update(req.body.password).digest('hex');
  hashedPassword = '$2a$06$M0QSmazinam8WG.CjmYBYuuQ4XmFPg8jT3phGuvi.q8VgCysiQXjG'; // for testing (as bcrypt is used in database)
  db.oneOrNone('SELECT * FROM users WHERE email = $1 AND password = $2;', [req.body.email, hashedPassword])
  .then((user) => {
    if (user !== null) {
      req.session.user = user;
      res.redirect('/');
    } else {
      res.redirect('/login') // TODO: redirect or render here? ADD MESSAGE THAT EMAIL OR PASSWORD NOT FOUND
    };
  })
  .catch((err) => res.render('pages/error', {err: err, title: 'Error | Mr.Coffee Schedule Management'}));
});

module.exports = loginRouter;
