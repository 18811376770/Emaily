const cookieSession = require('cookie-session');
const passport = require('passport');
const express=require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys')
//just execute the passport.js, not assign anything
//pay attention to the order of these two "require"s
//we should execute User prior to passport in order to register Schema to User model
require('./models/User');
require('./services/passport');
mongoose.connect(keys.mongoURI);
const authRoutes = require('./routes/authRoutes');
const app=express();
app.use(
  cookieSession({
    //cookie lasts 30 days before expired.
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
authRoutes(app);
//look at the underline environment and see if there's a port we'll gonna use
//if we are in development environment, heroku won;t assign us a port(in production, it will)
//so we listen to default port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
