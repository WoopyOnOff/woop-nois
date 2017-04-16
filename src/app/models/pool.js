var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SchemaPool = new Schema({  
  tournamentId : ObjectId, //id_tournoi
  pool : String, // lettre de la poule
  team : Array, // Equipe
  scores : Array, // liste des scores
  url : String
});

// define model =================
module.exports = mongoose.model('Pool', SchemaPool);

function _construct (req, pool) {

  pool.tournamentId = req.body.tournamentId;
  pool.pool = req.body.pool;
  pool.date = req.body.date;
  pool.team = req.body.team;
  pool.url = req.body.url;

  return pool;
}

module.exports.createInstance = _construct;
