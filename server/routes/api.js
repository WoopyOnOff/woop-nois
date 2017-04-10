const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


router.use(function(req, res, next) {
  console.log('Something is happening : ' +req);
  next();
})

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// define model =================
var Tournament     = require('../../src/app/models/tournament');

// routes ======================================================================

// api ---------------------------------------------------------------------
// get all tournamenets
router.route('/tournaments')
.get(function (req, res) {
  console.log('SERVER : Get all tournaments');
  // use mongoose to get all tournaments in the database
  Tournament.find(function(err, tournaments) {

    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err)
    res.send(err)

    res.json(tournaments); // return all tournaments in JSON format
  });
})

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

router.route('/tournaments/:tournament_id')
.get(function(req, res) {
  console.log('SERVER : Get a tournament');
  Tournament.findById(req.params.tournament_id, function (err, tournament) {
    if ( err ) {
      console.log('error while getting tournament with id ');
      res.send(err);
    }
    res.json(tournament);
  })
})

.put(function(req, res) {
  console.log('SERVER : Update a tournament');
  Tournament.findById(req.params.tournament_id)
  .then( function (tournament) {

    tournament.label = req.body.label;

    // save the bear
    tournament.save(function(err) {
      if (err)
      res.send(err);

      res.json({ message: 'Tournament updated' });
    });

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

    if ( tournament.result.n == 0) {
      res.json({ message : 'Tournament doesn\'t exist'})
    }
    else {
      res.json({ message: 'Tournament successfully deleted' });
    }

  });
});

module.exports = router;
