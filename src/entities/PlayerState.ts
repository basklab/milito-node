import StateEnum from "@entities/StateEnum";

class PlayerState {
    table: Object
    hand: Array<number>
    state: StateEnum
    cardsToDiscard: number
    discarded_cards: Array<number>
    selected_card?: number
    selected_column?: number


    constructor(player_state: PlayerState) {
        this.table = player_state.table
        this.hand = player_state.hand
        this.state = player_state.state
        this.cardsToDiscard = player_state.cardsToDiscard
        this.discarded_cards = player_state.discarded_cards
        this.selected_card = player_state.selected_card
        this.selected_column = player_state.selected_column
    }

}

export default PlayerState
