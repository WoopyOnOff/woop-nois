var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SchemaPool = new Schema({  
  tournamentId : Schema.Types.ObjectId, //id_tournoi
  poolName : String, // lettre de la poule
  teams : Array, // Equipe
  scores : Array, // liste des scores
  pass : String
});

// define model =================
module.exports = mongoose.model('Pool', SchemaPool);

function _construct (req, pool) {

  pool.tournamentId = req.body.tournamentId;
  pool.poolName = req.body.poolName;
  pool.teams = req.body.teams;
  pool.scores = req.body.scores;
  pool.pass = req.body.pass;

  return pool;
}

module.exports.createInstance = _construct;
