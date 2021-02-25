const express = require('express');
const logoutRouter = express.Router();

logoutRouter.get('/', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});

module.exports = logoutRouter;