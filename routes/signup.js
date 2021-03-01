const express = require('express');
const querystring = require('querystring');
const bcrypt = require('bcrypt');
const db = require('../db/db.js');
const loggedInCheck = require('../middleware.js').loggedInCheck;
const signupRouter = express.Router();

// Import shared validation function
const validation = require('../public/shared_signup_validation.js');

// GET route for signup page
signupRouter.get('/', loggedInCheck, (req, res) => res.render('pages/signup', {
  title: 'Sign Up | Mr.Coffee Schedule Management',
  current_user: req.session.user,
  modal: req.query.modal,
  firstname: req.query.firstname,
  lastname: req.query.lastname,
  email: req.query.email,
  firstnameEmptyAlert: req.query.firstnameEmptyAlert,
  firstnameInvalidAlert: req.query.firstnameInvalidAlert,
  lastnameEmptyAlert: req.query.lastnameEmptyAlert,
  lastnameInvalidAlert: req.query.lastnameInvalidAlert,
  emailExistsAlert: req.query.emailExistsAlert,
  emailEmptyAlert: req.query.emailEmptyAlert,
  emailInvalidAlert: req.query.emailInvalidAlert,
  passwordEmptyAlert: req.query.passwordEmptyAlert,
  passwordInvalidAlert: req.query.passwordInvalidAlert,
  confirmPasswordEmptyAlert: req.query.confirmPasswordEmptyAlert,
  confirmPasswordMatchAlert: req.query.confirmPasswordMatchAlert,
}));

// POST route for signup page
signupRouter.post('/', (req, res) => {
  let queryParams = {
    firstname: '',
    lastname: '',
    email: '',
    firstnameEmptyAlert: false,
    firstnameInvalidAlert: false,
    lastnameEmptyAlert: false,
    lastnameInvalidAlert: false,
    emailExistsAlert: false,
    emailEmptyAlert: false,
    emailInvalidAlert: false,
    passwordEmptyAlert: false,
    passwordInvalidAlert: false,
    confirmPasswordEmptyAlert: false,
    confirmPasswordMatchAlert: false,
  };
  let validForm = true;
  const setInvalid = (inputAlert) => {
    queryParams[inputAlert] = true;
    validForm = false;
  };
  db.oneOrNone('SELECT * FROM users WHERE email = $1;', req.body.email.toLowerCase())
  .then((user) => {
    // Check if user with submitted email (req.body.email) exists in database
    if (user !== null) {
      setInvalid('emailExistsAlert');
    } else {
      // Validate inputs (req.boby)
      validation(
        req.body.firstname,
        'firstnameEmptyAlert',
        'firstnameInvalidAlert',
        req.body.lastname,
        'lastnameEmptyAlert',
        'lastnameInvalidAlert',
        req.body.email,
        'emailEmptyAlert',
        'emailInvalidAlert',
        req.body.password,
        'passwordEmptyAlert',
        'passwordInvalidAlert',
        req.body.confirmPassword,
        'confirmPasswordEmptyAlert',
        'confirmPasswordMatchAlert',
        setInvalid
      );
    };
    if (!validForm) {
      // If invalid form, redirect to form with alerts and values (except passwords) that were entered before submit
      queryParams.firstname = req.body.firstname;
      queryParams.lastname = req.body.lastname;
      queryParams.email = req.body.email;
      const query = querystring.stringify(queryParams);
      res.redirect(`/signup?${query}`);
    } else {
      // If valid form, add new user to database
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        const newUser = {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email.toLowerCase(),
          password: hash,
        };
        db.none('INSERT INTO users (firstname, lastname, email, password) VALUES (${newUser.firstname}, ${newUser.lastname}, ${newUser.email}, ${newUser.password});', {newUser})
        .then(() => {
          // Redirect back to signup page, but passing {modal: 'opened'} as a query string to get route => page will be rendered considering this additional info (with modal opened)
          const query = querystring.stringify({modal: 'opened'});
          res.redirect(`/signup?${query}`);
          //res.redirect('/login');
        })
        .catch((err) => res.render('pages/error', {err: err, title: 'Error | Mr.Coffee Schedule Management', current_user: req.session.user}));
      });
    };
  })
  .catch((err) => res.render('pages/error', {err: err, title: 'Error | Mr.Coffee Schedule Management', current_user: req.session.user}));
});

module.exports = signupRouter;