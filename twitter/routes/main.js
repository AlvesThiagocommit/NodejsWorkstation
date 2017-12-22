const router = require('express').Router();
const User = require('../models/user');

router.get('/', (req, res, next) => {
  res.render('main/landing');

});

router.get('/create-new-user', (req, res, next) => {
  var user = new User();
  user.email = "gtav@gmail.com"
  user.name = "Jack";
  user.password = "123456";
  user.save(function(err) {
    if (err) return next(err);
    res.json("Successfully created");
  });
});


module.exports = router;
