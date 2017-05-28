const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const jwt = require('jsonwebtoken');
const helper = require('./_helper');

router.use(function (req, res, next) {

  console.log('Request on /api/secured/pools');
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

// define model =================
var Pool = require('../../models/pool');

// routes ======================================================================

// api ---------------------------------------------------------------------
// get all pools



// TODO pools?idTournament=	GET	#idtournoi
// TODO
router.route('/')

  .options(function(req, res) {
    console.log('/ : option');
  })
  // Ajout d'une poule
  .post(function (req, res) {

    console.log('SERVER : Post a pool');
    var pool = new Pool();

    pool = Pool.createInstance(req, pool);

    var promise = pool.save();

    mongoose.Promise = global.Promise;

    promise.then(function (pool) {
      res.json({ message: 'Pool created!', object: pool });
    });
  });

router.route('/:pool_id')

  .options(function(req, res) {
    console.log('/:pool_id : option');
  })
  .put(function(req, res) {
    console.log('SERVER : Update a pool');
    Pool.findById(req.params.pool_id)
    .then( function (pool) {

      //TODO Complete
      if (req.body.tournamentId != null) {
        pool.tournamentId = req.body.tournamentId;
      }
      if (req.body.poolName != null) {
        pool.poolName = req.body.poolName;
      }
      if (req.body.teams != null) {
        pool.teams = req.body.teams;
      }
      if (req.body.scores != null) {
        pool.scores = req.body.scores;
      }
      if (req.body.pass != null) {
        pool.pass = req.body.pass;
      }

      // save the pool
      pool.save(function(err) {
        if (err)
        res.send(err);

        res.json({ message: 'Pool updated' });
      });

    });

  })

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
