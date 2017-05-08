const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const jwt    = require('jsonwebtoken');
const sha256 = require('sha256');

var User = require('../../models/user');
const config = require('../../config');

router.use(function(req, res, next) {
  console.log('Something is happening');
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST, OPTIONS,DELETE');
  res.header("Access-Control-Allow-Headers", "Content-Type, x-access-token");
  next();
})

router.route('/')
  .post(function (req, res) {
    console.log('authenticate');
    var password = req.body.pwd;

    User.findOne({
      login: req.body.login
    },function(err, user) {

      if ( err) throw err;

      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {
        if ( user.password == sha256(password)) {

            var token = jwt.sign({ username : user.login}, config.secret, {
                  expiresIn: 86400 // expires in 24 hours
                  // expiresIn: 3600 // expires in 1 hours
                });

            res.json({
                success: true,
                login: user.login,
                firstname: user.firstname,
                lastname: user.lastname,
                admin: user.admin,
                token: token
              });
         }
         else {
           res.json({ success: false, message: 'Authentication failed.' });
         }
       }
   })
});

router.route('/verify')
  .post(function (req, res) {
    console.log('Verify token');
    var token = req.body.token;
    console.log('token : ' + token);
    //TODO Use the jwt.verify()
    var isTokenValid = jwt.verify(token, config.secret);
    // FOR TEST
    //isTokenValid = true;

    if ( isTokenValid ) {
      res.json({ success: true, message: 'Token valid' });
    }
    else {
      res.json({ success: false, message: 'Token invalid' });
    }

});

module.exports = router;
