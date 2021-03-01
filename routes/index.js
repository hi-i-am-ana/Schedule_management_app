const express = require('express');
const db = require('../db/db.js');
const loggedOutCheck = require('../middleware.js').loggedOutCheck;
const homeRouter = express.Router();

// Get list of schedules (home route)
homeRouter.get('', loggedOutCheck,(req, res) => {
  // Use 'each' method for query to execute callback function to convert day from number to string and timestamptz to string
  db.each('SELECT users.user_id, firstname, lastname, schedule_id, day, start_time, end_time FROM users INNER JOIN schedules ON schedules.user_id = users.user_id ORDER BY user_id ASC, day ASC, start_time ASC, end_time ASC;', [], (row) => {
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
  .then((schedules) => res.render('pages/index', {schedules: schedules, title: 'Home | Mr.Coffee Schedule Management', current_user: req.session.user}))
  .catch((err) => res.render('pages/error', {err: err, title: 'Error | Mr.Coffee Schedule Management', current_user: req.session.user}));
});

module.exports = homeRouter;