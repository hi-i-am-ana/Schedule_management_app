const express = require('express');

const path = require('path');
// TODO: Research repl
const { start } = require('repl');

// TODO: Change to bcrypt?
const crypto = require('crypto');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');

const database = require('./db/db.js');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expressLayouts);
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Add router for /login requests
const loginRouter = require('./login.js');
app.use('/login', loginRouter);

// Add router for /logout requests
const logoutRouter = require('./logout.js');
app.use('/logout', logoutRouter);

// Add router for /schedule requests
const scheduleRouter = require('./schedule.js');
app.use('/schedule', scheduleRouter);

// Add router for /signup requests
const signupRouter = require('./signup.js');
app.use('/signup', signupRouter);

// Add router for user/ requests
const userRouter = require('./user.js');
app.use('/user', userRouter);

app.listen(PORT, () => console.log(`Server is listening on localhost:${PORT}!\n`));