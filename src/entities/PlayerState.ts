import StateEnum from "@entities/StateEnum";
import Deck from "@entities/Deck";
import Hand from "@entities/Hand";
import {UnitCard} from "@entities/Card";

export default class PlayerState {
    deck: Deck
    dead_pile: Deck
    discard_pile: Deck
    hand: Hand
    player_id: number
    row_1: [UnitCard?, UnitCard?, UnitCard?, UnitCard?, UnitCard?]
    row_2: [UnitCard?, UnitCard?, UnitCard?, UnitCard?, UnitCard?]
    state: StateEnum

    constructor(that: PlayerState) {
        this.deck = that.deck
        this.dead_pile = that.dead_pile
        this.discard_pile = that.discard_pile
        this.hand = that.hand
        this.player_id = that.player_id
        this.row_1 = that.row_1
        this.row_2 = that.row_2
        this.state = that.state
    }

}
