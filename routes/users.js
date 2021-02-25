const express = require('express');
const db = require('../db/db.js');
const usersRouter = express.Router();

// Get user info and schedules
usersRouter.get('/:id(\\d+)', (req, res) => {
  if (req.session.user) {
    db.each('SELECT users.user_id, firstname, lastname, email, schedule_id, day, start_time, end_time FROM users LEFT JOIN schedules ON schedules.user_id = users.user_id WHERE users.user_id = $1 ORDER BY day ASC, start_time ASC, end_time ASC;', req.params.id, row => {
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
    .then((rows) => {
      if (rows.length === 0) {
        res.status(404).send();
      } else {
        res.render('pages/user_profile', {rows: rows, title: 'User Profile | Mr.Coffee Schedule Management'})
      }
    })
    .catch((err) => res.render('pages/error', {err: err, title: 'Error | Mr.Coffee Schedule Management'}));
  } else {
    res.redirect('/login'); // ADD MESSAGE HERE
  };
});

module.exports = usersRouter;