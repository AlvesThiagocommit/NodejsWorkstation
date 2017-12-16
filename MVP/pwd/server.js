const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const request = require('request');
const async = require('async');
const expressHbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');



const app = express();

//
app.engine('.hbs', expressHbs({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public' ));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(session({
  resave: true,
  saveUinitialiazed: true,
  secret: "arashhahahaha",
  store: new MongoStore({ url: 'mongodb://root:abc123@ds133331.mlab.com:33331/arashnewsletter'})
}));
app.use(flash());

app.route('/')
  .get((req, res, next) => {
    res.render('main/home', { message: req.flash('success') });
  })
  .post((req, res, next) => {
    request({
      url: 'https://us15.api.mailchimp.com/3.0/lists/e21a2d4e84/members',
      method: 'POST',
      headers: {
        'Authorization': 'randomUser 3336e0cf91b5a9e8bf2c3aa18d71aad3-us15',
        'Content-Type': 'application/json'
      },
      json: {
        'email_address': req.body.email,
        'status': 'subscribed'
      }
    }, function(err, response, body) {
      if (err) {
        console.log(err);
      } else {
        req.flash('success', 'You have submitted your email');
        res.redirect('/');
      }
    });
  });

// Session = memory store, if you want to perserve the data for future use
// Data Store = mongodb, redis

app.listen(3030, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Running on Port 3030");
  }
});
