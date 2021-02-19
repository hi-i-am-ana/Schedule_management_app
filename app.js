const express = require('express')
const app = express()
const PORT = 4000
const morgan = require('morgan')
const database = require('./db/db.js')
const expressLayouts = require('express-ejs-layouts');

app.use(express.json());
app.use(expressLayouts);

const bodyParser = require("body-parser")
const crypto = require("crypto")

// research repl
const { start } = require('repl')

app.set('view engine', 'ejs')

// app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'))

app.listen(PORT, () => {
    console.log(`server is listening on localhost:${PORT}!\n`)
})