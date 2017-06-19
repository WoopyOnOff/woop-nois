const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.use(function(req, res, next) {
  console.log('Request on /api/teams');
  res.header("Access-Control-Allow-Origin", "*");
  next();
})

// define model =================
var Team     = require('../../models/team');
var Pool     = require('../../models/pool');

// routes ======================================================================

// api ---------------------------------------------------------------------
// get all teams
router.route('/')
.get(function (req, res) {


  if ( Object.keys(req.query).length === 0) {
    console.log('SERVER : Get all teams');
    // use mongoose to get all teams in the database
    Team.find(function(err, teams) {

      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err)
      res.send(err)

      res.json(teams); // return all teams in JSON format
    });
  } else {
    console.log('Query : ' + JSON.stringify(req.query));
    if (req.query.idTournament != null)
    {

      // TODO
      var allTeamsByTournament = [];
      var nbTeamAdded = 0;
      var nbTotalTeam = 0

      Pool.find({"tournamentId" : req.query.idTournament}, function(err, pools) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
        res.send(err)

        for(var i = 0; i < pools.length;i++){
          var poolEnCours = pools[i];

          for(var j = 0; j < poolEnCours.teams.length;j++){
            var idTemaEnCours = poolEnCours.teams[j];

            Team.findById(idTemaEnCours, function (err, team) {
              if ( err ) {
                console.log('error while getting team with id ');
                res.send(err);
              }
              allTeamsByTournament.push(team);
              nbTeamAdded++;

              //console.log('nbTeamAdded = ' + nbTeamAdded);
              //console.log('nbTotalTeam = ' + nbTotalTeam);

              if (nbTeamAdded == nbTotalTeam){
                //console.log('-----------------------------------------allTeamsByTournament -> json---------------------------');
                res.json(allTeamsByTournament); // return all teams in JSON format
              }

            });

            nbTotalTeam++;

          }
        }
      });
    }
    else if (req.query.idPool != null)
    {

      Team.find({"poolId" : req.query.idPool}, function(err, teams) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
        res.send(err)

        res.json(teams); // return all teams in JSON format
      });
    } else {
      console.log('Unknown Query : ' + JSON.stringify(req.query));
      res.status(400).send('Bad request : Unknown Query : ' + JSON.stringify(req.query));
    }
  }
});


router.route('/:team_id')
.get(function(req, res) {
  console.log('SERVER : Get a team : ' + req.params.team_id);
  Team.findById(req.params.team_id, function (err, team) {
    if ( err ) {
      console.log('error while getting team with id ');
      res.send(err);
    }
    else {
      console.log('Get team : ' + JSON.stringify(team));
      res.json(team);
    }
  })
});

module.exports = router;
