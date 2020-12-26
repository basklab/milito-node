import {Card, ILeaderCard, IUnitCard, LeaderCard, UnitCard} from "@entities/Card";
import Deck from "@entities/Deck";

export default class AlexandrianMacedonianDeck extends Deck {

    public static make() {
        const leader_cards: Card[] = am_leaders_specs.map((value, index) => {
            return new LeaderCard(value)
        })
        const all_cards = leader_cards.concat(this.make_unit_cards())
        all_cards.forEach((value, index) => {
            value.id = index
        })
        return new AlexandrianMacedonianDeck({cards: this.shuffle(all_cards, 42)})
    }

    private static make_unit_cards() {
        const am_all_units_specs = [
            Deck.multiply(7, pikes),
            Deck.multiply(4, spears),
            Deck.multiply(3, light_infantry),
            Deck.multiply(2, slingers),
            Deck.multiply(2, companions),
            Deck.multiply(2, heavy_cavalry),
            Deck.multiply(2, light_cavalry),
        ].flat()
        const unit_cards: Card[] = am_all_units_specs.map((value, index) => {
            return new UnitCard(value)
        })
        return unit_cards;
    }
}

const am_leaders_specs: ILeaderCard[] = [
    {
        combat_value: 3,
        place_unit_ability: 3,
    },
    {
        combat_value: 2,
        place_unit_ability: 3,
    },
    {
        combat_value: 2,
        place_unit_ability: 2,
        special_effect: "if combat is tied...",
    },
    {
        combat_value: 2,
        place_unit_ability: 2,
        special_effect: "+1 if attacking",
    },
    {
        combat_value: 2,
        place_unit_ability: 2,
    },
    {
        combat_value: 1,
        place_unit_ability: 2,
        special_effect: "+2 if played with Pikes",
    },
    {
        combat_value: 1,
        place_unit_ability: 2,
        special_effect: "+2 if played with Compamnions",
    },
    {
        combat_value: -1,
        place_unit_ability: 1,
    },
]

const pikes: IUnitCard = {
    unit_type: "Pikes",
    speed: 0,
    attack_strength: 5,
    defence_strength: 5,
    deploy_penalty: 2,
    flank_penalty: 1,
}

const spears: IUnitCard = {
    unit_type: "Spears",
    speed: 0,
    attack_strength: 4,
    defence_strength: 5,
    deploy_penalty: 1,
    flank_penalty: 1,
}

const light_infantry: IUnitCard = {
    unit_type: "Light_Infantry",
    speed: 3,
    attack_strength: 2,
    defence_strength: 2,
    combine_ability: true,
}

const slingers: IUnitCard = {
    unit_type: "Slingers",
    speed: 3,
    attack_strength: 1,
    defence_strength: 1,
    combine_ability: true,
}

const companions: IUnitCard = {
    unit_type: "Companions",
    speed: 3,
    attack_strength: 4,
    defence_strength: 2,
}

const heavy_cavalry: IUnitCard = {
    unit_type: "Heavy_Cavalry",
    speed: 3,
    attack_strength: 4,
    defence_strength: 3,
    deploy_penalty: 1,
    flank_penalty: 1,
}

const light_cavalry: IUnitCard = {
    unit_type: "Light_Cavalry",
    speed: 5,
    attack_strength: 1,
    defence_strength: 1,
}
