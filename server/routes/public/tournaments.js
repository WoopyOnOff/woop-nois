const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.use(function(req, res, next) {
  console.log('Request on /api/tournaments');
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
})

// define model =================
var Tournament     = require('../../models/tournament');

// routes ======================================================================

// api ---------------------------------------------------------------------
// get all tournamenets
router.route('/')
.get(function (req, res) {
  console.log('SERVER : Get all tournaments');

  if ( Object.keys(req.query).length === 0) {
    // use mongoose to get all tournaments in the database
    Tournament.find(function(err, tournaments) {

      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err)
      res.send(err)

      res.json(tournaments); // return all tournaments in JSON format
    });
  }
  else {
    console.log('Query : ' + JSON.stringify(req.query));
    if (req.query.isActif != null)
    {
      Tournament.find({"isActif" : req.query.isActif}, function(err, tournaments) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
        res.send(err)

        res.json(tournaments); // return all tournaments in JSON format
      });
    }
    else {
      console.log('Unknown Query : ' + JSON.stringify(req.query));
      res.status(400).send('Bad request : Unknown Query : ' + JSON.stringify(req.query));
    }

  }
});

// router.route('\?isActif=:value')
// .get(function(req, res) {
//   console.log('SERVER : Get all tournaments where isActive=' + req.params.value);
//   Tournament.find({"isActif" : req.params.value}, function (err, tournaments) {
//     if ( err ) {
//       console.log('error while getting tournaments where isActive=' + req.params.value);
//       res.send(err);
//     }
//     res.json(tournaments);
//   })
// });

router.route('/:tournament_id')
.get(function(req, res) {
  console.log('SERVER : Get a tournament');
  Tournament.findById(req.params.tournament_id, function (err, tournament) {
    if ( err ) {
      console.log('error while getting tournament with id ');
      res.send(err);
    }
    res.json(tournament);
  })
});

module.exports = router;
