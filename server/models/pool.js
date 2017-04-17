var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SchemaPool = new Schema({  
  tournamentId : Schema.Types.ObjectId, //id_tournoi
  poolName : String, // lettre de la poule
  teams : Array, // Equipe
  scores : Array, // liste des scores
  url : String
});

// define model =================
module.exports = mongoose.model('Pool', SchemaPool);

function _construct (req, pool) {

  pool.tournamentId = req.body.tournamentId;
  pool.poolName = req.body.poolName;
  pool.date = req.body.date;
  pool.teams = req.body.teams;
  pool.scores = req.body.scores;
  pool.url = req.body.url;

  return pool;
}

module.exports.createInstance = _construct;
