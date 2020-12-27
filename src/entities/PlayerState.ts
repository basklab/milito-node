import StateEnum from "@entities/StateEnum";
import Deck from "@entities/Deck";
import Hand from "@entities/Hand";
import {UnitCard} from "@entities/Card";

export default class PlayerState {
    deck: Deck
    discard: Deck
    hand: Hand
    row_1: [UnitCard?, UnitCard?, UnitCard?, UnitCard?, UnitCard?]
    row_2: [UnitCard?, UnitCard?, UnitCard?, UnitCard?, UnitCard?]
    state: StateEnum

    constructor(gameState: PlayerState) {
        this.deck = gameState.deck
        this.discard = gameState.discard
        this.hand = gameState.hand
        this.row_1 = gameState.row_1
        this.row_2 = gameState.row_2
        this.state = gameState.state
    }

}
