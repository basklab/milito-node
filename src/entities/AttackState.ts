import {Card, UnitCard} from "@entities/Card";

export default class AttackState {
    main_unit: UnitCard
    support_unit?: UnitCard
    bonus_card: Card
    attack_column: number
    defence_column: number

    constructor(gameState: AttackState) {
        this.main_unit = gameState.main_unit
        this.support_unit = gameState?.support_unit
        this.bonus_card = gameState.bonus_card
        this.attack_column = gameState.attack_column
        this.defence_column = gameState.defence_column
    }

}
