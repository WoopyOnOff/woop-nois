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
        console.log('Request on /api/pools');
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
var Pool = require('../../models/pool');

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

    promise.then(function (pool) {
      res.json({ message: 'Pool created!', object: pool });
    });
  });

router.route('/:pool_id/score')
  .put(function (req, res) {
    if (Object.keys(req.query).length === 0) {

    } else {
      console.log('SERVER : Update a pool (Scores)');
      console.log('Query : ' + JSON.stringify(req.query));
      console.log('req.params.pool_id = ' + JSON.stringify(req.params.pool_id));
      Pool.findById(req.params.pool_id)
        .then(function (pool) {

          console.log('pool = ' + JSON.stringify(pool));
          if (req.query.action != null) {
            //TODO Complete
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
            if (req.body.url != null) {
              pool.url = req.body.url;
            }



            if (req.query.action == "add") {
              console.log('SERVER : Add a score');
              // Récup ce qu'il y a dans le body pour l'ajouter
              console.log('toAdd = ' + JSON.stringify(req.body));
              console.log('pool = ' + JSON.stringify(pool));

              var toAdd = req.body;

              pool.scores.push(toAdd);

            } else {
              console.log('SERVER : Delete a score');
              // Récup ce qu'il y a dans le body  pour savoir pour quel couple d'équipe le score doit être supprimé

            }


            // save the pool
            pool.save(function (err) {
              if (err)
                res.send(err);

              res.json({ message: 'Pool Scores updated' });
            });

          } else { }

        });

    }
  });

router.route('/:pool_id')
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
