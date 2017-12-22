const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const hbs = require('hbs');
const expressHbs = require('express-handlebars');
const config = require('./config/secret');

const app = express();

mongoose.connect(config.database, function(err) {
  if (err) console.log(err);
  console.log("connected to the database");
});

app.engine('.hbs', expressHbs({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mainRoutes = require('./routes/main');

app.use(mainRoutes);


app.listen(3030, (err) => {
  if (err) console.log(err);
  console.log(`Running on port ${3030}`);
});