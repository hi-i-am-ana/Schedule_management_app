const express = require('express');
const db = require('../db/db.js');
const emailRouter = express.Router();

emailRouter.get('/:id', (req, res) => {
  db.one('SELECT email FROM email_confirmation WHERE hash = $1;', req.params.id)
  .then((row) => {
    db.none('UPDATE users SET active = $1 WHERE email = $2;', [true, row.email])
    .then(() => {
      db.none('DELETE from email_confirmation WHERE hash = $1;', req.params.id)
      .then(() => {
        res.render('pages/email', {title: 'Email Confirmation | Mr.Coffee Schedule Management', email: row.email, current_user: req.session.user})
      })
      .catch((err) => res.render('pages/error', {err: err, title: 'Error | Mr.Coffee Schedule Management', current_user: req.session.user}));
    })
    .catch((err) => res.render('pages/error', {err: err, title: 'Error | Mr.Coffee Schedule Management', current_user: req.session.user}));
  })
  .catch((err) => res.render('pages/error', {err: err, title: 'Error | Mr.Coffee Schedule Management', current_user: req.session.user}));
});

module.exports = emailRouter;