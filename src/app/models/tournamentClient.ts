export class Tournament {
  label : string; // Le nom du tournoi
  //TODO Transformer en objet
  gameType : string; // Le type de tournoi
  date : Date; // La date du tournoi
  nbTeamsPerPool : number; // Le nombre d'équipes par poule
  nbPlayersPerTeam : number; // Le nombre de joueur par équipe
  isActif : boolean; // Le tournoi est-il actif ?
  isPublished : boolean; // ??
  createdDate : Date;
  modifiedDate : Date;
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
