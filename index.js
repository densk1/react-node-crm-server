// => https://blog.jscrambler.com/implementing-jwt-using-passport/
// index.jsx

// APP
const express = require("express");  
const app = express();

// DATABASE
const mongoose = require('./model/mongoose.js');

// TOOLS
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const passport = require("./passport/")();  

// DEV
const morgan = require('morgan');

// ROUTE HANDLERS
const authRoutes = require('./routes/auth/')(passport);
const teamRoutes = require('./routes/team/')(passport);
const crmRoutes = require('./routes/crm/')(passport);

// ENV VARIABLES
const PORT = 4000;

// HEADERS
const cors = require('./cors');
app.use(cors);

// INITIALIZE
app.use(morgan('dev'))
app.use(cookieParser());
app.use(bodyParser.json());  
app.use(passport.initialize());

// ROUTES
app.use('/auth', authRoutes);
app.use('/team', teamRoutes);
app.use('/crm', crmRoutes);


app.all('*', (req, res) => res.status(404));
app.listen( PORT, () => console.log("Running on port: "+PORT) );