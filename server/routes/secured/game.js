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

// define model =================
var Game = require('../../models/game');
var Pool = require('../../models/pool');
var Team = require('../../models/team');

// routes ======================================================================

// post of a game 
router.route('/')
  // Ajout d'une game, a partir des id des deux equipes et de la pool
    if ( Object.keys(req.query).length === 0) {
      console.log('Unknown Query : ' + JSON.stringify(req.query));
      res.status(400).send('Bad request : Unknown Query : ' + JSON.stringify(req.query));
    } else {
      console.log('Query : ' + JSON.stringify(req.query));
      if (req.query.idPool != null and req.query.idTeam1 != null and req.query.idTeam2 != null)
      {
        Pool.findById(req.query.idPool)
          .then( function (pool) {
            if (req.body.poolId != null) {
              Team.findById(req.query.idTeam1)
                .then( function (team) {
                  // la je suis perdu... CPA...
                })


              //pool.tournamentId = req.body.tournamentId;
            }
            

            // Add Game in Mongo
            console.log('SERVER : Post a game');
            var game = new Game();

            game = Game.createInstance(req, game);

            game.save(function(err) {
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