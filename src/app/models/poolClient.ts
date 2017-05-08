export class Pool {
  _id : string; // Id de la poule
  tournamentId : string; //id_tournoi
  poolName : string; // lettre de la poule
  teams : string[]; // Equipe
  scores : string[]; // liste des scores
  pass : string; // Passe

  constructor() {
    this.teams = [];
    this.scores = [];
  }
}
