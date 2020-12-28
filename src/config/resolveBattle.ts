import {Card, UnitCard} from "@entities/Card";


export default class SquadFormation {
    main_unit: UnitCard
    support_unit?: UnitCard
    bonus_card?: Card

    constructor(that: SquadFormation) {
        this.main_unit = that.main_unit
        this.support_unit = that?.support_unit
        this.bonus_card = that?.bonus_card
    }

}


export enum AttackOutcomesEnum {
    DEFENDER_WINS = "DEFENDER_WINS",
    TIED = "TIED",
    ATTACKER_WINS = "ATTACKER_WINS",
}

function get_attack_strength(attack_squad: SquadFormation) {
    let attack = attack_squad.main_unit.attack_strength
    if (attack_squad.support_unit !== undefined) {
        attack += 1
    }
    if (attack_squad.bonus_card !== undefined && "combat_value" in attack_squad.bonus_card) {
        attack += attack_squad.bonus_card.combat_value
    }
    return attack
}

function get_defence_strength(defence_squad: SquadFormation) {
    let attack = defence_squad.main_unit.defence_strength
    if (defence_squad.support_unit !== undefined) {
        attack += 1
    }
    if (defence_squad.bonus_card !== undefined && "combat_value" in defence_squad.bonus_card) {
        attack += defence_squad.bonus_card.combat_value
    }
    return attack
}

export function resolve_battle(attack_squad: SquadFormation, defence_squad: SquadFormation): AttackOutcomesEnum {
    const attackStrength = get_attack_strength(attack_squad)
    const defenceStrength = get_defence_strength(defence_squad)
    if (attackStrength > defenceStrength) {
        return AttackOutcomesEnum.ATTACKER_WINS
    } else if (attackStrength < defenceStrength) {
        return AttackOutcomesEnum.DEFENDER_WINS
    } else {
        return AttackOutcomesEnum.TIED
    }
}
