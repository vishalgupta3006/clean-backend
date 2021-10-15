const express = require('express');
const config = require('./config');
const mongoose = require('mongoose');
const router = require('./api/register');
const app = express();

//Connect To DB
mongoose.connect(config.db.connectionString)
.then(() => {console.log("Connected to the databse....")})
.catch(error => console.log('Error While Connecting to db', error));

//Middleware to read the body of requests
app.use(express.json());

app.use('/api/register',router);
app.use('/api/lead', require('./api/lead'));
app.use('/api/get', require('./api/getLeads'));

//Listen to the port
app.listen(config.app.port, ()=>{
  console.log(`app is listening on port ${config.app.port}`);
});