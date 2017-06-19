export class Team {
  _id : string; // Id de la team
  isActif : Boolean; // Equipe active ou non
  poolId : string; //L'id de la pool à laquelle est rattaché la team
  listJoueurs : string[]; // Tableaux avec les prénoms (surnom) des joueurs

  constructor() {
    this.listJoueurs = [];
  }
}
