import {Card, UnitCard} from "@entities/Card";
import Deck from "@entities/Deck";

export default class CarthaginianDeck extends Deck {

    public static make() {
        const tmp = [
            chariots,
            chariots,
            chariots,
            chariots,
            chariots,
            chariots,
            elephants,
            chariots,
        ]
        const cards = tmp.map((value, index) => {
            value.id = index
            return value
        })
        return new CarthaginianDeck({cards: cards})
    }
}

const chariots: UnitCard = {
    unit_type: "chariots",
    speed: 1,
    attack_strength: 2,
    defence_strength: 1,
}

const elephants: UnitCard = {
    unit_type: "elephants",
    speed: 1,
    attack_strength: 2,
    defence_strength: 1,
}
