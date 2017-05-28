const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const jwt = require('jsonwebtoken');
const helper = require('./_helper');

router.use(function (req, res, next) {

  console.log('Request on /api/secured/games');
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
var Game = require('../../models/game');
var Pool = require('../../models/pool');
var Team = require('../../models/team');

// routes ======================================================================

// post of a game 
router.route('/')
  // Ajout d'une game, a partir des id des deux equipes et de la pool
  .post(function (req, res) {
    if ( Object.keys(req.query).length === 0) {
      console.log('Unknown Query : ' + JSON.stringify(req.query));
      res.status(400).send('Bad request : Unknown Query : ' + JSON.stringify(req.query));
    } else {
      console.log('Query : ' + JSON.stringify(req.query));

      console.log('req.query.idPool = ' + req.query.idPool);
      console.log('req.query.teamId1 = ' + req.query.teamId1);
      console.log('req.query.teamId2 = ' + req.query.teamId2);

      if (req.query.idPool != null && req.query.teamId1 != null && req.query.teamId2 != null)
      {
        Pool.findById(req.query.idPool)
          .then( function (pool) {
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
            
            // Test if teamId1 exist in the database
            Team.findById(req.query.teamId1, function (err, pool) {
               if ( err ) {
                console.log('error while getting team with id ');
                res.send(err);
              }
            });

            // Test if teamId2 exist in the database
            Team.findById(req.query.teamId2, function (err, pool) {
               if ( err ) {
                console.log('error while getting team with id ');
                res.send(err);
              }
            });

            // Add Game in Mongo
            console.log('SERVER : Post a game');
            var game = new Game();

            game = Game.createInstance(req, game);

            // Add IdGame in the pool
            pool.scores.push(game._id);            
            pool.save(function(err) {
              if (err)
              res.send(err);

              var promise = game.save();
              mongoose.Promise = global.Promise;
              promise.then(function (game) {
                res.json({ message: 'Game created!', object: game });
              });
            });           
          });
      }
    }
    
  });

module.exports = router;