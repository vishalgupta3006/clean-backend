const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
require('dotenv').config();
const app = express();
const cors = require('cors')

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
app.use(cookieParser());

//Passport middlewares
app.use(passport.initialize());
app.use(passport.session());

//Allow CORS from the selected origins
app.use(cors({
  origin: ['http://localhost:3000','http://192.168.1.107:3000','https://clean-ui-sigma.vercel.app'],
  credentials: true,
  //allowedHeaders: ['Content-Type', 'Accept', 'X-Requested-With', 'X-HTTP-Method-Override'],
}));

//Endpoints
app.use('/api/', require('./api/index'));
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found', route: req.url})
})

//Listen to the port
app.listen(process.env.PORT|| 8080, () => {
  console.log(`app is listening on port ${process.env.PORT|| 8080}`);
});