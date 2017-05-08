const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const jwt = require('jsonwebtoken');
const helper = require('./_helper');

router.use(function (req, res, next) {

  console.log('Request on /api/secured/game');
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

    if ( response != null) {
      return response;
    }
    //res.header("Access-Control-Allow-Origin", "*");
  }
  next();
});
