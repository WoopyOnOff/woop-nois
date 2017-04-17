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
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
})

router.route('/')
  .post(function (req, res) {

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
                  expiresIn: 1440 // expires in 24 hours
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

module.exports = router;
