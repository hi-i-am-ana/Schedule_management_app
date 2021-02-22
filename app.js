const express = require('express');

const path = require('path');
// TODO: Research repl
const { start } = require('repl');

// TODO: Change to bcrypt?
const crypto = require('crypto');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');

const db = require('./db/db.js');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expressLayouts);
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set("layout extractScripts", true);

// Add router for /login requests
const loginRouter = require('./routes/login.js');
app.use('/login', loginRouter);

// Add router for /logout requests
const logoutRouter = require('./routes/logout.js');
app.use('/logout', logoutRouter);

// Add router for /schedule requests
const scheduleRouter = require('./routes/schedule.js');
app.use('/schedule', scheduleRouter);

// Add router for /signup requests
const signupRouter = require('./routes/signup.js');
app.use('/signup', signupRouter);

// Add router for user/ requests
const usersRouter = require('./routes/users.js');
app.use('/users', usersRouter);


// Get list of schedules (home route)
app.get('/', (req, res) => {
  // Use 'each' method for query to execute callback function to convert day from number to string
  db.each('SELECT users.user_id, firstname, lastname, schedule_id, day, start_time, end_time FROM users LEFT JOIN schedules ON schedules.user_id = users.user_id ORDER BY user_id, day ASC, start_time ASC, end_time ASC;', [], row => {
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
  .then((schedules) => res.render('pages/index', {schedules: schedules, title: 'Home | Mr.Coffee Schedule Management'}))
  .catch((err) => res.render('pages/error', {err: err, title: 'Error | Mr.Coffee Schedule Management'}));
});

app.listen(PORT, () => console.log(`Server is listening on localhost: ${PORT}!\n`));