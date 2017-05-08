var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SchemaTeam = new Schema({  
  poolId : Schema.Types.ObjectId, //id_poule
  listJoueurs : Array, // Tableaux avec les prénoms (surnom) des joueurs
  isActif : Boolean, // Equipe active ou non
});

// define model =================
module.exports = mongoose.model('Team', SchemaTeam);

function _construct (req, team) {

  team.poolId = req.body.poolId;
  team.listJoueurs = req.body.listJoueurs;
  team.isActif = req.body.isActif;

  return team;
}

module.exports.createInstance = _construct;
