const express = require('express');
const logoutRouter = express.Router();

logoutRouter.get('/', (req, res) => res.redirect('/login')); // DELETE SESSION DATA HERE

module.exports = logoutRouter;