const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.use(function(req, res, next) {
  console.log('Request on /api/pool');
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
})

// define model =================
var Pool     = require('../../models/pool');

// routes ======================================================================

// api ---------------------------------------------------------------------
// get all pools
router.route('/')
.get(function (req, res) {
  console.log('SERVER : Get all pools');
  // use mongoose to get all pools in the database
  Pool.find(function(err, pools) {

    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err)
    res.send(err)

    res.json(pools); // return all pools in JSON format
  });
});

router.route('/:pool_id')
.get(function(req, res) {
  console.log('SERVER : Get a pool');
  Pool.findById(req.params.pool_id, function (err, pool) {
    if ( err ) {
      console.log('error while getting pool with id ');
      res.send(err);
    }
    res.json(pool);
  })
});

module.exports = router;
