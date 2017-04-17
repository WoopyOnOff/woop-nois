const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const jwt    = require('jsonwebtoken');

router.use(function(req, res, next) {

// check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, secretIdToken, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        console.log('Request on /api/pools');
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
});

// define model =================
var Pool     = require('../../models/pool');

// routes ======================================================================

// api ---------------------------------------------------------------------
// get all pools



// TODO pools?idTournament=	GET	#idtournoi
// TODO
router.route('/')
    // Ajout d'une poule
    .post(function (req, res) {


        console.log('SERVER : Post a pool');
        var pool = new Pool();

        pool = Pool.createInstance(req, pool);

        var promise = pool.save();

        mongoose.Promise = global.Promise;

        promise.then( function (pool) {
            res.json({ message: 'Pool created!' , object : pool});
        });
    });

router.route('/:tournament_id')
    // Update d'une poule
  .put(function(req, res) {
    console.log('SERVER : Update a tournament');
    Tournament.findById(req.params.tournament_id)
    .then( function (tournament) {

      //TODO Complete
      if (req.body.label != null) {
        tournament.label = req.body.label;
      }
      if (req.body.date != null) {
        tournament.date = req.body.date;
      }
      // etc ...

      // save the tournament
      tournament.save(function(err) {
        if (err)
        res.send(err);

        res.json({ message: 'Tournament updated' });
      });

    });

  })
    // Delete d'une poule
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
