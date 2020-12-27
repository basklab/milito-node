import {Card, ILeaderCard, IUnitCard, LeaderCard, UnitCard} from "@entities/Card";
import Deck from "@entities/Deck";

export default class AncientBritishDeck extends Deck {

    public static make() {
        const leader_cards: Card[] = ab_leaders_specs.map((value, index) => {
            return new LeaderCard(value)
        })
        const all_cards = leader_cards.concat(this.make_unit_cards())
        all_cards.forEach((value, index) => {
            value.id = index
        })
        return new AncientBritishDeck({cards: this.shuffle(all_cards, 29)})
    }

    private static make_unit_cards() {
        const ab_all_units = [
            Deck.multiply(6, warband_medium_infantry),
            Deck.multiply(6, slingers),
            Deck.multiply(6, chariots),
            Deck.multiply(4, light_cavalry),
        ].flat()
        const unit_cards: Card[] = ab_all_units.map((value, index) => {
            return new UnitCard(value)
        })
        return unit_cards;
    }
}

const ab_leaders_specs: ILeaderCard[] = [
    {
        combat_value: 3,
        place_unit_ability: 3,
    },
    {
        combat_value: 2,
        place_unit_ability: 2,
    },
    {
        combat_value: 2,
        place_unit_ability: 1,
        special_effect: "if win combat",
    },
    {
        combat_value: 1,
        place_unit_ability: 2,
        special_effect: "+2 if played in Wood or Rough column.",
    },
    {
        combat_value: 1,
        place_unit_ability: 1,
        special_effect: "+2 if played with 2x Chariots",
    },
    {
        combat_value: 1,
        place_unit_ability: 1,
        special_effect: "+2 if played with 2x Slingers",
    },
    {
        combat_value: 1,
        place_unit_ability: 1,
        special_effect: "+2 if played with 2x Warband Medium Infantry",
    },
    {
        combat_value: -1,
        place_unit_ability: 1,
    },
]

const warband_medium_infantry: IUnitCard = {
    unit_type: "Warband_Med_Inf",
    speed: 2,
    attack_strength: 4,
    defence_strength: 2,
}

const slingers: IUnitCard = {
    unit_type: "Slingers",
    speed: 3,
    attack_strength: 1,
    defence_strength: 1,
    combine_ability: true,
}

const chariots: IUnitCard = {
    unit_type: "Chariots",
    speed: 3,
    attack_strength: 4,
    defence_strength: 2,
}

const light_cavalry: IUnitCard = {
    unit_type: "Light_Cavalry",
    speed: 5,
    attack_strength: 1,
    defence_strength: 1,
}
