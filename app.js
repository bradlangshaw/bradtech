var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var loki = require('lokijs');
var fs = require('fs');
var cors = require('cors');
var bodyParser = require('body-parser');

const nodemailer = require('nodemailer');


const UPLOAD_PATH = 'uploads';
const COLLECTION_NAME = 'images';
// passport dependencies
var upload = multer({ dest: `${UPLOAD_PATH}/` });
let passport = require('passport');
let session = require('express-session');
let localStrategy = require('passport-local').Strategy;


var index = require('./routes/index');
var users = require('./routes/users');
var articles = require('./routes/articles');

let mongoose = require('mongoose');
let config = require('./config/globals');
mongoose.connect(config.db);

let db = mongoose.connection;
db.once('open', function() {
  console.log('Connected to mongodb');
});

var app = express();
app.use(cors());



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// passport config BEFORE controller references
app.use(session({
  secret: 'some string value here',
    resave: true,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// use the Account model to manage users
let Account = require('./models/account');
passport.use(Account.createStrategy());

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL,
        profileFields: ['id', 'emails']
    },
    function(accessToken, refreshToken, profile, cb) {
        Account.findOrCreate({
            googleId: profile.id,
            username: profile.emails[0].value
        }, function (err, user) {
            return cb(err, user);
        });
    }
));

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


app.use('/', index);
app.use('/users', users);
app.use('/articles', articles);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
