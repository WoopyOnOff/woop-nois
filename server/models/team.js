var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SchemaTeam = new Schema({  
  number : Number, // Numéro de la team dans la poule
  players : Array, // Tableaux avec les prénoms (surnom) des joueurs
  isActif : Boolean, // Equipe active ou non
});

// define model =================
module.exports = mongoose.model('Team', SchemaTeam);

function _construct (req, team) {

  team.number = req.body.number;
  team.players = req.body.players;
  team.isActif = req.body.isActif;

  return team;
}

module.exports.createInstance = _construct;
