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

// define model =================
var Team = require('../../models/team');
var Pool = require('../../models/pool');

// routes ======================================================================

// api ---------------------------------------------------------------------

router.route('/')
  // Ajout d'une team dans une poule
  .post(function (req, res) {
    
    if ( Object.keys(req.query).length === 0) {
      console.log('Unknown Query : ' + JSON.stringify(req.query));
      res.status(400).send('Bad request : Unknown Query : ' + JSON.stringify(req.query));
    } else {
      console.log('Query : ' + JSON.stringify(req.query));
      if (req.query.idPool != null)
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

            // Add Team in Mongo
            console.log('SERVER : Post a team');
            var team = new Team();

            team = Team.createInstance(req, team);

            // Add IdTeam in the pool
            pool.teams.push(team._id);            
            pool.save(function(err) {
              if (err)
              res.send(err);

              var promise = team.save();
              mongoose.Promise = global.Promise;
              promise.then(function (team) {
                res.json({ message: 'Team created!', object: team });
              });
            });            
          });
      }
    }
    
  });

router.route('/:team_id')
  .options(function(req, res) {
    console.log('/:team_id : option');
  })

  .put(function(req, res) {
    console.log('SERVER : Update a team');
    Team.findById(req.params.team_id)
    .then( function (team) {

      if (req.body.poolId != null) {
        team.poolId = req.body.poolId;
      }
      if (req.body.listJoueurs != null) {
        team.listJoueurs = req.body.listJoueurs;
      }
      if (req.body.isActif != null) {
        team.isActif = req.body.isActif;
      }

      // save the tournament
      team.save(function(err) {
        if (err) {
          return res.send(err);
        }
        else {
          var promise = team.save();
          mongoose.Promise = global.Promise;
          promise.then(function (team) {
            res.json({ message: 'Team updated' });
          });
        }        
      });
    });
  })

  // Delete d'une team
  .delete(function (req, res) {
    console.log('SERVER: Delete team with id : ' + req.params.team_id);
    Team.findById(req.params.team_id)
      .then( function (teamFinded) {
          if (req.body.poolId != null) {
            teamFinded.poolId = req.body.poolId;
          }
          if (req.body.listJoueurs != null) {
            teamFinded.listJoueurs = req.body.listJoueurs;
          }
          if (req.body.isActif != null) {
            teamFinded.isActif = req.body.isActif;
          }

          Pool.findById(teamFinded.poolId)
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
              // On enlève l'id de la team contenu dans la pool
              var newTeams = [];

              for(var i = 0; i < pool.teams.length;i++){
                var idTeamEnCours = pool.teams[i];
                if(idTeamEnCours != teamFinded.id){
                  newTeams.push(idTeamEnCours);
                }
              }
              pool.teams = newTeams;

              pool.save(function(err) {
                if (err)
                res.send(err);

                var promise = pool.save();
                mongoose.Promise = global.Promise;
                promise.then(function (team) {
                  console.log('Team successfully removed in the pool team list');
                  res.json({ message: 'Team successfully removed in the pool team list!', object: team });
                });
              }); 

            });
          
          // On remove la team
          Team.remove({
            _id: req.params.team_id
          }, function (err, teamRemoved) {
            if (err) {
              console.log('SERVER: Error : ' + err);
              res.send(err);
            }

            if (teamRemoved.result.n == 0) {
              res.json({ message: 'Team doesn\'t exist' })
            }
            else {
              console.log('Team successfully deleted in the table Team');
            }
          });
      });
  });

module.exports = router;
