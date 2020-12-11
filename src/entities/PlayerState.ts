import StateEnum from "@entities/StateEnum";

export default class PlayerState {
    deck: Array<number>
    discard: Array<number>
    hand: Array<number>
    row_1: [number?, number?, number?, number?, number?]
    row_2: [number?, number?, number?, number?, number?]
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
