export class Tournament {
  _id : string;
  label : string; // Le nom du tournoi
  gameType : string; // Le type de tournoi
  date : Date; // La date du tournoi
  nbTeamsPerPool : number; // Le nombre d'équipes par poule
  nbPlayersPerTeam : number; // Le nombre de joueur par équipe
  isActif : boolean; // Le tournoi est-il actif ?
  isPublished : boolean; // ??
  createdDate : Date;
  modifiedDate : Date;

  constructor() {
    this.nbTeamsPerPool = 0;
    this.nbPlayersPerTeam = 0;
    this.isActif = false;
    this.isPublished = false;
  }
}

export class GameType {
  nom : string;
  scoreMax : number;
}

export let GAMELIST : Array<GameType> = [
  {
    nom: "Molkky",
    scoreMax: 50
  },
  {
    nom: "Cornhole",
    scoreMax: 21
  },
  {
    nom: "Beach-Volley",
    scoreMax: 0
  }
];
