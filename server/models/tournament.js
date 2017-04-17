var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SchemaTournament = new Schema({
  label : String, // Le nom du tournoi
  //TODO Transformer en objet
  gameType : String, // Le type de tournoi
  date : Date, // La date du tournoi
  nbTeamsPerPool : Number, // Le nombre d'équipes par poule
  nbPlayersPerTeam : Number, // Le nombre de joueur par équipe
  isActif : Boolean, // Le tournoi est-il actif ?
  isPublished : Boolean, // ??
  createdDate : { type: Date, default: Date.now },
  modifiedDate : Date
});

// define model =================
module.exports = mongoose.model('Tournament', SchemaTournament);

function _construct (req, tournament) {

  tournament.label = req.body.label;
  tournament.gameType = req.body.gameType;
  tournament.date = req.body.date;
  tournament.nbTeamsPerPool = req.body.nbTeamsPerPool;
  tournament.nbPlayersPerTeam = req.body.nbPlayersPerTeam;
  tournament.isActif = req.body.isActif;
  tournament.isPublished = req.body.isPublished;
  tournament.createdDate = req.body.createdDate;
  tournament.modifiedDate = req.body.modifiedDate;

  return tournament;
}

module.exports.createInstance = _construct;
