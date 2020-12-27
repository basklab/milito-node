import assert from "assert";

export class PlaceUnitEvent {
    kind: "PlaceUnitEvent"
    discarded_cards: Array<number>
    selected_card: number
    selected_column: number
    selected_row: number


    constructor(event: PlaceUnitEvent) {
        assert(event.kind == "PlaceUnitEvent")
        this.kind = event.kind
        this.discarded_cards = event.discarded_cards
        this.selected_card = event.selected_card
        this.selected_column = event.selected_column
        this.selected_row = event.selected_row
    }

}

// echo '{"kind": "PlaceUnitEvent", "discarded_cards": [1,2]}' | http -v POST "localhost:3000/api/game/event"

export class InitiateAttackEvent {
    kind: "InitiateAttackEvent"
    bonus_card_id?: number
    selected_column: number
    selected_row: number


    constructor(event: InitiateAttackEvent) {
        assert(event.kind == "InitiateAttackEvent")
        this.kind = event.kind
        this.bonus_card_id = event.bonus_card_id
        this.selected_column = event.selected_column
        this.selected_row = event.selected_row
    }

}

export class WithdrawUnitsEvent {
    kind: "WithdrawUnitsEvent"

    constructor(event: WithdrawUnitsEvent) {
        assert(event.kind == "WithdrawUnitsEvent")
        this.kind = event.kind
    }

}

export class ChooseDefenderEvent {
    kind: "ChooseDefenderEvent"
    bonus_card_id?: number
    is_bonus_card_used: boolean
    selected_row: number


    constructor(event: ChooseDefenderEvent) {
        assert(event.kind == "ChooseDefenderEvent")
        this.kind = event.kind
        this.bonus_card_id = event.bonus_card_id
        this.is_bonus_card_used = event.is_bonus_card_used
        this.selected_row = event.selected_row
    }

}


export class AnotherEvent {
    selected_column?: number


    constructor(event: AnotherEvent) {
        this.selected_column = event.selected_column
    }

}
