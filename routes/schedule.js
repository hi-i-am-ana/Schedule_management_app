const express = require('express');
const querystring = require('querystring');
const db = require('../db/db.js');
const loggedOutCheck = require('../middleware.js').loggedOutCheck;
const scheduleRouter = express.Router();

// Get user schedules
scheduleRouter.get('/', loggedOutCheck, (req, res) => {
  db.each('SELECT * FROM schedules WHERE user_id = $1 ORDER BY day ASC, start_time ASC, end_time ASC;', req.session.user.user_id, row => {
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
  .then((schedules) => {
    res.render('pages/schedule_management', {
      schedules: schedules,
      title: 'Schedule Management | Mr.Coffee Schedule Management',
      current_user: req.session.user,
      modal: req.query.modal
    });
  })
  .catch((err) => res.render('pages/error', {err: err, title: 'Error | Mr.Coffee Schedule Management', current_user: req.session.user}));
});

// Post new schedule
scheduleRouter.post('/', (req, res) => {
  const start_hours = req.body.start_time.substring(0,2)
  const start_minutes = req.body.start_time.substring(3)
  const start_time = new Date()
  start_time.setHours(start_hours, start_minutes)

  const end_hours = req.body.end_time.substring(0,2)
  const end_minutes = req.body.end_time.substring(3)
  const end_time = new Date()
  end_time.setHours(end_hours, end_minutes)

  newSchedule = {
    user_id: req.session.user.user_id,
    day: +req.body.day,
    start_time: start_time,
    end_time: end_time
  };

  db.none('INSERT INTO schedules (user_id, day, start_time, end_time) VALUES (${newSchedule.user_id}, ${newSchedule.day}, ${newSchedule.start_time}, ${newSchedule.end_time});', {newSchedule})
  // Redirect back to schedule management page with modal opened
  .then(() => {
    const query = querystring.stringify({modal: 'opened'});
    res.redirect(`/schedule?${query}`);
  })
  .catch((err) => res.render('pages/error', {err: err, title: 'Error | Mr.Coffee Schedule Management', current_user: req.session.user}));
});

// Delete schedule
scheduleRouter.delete('/:id', (req,res) => {
  // console.log(req.body);
  // console.log(req.method);
  // console.log(req.originalMethod);
  db.none('DELETE FROM schedules WHERE schedule_id = $1;', req.body.schedule)
  .then(() => res.redirect('/schedule#user-schedules-title'))
  .catch((err) => res.render('pages/error', {err: err, title: 'Error | Mr.Coffee Schedule Management', current_user: req.session.user}));
});

module.exports = scheduleRouter;