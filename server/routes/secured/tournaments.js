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
    next();
  }
  else {

    var token =req.body.token || req.query.token || req.headers['x-access-token'];

    //Still not sure of the use of helper.verify() because of the next().
    if (token) {

      // verifies secret and checks exp
      jwt.verify(token, secretIdToken, function(err, decoded) {
        if (err) {
          console.log("problem with token");
          return res.status(403).json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          // if everything is good, save to request for use in other routes
          console.log("Token ok");
          req.decoded = decoded;
          res.header("Access-Control-Allow-Origin", "*");
          next();
        }
      });

    } else {
      // if there is no token
      // return an error
      return res.status(403).send({
          success: false,
          message: 'No token provided.'
      });
    }
  }
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

      tournament.save(function(err) {
        if (err) {
          res.send(err);
        }
        else {
          res.json({ message: 'Tournament updated' });
        }

      });
      // mongoose.Promise = global.Promise;
      // // save the tournament
      // var promise = tournament.save();
      //
      // promise.then( function (err, tournament) {
      //   if ( err ) {
      //     console.log("err : " + err);
      //     console.log("tournament : " + tournament);
      //     res.status(500).send(err);
      //   }
      //   else {
      //     console.log("Save OK");
      //     res.status(200).send({ message: 'Tournament updated', object : tournament});
      //   }
      // })
      // .catch((error) => {
      //   console.log(error);
      // });
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
      else {
        if ( tournament.result.n == 0) {
          res.json({ message : 'Tournament doesn\'t exist'})
        }
        else {
          res.json({ message: 'Tournament successfully deleted' });
        }
      }
    });
});

module.exports = router;
