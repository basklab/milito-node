import StateEnum from "@entities/StateEnum";
import GameState from "@entities/GameState";
import {ChooseDefenderEvent, InitiateAttackEvent, PlaceUnitEvent} from "../events/GameEvents";
import {Card, UnitCard} from "@entities/Card";
import {takeCard} from "./initialSetup";
import AttackState from "@entities/AttackState";
import assert from "assert";


export default class SquadFormation {
    main_unit: UnitCard
    support_unit?: UnitCard
    bonus_card?: Card

    constructor(gameState: SquadFormation) {
        this.main_unit = gameState.main_unit
        this.support_unit = gameState?.support_unit
        this.bonus_card = gameState?.bonus_card
    }

}


enum AttackOutcomesEnum {
    DEFENDER_WITHDRAWS = "DEFENDER_WITHDRAWS",
    DEFENDER_WINS = "DEFENDER_WINS",
    TIED = "TIED",
    ATTACKER_WINS = "ATTACKER_WINS",
}

export function resolve_battle(attacker: SquadFormation, defender: SquadFormation): AttackOutcomesEnum {

    return AttackOutcomesEnum.TIED
}

