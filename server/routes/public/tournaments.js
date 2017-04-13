const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.use(function(req, res, next) {
  console.log('Request on /api/tournaments');
  next();
})

// define model =================
var Tournament     = require('../../../src/app/models/tournament');

// routes ======================================================================

// api ---------------------------------------------------------------------
// get all tournamenets
router.route('/')
.get(function (req, res) {
  console.log('SERVER : Get all tournaments');
  // use mongoose to get all tournaments in the database
  Tournament.find(function(err, tournaments) {

    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err)
    res.send(err)

    res.json(tournaments); // return all tournaments in JSON format
  });
});

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
