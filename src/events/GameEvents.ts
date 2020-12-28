import assert from "assert";

export class IPlaceUnitEvent {
    discarded_cards: Array<number>
    selected_card: number
    selected_column: number
    selected_row: number


    constructor(event: IPlaceUnitEvent) {
        this.discarded_cards = event.discarded_cards
        this.selected_card = event.selected_card
        this.selected_column = event.selected_column
        this.selected_row = event.selected_row
    }

}

export class PlaceUnitEvent extends IPlaceUnitEvent {
    kind: "PlaceUnitEvent" = "PlaceUnitEvent"
}

// echo '{"kind": "PlaceUnitEvent", "discarded_cards": [1,2]}' | http -v POST "localhost:3000/api/game/event"

export class IInitiateAttackEvent {
    bonus_card_id?: number
    selected_column: number
    selected_row: number


    constructor(event: IInitiateAttackEvent) {
        this.bonus_card_id = event.bonus_card_id
        this.selected_column = event.selected_column
        this.selected_row = event.selected_row
    }

}

export class InitiateAttackEvent extends IInitiateAttackEvent {
    kind: "InitiateAttackEvent" = "InitiateAttackEvent"
}

export class WithdrawUnitsEvent {
    kind: "WithdrawUnitsEvent"

    constructor(event: WithdrawUnitsEvent) {
        assert(event.kind == "WithdrawUnitsEvent")
        this.kind = event.kind
    }

}


class IChooseDefenderEvent {
    bonus_card_id?: number
    is_bonus_card_used: boolean
    selected_row: number

    constructor(event: IChooseDefenderEvent) {
        this.bonus_card_id = event.bonus_card_id
        this.is_bonus_card_used = event.is_bonus_card_used
        this.selected_row = event.selected_row
    }

}

export class ChooseDefenderEvent extends IChooseDefenderEvent {
    kind: "ChooseDefenderEvent" = "ChooseDefenderEvent"
}


export class DefenderWithdrawsEvent {
    kind: "DefenderWithdrawsEvent" = "DefenderWithdrawsEvent"
}


export class AnotherEvent {
    selected_column?: number


    constructor(event: AnotherEvent) {
        this.selected_column = event.selected_column
    }

}
