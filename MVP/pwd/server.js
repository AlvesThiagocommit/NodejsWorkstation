const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const request = require('request');
const async = require('async');
const expressHbs = require('express-handlebars');


const app = express();

app.engine('.hbs', expressHbs({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public' ));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

//3a648573050231ae1cd40ea76324923d-us17
//https://us15.api.mailchimp.com/3.0/lists/695f8a697d/members
app.get('/', (req, res, next) => {
  res.render('main/home');
});


app.listen(3030, (err) => {
  if (err) {
    console.log(err);  
  } else {
    console.log("Running on Port 3030")  
  }
});
