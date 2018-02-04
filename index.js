// => https://blog.jscrambler.com/implementing-jwt-using-passport/
// index.jsx

// APP
const express = require("express");  
const app = express();

// TOOLS
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const passport = require("./passport.js")();  

// DEV
const morgan = require('morgan');

// ROUTE HANDLERS
const authRoutes = require('./routes/auth/')(passport);
const teamRoutes = require('./routes/team/')(passport);

// ENV VARIABLES
const PORT = 4000;

// HEADERS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// INITIALIZE
app.use(morgan('dev'))
app.use(cookieParser());
app.use(bodyParser.json());  
app.use(passport.initialize());

// ROUTES
app.use('/auth', authRoutes);
app.use('/team', teamRoutes);


app.all('*', (req, res) => res.status(404));
app.listen( PORT, () => console.log("Running on port: "+PORT) );