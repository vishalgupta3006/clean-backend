const express = require('express');
const config = require('./config');
const mongoose = require('mongoose');
const session = require('express-session');
const router = require('./api/register');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
require('dotenv').config();
const app = express();

//Passport config
require('./config/passport');

// //Connect To DB
const connection = mongoose.connect(process.env.DB_String, config.db.dbOptions)
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
    collection: 'session'
  }),
  saveUninitialized: true,
  cookie:{
    maxAge: 1000*60*60*24
  }
}));

// const sessionStore = new MongoStore({
//   mongooseConnection: connection
// })

//Passport middlewares
app.use(passport.initialize());
app.use(passport.session());

//Endpoints
app.get('/', (req, res)=>  {
  if(req.session.viewCount){
    req.session.viewCount++;
  }
  else{
    req.session.viewCount = 1;
  }
  res.send(`<h1>HELLO, You have visited ${req.session.viewCount} times</h1>`)
})
app.use('/api/register', router);
app.use('/api/lead', require('./api/lead'));
app.use('/api/get', require('./api/getLeads'));
app.use('/login', require('./api/login'));
app.get('/failed',(req, res) => {
  res.send("Login failed")
})
app.get('/success',(req, res) => {
  res.send("Login Success")
})
//Listen to the port
app.listen(process.env.port, () => {
  console.log(`app is listening on port ${process.env.port}`);
});