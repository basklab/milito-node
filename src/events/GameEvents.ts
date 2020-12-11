import assert from "assert";

export class PlayACardEvent {
    kind: "PlayACardEvent"
    discarded_cards: Array<number>
    selected_card?: number
    selected_column?: number


    constructor(event: PlayACardEvent) {
        assert(event.kind == "PlayACardEvent")
        this.kind = event.kind
        this.discarded_cards = event.discarded_cards
        this.selected_card = event.selected_card
        this.selected_column = event.selected_column
    }

}

// echo '{"kind": "PlayACardEvent", "discarded_cards": [1,2]}' | http -v POST "localhost:3000/api/game/event"

export class AnotherEvent {
    selected_column?: number


    constructor(event: AnotherEvent) {
        this.selected_column = event.selected_column
    }

}
