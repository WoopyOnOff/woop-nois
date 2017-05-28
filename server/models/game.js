var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SchemaGame = new Schema({
  //gameId : Schema.Types.ObjectId, //id du match CPA:inutile car genere par mongo
  poolId : Schema.Types.ObjectId, //id de la poule
  team1Id : Schema.Types.ObjectId, //id de l'equipe 1
  team2Id : Schema.Types.ObjectId, //id de l'equipe 2
  scoreTeam1 : Number,
  scoreTeam2 : Number,
  timestamp : Date
});

// define model =================
module.exports = mongoose.model('Game', SchemaGame);

function _construct (req, game) {

  game.poolId = req.body.poolId;
  game.team1Id = req.body.team1Id;
  game.team2Id = req.body.team2Id;
  game.scoreTeam1 = req.body.scoreTeam1;
  game.scoreTeam2 = req.body.scoreTeam2;
  game.timestamp = req.body.timestamp;

  return game;
}

module.exports.createInstance = _construct;