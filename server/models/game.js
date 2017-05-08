var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SchemaGame = new Schema({
  gameId : Schema.Types.ObjectId, //id du match
  poolId : Schema.Types.ObjectId, //id de la poule
  team1Id : Schema.Types.ObjectId, //id de l'equipe 1
  team2Id : Schema.Types.ObjectId, //id de l'equipe 2
  scoreTeam1 : Number
  scoreTeam2 : Number
  timestamp : Date
});

// define model =================
module.exports = mongoose.model('Game', SchemaGame);
