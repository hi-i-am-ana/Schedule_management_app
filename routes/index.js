const express = require('express');
homeRouter = express.Router();

app.get('/', (req, res) => {
  // Use 'each' method for query to execute callback function to convert day from number to string
  database.each('SELECT users.user_id, firstname, lastname, schedule_id, day, start_time, end_time FROM users LEFT JOIN schedules ON schedule.user_id = users.user_id ORDER BY username ASC, day ASC, start_time ASC, end_time ASC;', [], row => {
    const days = {
      1: 'Monday',
      2: 'Tuesday',
      3: 'Wednesday',
      4: 'Thursday',
      5: 'Friday',
      6: 'Saturday',
      7: 'Sunday'
    }
    row.day = days[row.day];
    row.start_time = new Date(row.start_time).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
    row.end_time = new Date(row.end_time).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
  })
  .then((schedules) => res.render('pages/index', {schedules: schedules, title: 'Home | Mr.Coffee Schedule Management'}))
  .catch((err) => res.render('pages/error', {err: err, title: 'Error | Mr.Coffee Schedule Management - '}));
});

module.exports = loginRouter;