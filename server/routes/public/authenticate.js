const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const jwt    = require('jsonwebtoken');
const sha256 = require('sha256');
var User = require('../../../src/app/models/user');

router.use(function(req, res, next) {
  console.log('Something is happening : ' +req);
  next();
})

router.route('/')
  .post(function (req, res) {

    var password = req.body.pwd;

    User.findOne({
      name: req.body.name
    },function(err, user) {

      if ( err) throw err;

      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {
        console.log(user.name);
        console.log(user.password);
        console.log(sha256(password));
        if ( user.password == sha256(password)) {

            var token = jwt.sign({ username : user.name}, secretIdToken, {
                  expiresIn: 1440 // expires in 24 hours
                });

            res.json({
                success: true,
                message: 'Enjoy your token!',
                token: token
              });
         }
         else {
           res.json({ result : user, success: false, message: 'Authentication failed.' });
         }
       }
   })
});

module.exports = router;
