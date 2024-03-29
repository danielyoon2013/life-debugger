const express = require('express');
const passport = require('passport');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const database = require('./db/index.js');

//const morgan = require('morgan');
//const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 8080;

// Priority serve any static files.
//app.use(morgan('dev'));
//app.use(cookieParser());

app.use(cors());
app.use(express.static(path.join(__dirname, '../client/'),{index: false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'slfjlsajfa1111',
  resave: true,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./resources/router')(app, passport);
require('./config/passport')(passport);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));