import SquadFormation from "@config/resolveBattle";

export default class AttackState {
    squad_formation: SquadFormation
    attack_column: number
    defence_column: number

    constructor(that: AttackState) {
        this.squad_formation = that.squad_formation
        this.attack_column = that.attack_column
        this.defence_column = that.defence_column
    }

}
