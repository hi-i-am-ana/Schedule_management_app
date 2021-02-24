const express = require('express');
const crypto = require("crypto")
const db = require('../db/db.js');
const signupRouter = express.Router();

signupRouter.get('/', (req, res) => {
    res.render('pages/signup', { title: "signup"})
     });

signupRouter.post('/', (req, res) => {
    const psw = req.body.password;
    const passwordEncr = crypto.createHash("sha256").update(psw).digest("hex");
  
    const newUser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: passwordEncr,
        };

db.none('INSERT INTO users (firstname, lastname, email, password) VALUES (${newUser.firstname}, ${newUser.lastname}, ${newUser.email}, ${newUser.password});', {newUser})
  .then(() => {
    res.redirect('/pages/login');
    })
    .catch((err) => res.render('pages/error', {err: err, title: 'Error | Mr.Coffee Schedule Management'}));
    });

    // signupRouter.post("/signup", (req,res) => {
//     const firstname = req.body.firstname
//     const lastname = req.body.lastname
//     const email = req.body.email
//         });

//      function checkname (variable) {
//         let str = /^([A-Za-z])+$/
//         return str.test(variable)
//         }
    
//     function checkemail (variable) {
//         let str = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//         return str.test(variable)
//         }
    
//     if ( firstname.value === '' || lastname.value === '' || email.value === '') {
//     return
//     }
//     else {
//     if (checkname (firstname.value) === true){
//         if (checkname (lastname.value) === true){
//                 if (checkemail (email.value) === true) {
//         const btn = document.getElementById("submit-button");
        

//                 }}
//         }
//     }

module.exports = signupRouter;