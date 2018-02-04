// => https://blog.jscrambler.com/implementing-jwt-using-passport/

// index.js
const express = require("express");  
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const auth = require("./auth.js")();  
const app = express();
const authRoutes = require('./routes/auth/')(auth);
const teamRoutes = require('./routes/team/')(auth);
const morgan = require('morgan');

const PORT = 4000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(morgan('dev'))
app.use(cookieParser());
app.use(bodyParser.json());  
app.use(auth.initialize());

app.use('/auth', authRoutes);
app.use('/team', teamRoutes);


app.all('*', (req, res) => res.status(404).send("No route!"))


app.listen( PORT, () => console.log("My API is running... "+PORT) );