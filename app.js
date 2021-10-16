const express = require('express');
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
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
mongoose.connect(process.env.DB_String, dbOptions)
  .then(() => console.log('Connected to the databse...'))
  .catch(error => console.log('Error While Connecting to DB', error));

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
    mongoOptions: dbOptions
  }),
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }
}));


//Passport middlewares
app.use(passport.initialize());
app.use(passport.session());

//Endpoints
app.use('/api/', require('./api/index'));

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found', route: req.url});
})
//Listen to the port
app.listen(process.env.port, () => {
  console.log(`app is listening on port ${process.env.port}`);
});