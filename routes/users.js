const express = require('express');
const db = require('../db/db.js');
const loggedOutCheck = require('../middleware.js').loggedOutCheck;
const usersRouter = express.Router();

// Get user info and schedules
usersRouter.get('/:id(\\d+)', loggedOutCheck, (req, res) => {
  db.one('SELECT * FROM users WHERE user_id = $1;', req.params.id)
  .then((user) => {
    db.each('SELECT * FROM schedules WHERE user_id = $1 ORDER BY day ASC, start_time ASC, end_time ASC;', req.params.id, row => {
      const days = {
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday',
        7: 'Sunday'
      };
      row.day = days[row.day];
      row.start_time = new Date(row.start_time).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
      row.end_time = new Date(row.end_time).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
    })
    .then((schedules) => res.render('pages/user_profile', {
      user: user,
      schedules: schedules,
      title: 'User Profile | Mr.Coffee Schedule Management',
      current_user: req.session.user
    }))
    .catch((err) => res.render('pages/error', {err: err, title: 'Error | Mr.Coffee Schedule Management', current_user: req.session.user}));
  })
  .catch((err) => res.status(404).render('pages/error', {
    err: {message: 'HTTP ERROR 404. This page can not be found'},
    title: 'Error | Mr.Coffee Schedule Management',
    current_user: req.session.user
  }));
});

module.exports = usersRouter;