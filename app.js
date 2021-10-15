const express = require('express');
const config = require('./config');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
require('dotenv').config();
const app = express();

//Passport config
require('./config/passport');

// //Connect To DB
mongoose.connect(process.env.DB_String, config.db.dbOptions)
  .then(() => { console.log("Connected to the databse....") })
  .catch(error => console.log('Error While Connecting to db', error));

//Middleware to read the body of requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Express session middleware
app.use(session({
  secret: process.env.Session_Secret,
  resave: true,
  store: MongoStore.create({
    mongoUrl: process.env.DB_String,
    mongoOptions: config.db.dbOptions,
    collection: 'sessions'
  }),
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}));

// const sessionStore = new MongoStore({
//   mongooseConnection: connection
// })

//Passport middlewares
app.use(passport.initialize());
app.use(passport.session());

//Endpoints

app.use('/api/lead', require('./api/lead'));
app.use('/api/', require('./api/index'));

//Listen to the port
app.listen(process.env.port, () => {
  console.log(`app is listening on port ${process.env.port}`);
});