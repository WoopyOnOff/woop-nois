const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const jwt = require('jsonwebtoken');
const helper = require('./_helper');

router.use(function (req, res, next) {

  console.log('Request on /api/secured/teams');
  console.log('Request mode : ' + req.method);

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, x-access-token");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');

  if (req.method == 'OPTIONS') {
    next();
  }
  else {

    var token =req.body.token || req.query.token || req.headers['x-access-token'];

    var response = helper.isSecured(req, res, token);
    //Still not sure of the use of helper.verify() because of the next().
    if ( response != null) {
      return response;
    }
  }
  next();
});

router.route('/:team_id')

  // Delete d'une poule
  .delete(function (req, res) {
    console.log('SERVER: Delete pool with id : ' + req.params.pool_id);
    Pool.remove({
      _id: req.params.pool_id
    }, function (err, pool) {
      if (err) {
        console.log('SERVER: Error : ' + err);
        res.send(err);
      }

      if (pool.result.n == 0) {
        res.json({ message: 'Pool doesn\'t exist' })
      }
      else {
        res.json({ message: 'Pool successfully deleted' });
      }

    });
  });

module.exports = router;
