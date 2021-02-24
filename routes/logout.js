const express = require('express');
const logoutRouter = express.Router();

logoutRouter.get('/', (req, res) => {
  res.clearCookie('AuthToken')
  res.redirect('/login');
});

module.exports = logoutRouter;