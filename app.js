const express = require('express');
const path = require('path');

const session = require('express-session');
const cookieParser = require('cookie-parser')
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT;

// TODO: express-session should work without cookie-parser
//app.use(cookieParser('I like to sing, sing in the shower. Ah-ha!'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expressLayouts);
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(morgan('dev')); // static routes won't be logged if logger is instantiated after static routes

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set("layout extractScripts", true);

// Configure session middleware
app.use(session({
  // genid: , change to unique ID generator
  // name: , connect.sid by default
  cookie: {
    maxAge: 60 * 60 * 1000, // 1 hour
    // secure: true, for https
  },
  secret: 'I like to sing, sing in the shower. Ah-ha!', // used to sign the session ID cookie, should be loaded from env var
  resave: false, // true by default, if true, whether or not session data has changed, it is forcibly saved
  saveUninitialized: false, // true by default, check this
}));

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

// Add router for / requests
const homeRouter = require('./routes/index.js');
app.use('/', homeRouter);

app.listen(PORT, () => console.log(`Server is listening on localhost:${PORT}!\n`));