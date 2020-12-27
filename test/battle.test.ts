import {LeaderCard, UnitCard} from "@entities/Card";
import {slingers} from "@config/decks/AlexandrianMacedonian";
import {expect} from "chai";
import SquadFormation, {AttackOutcomesEnum, resolve_battle} from "@config/resolveBattle";


describe('battle outcomes', function () {
    it('attacker wins', function () {
        const attack_main_unit = new UnitCard({
            attack_strength: 5, defence_strength: 2, speed: 1, unit_type: "someAttackUnit"
        })
        const attacker = new SquadFormation({
            bonus_card: undefined, main_unit: attack_main_unit, support_unit: new UnitCard(slingers)
        })
        const defence_main_unit = new UnitCard({
            attack_strength: 3, defence_strength: 5, speed: 2, unit_type: "someDefenceUnit"
        })
        const defender = new SquadFormation({
            bonus_card: undefined, main_unit: defence_main_unit, support_unit: undefined
        })
        expect(resolve_battle(attacker, defender)).to.equal(AttackOutcomesEnum.ATTACKER_WINS)
    })

    it('defender wins', function () {
        const attack_main_unit = new UnitCard({
            attack_strength: 5, defence_strength: 2, speed: 1, unit_type: "someAttackUnit"
        })
        const attacker = new SquadFormation({
            bonus_card: undefined, main_unit: attack_main_unit, support_unit: new UnitCard(slingers)
        })
        const defence_main_unit = new UnitCard({
            attack_strength: 3, defence_strength: 5, speed: 2, unit_type: "someDefenceUnit"
        })
        const defence_leader = new LeaderCard({combat_value: 3, place_unit_ability: 3})
        const defender = new SquadFormation({
            bonus_card: defence_leader, main_unit: defence_main_unit, support_unit: undefined
        })
        expect(resolve_battle(attacker, defender)).to.equal(AttackOutcomesEnum.DEFENDER_WINS)
    })

    it('tied', function () {
        const attack_main_unit = new UnitCard({
            attack_strength: 5, defence_strength: 2, speed: 1, unit_type: "someAttackUnit"
        })
        const attacker = new SquadFormation({
            bonus_card: undefined, main_unit: attack_main_unit, support_unit: undefined
        })
        const defence_main_unit = new UnitCard({
            attack_strength: 4, defence_strength: 4, speed: 2, unit_type: "someDefenceUnit"
        })
        const defender = new SquadFormation({
            bonus_card: undefined, main_unit: defence_main_unit, support_unit: defence_main_unit
        })
        expect(resolve_battle(attacker, defender)).to.equal(AttackOutcomesEnum.TIED)
    })

})
