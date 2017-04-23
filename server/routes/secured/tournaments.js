const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const jwt    = require('jsonwebtoken');
const helper = require('./_helper');

// define model =================
var Tournament     = require('../../models/tournament');

router.use(function(req, res, next) {

  console.log('Request on /api/secured/tournaments');
  console.log('Request mode : ' + req.method);

  if (req.method == 'OPTIONS') {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, x-access-token");
    res.header("Access-Control-Max-Age", "1728000");
  }
  else {

    var token =req.body.token || req.query.token || req.headers['x-access-token'];

    var response = helper.isSecured(req, res, token);

    if ( response != null) {
      return response;
    }
  }

  next();
});

// routes ======================================================================

// api ---------------------------------------------------------------------
// get all tournamenets
router.route('/')
.post(function (req, res) {

  console.log('SERVER : Post a tournament');
  var tournament = new Tournament();

  tournament = Tournament.createInstance(req, tournament);

  var promise = tournament.save();

  mongoose.Promise = global.Promise;

  promise.then( function (tournament) {
    res.json({ message: 'Tournament created!' , object : tournament});
  });
});

router.route('/:tournament_id')

  .options(function(req, res) {
    console.log('SERVER : option');
    res.send();
  })

  .put(function(req, res) {
    console.log('SERVER : Update a tournament');

    Tournament.findById(req.params.tournament_id)
    .then( function (tournament) {

      if (req.body.label != null) {
        tournament.label = req.body.label;
      }
      if (req.body.gameType != null) {
        tournament.gameType = req.body.gameType;
      }
      if (req.body.date != null) {
        tournament.date = req.body.date;
      }
      if (req.body.nbTeamsPerPool != null) {
        tournament.nbTeamsPerPool = req.body.nbTeamsPerPool;
      }
      if (req.body.nbPlayersPerTeam != null) {
        tournament.nbPlayersPerTeam = req.body.nbPlayersPerTeam;
      }
      if (req.body.isActif != null) {
        tournament.isActif = req.body.isActif;
      }
      if (req.body.isPublished != null) {
        tournament.isPublished = req.body.isPublished;
      }

      tournament.modifiedDate = Date.now();

      // save the tournament
      tournament.save(function(err) {
        if (err)
        res.send(err);

        res.json({ message: 'Tournament updated' });
      });

    });

  })

  .delete(function (req, res) {
    console.log('SERVER: Delete tournament with id : ' + req.params.tournament_id);
    Tournament.remove({
      _id: req.params.tournament_id
    }, function(err, tournament) {
      if (err) {
        console.log('SERVER: Error : ' + err);
        res.send(err);
      }

      if ( tournament.result.n == 0) {
        res.json({ message : 'Tournament doesn\'t exist'})
      }
      else {
        res.json({ message: 'Tournament successfully deleted' });
      }

    });
});

module.exports = router;
