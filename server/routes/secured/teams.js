const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.use(function (req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, secretIdToken, function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        console.log('Request on /api/teams');
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
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
var Team = require('../../models/team');

// routes ======================================================================

// api ---------------------------------------------------------------------


router.route('/')
  // Ajout d'une poule
  .post(function (req, res) {


    console.log('SERVER : Post a Team');
    var team = new Team();

    team = Team.createInstance(req, team);

    var promise = team.save();

    mongoose.Promise = global.Promise;

    promise.then(function (team) {
      res.json({ message: 'Team created!', object: team });
    });
  });

router.route('/:team_id')
  
  
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
