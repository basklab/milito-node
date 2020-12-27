import initialSetup from "./config/initialSetup";
import * as util from "util";
import {draw_cards, end_this_turn, initiate_attack, nextState, place_a_unit} from "./config/gameActions";
import {InitiateAttackEvent, PlaceUnitEvent} from "./events/GameEvents";

let state = initialSetup()

state = nextState(state)

state = place_a_unit(state, new PlaceUnitEvent({
    kind: "PlaceUnitEvent",
    discarded_cards: [7, 27],
    selected_card : 10,
    selected_column : 3,
    selected_row : 1,
}))

state = place_a_unit(state, new PlaceUnitEvent({
    kind: "PlaceUnitEvent",
    discarded_cards: [],
    selected_card : 29,
    selected_column : 4,
    selected_row : 1,
}))

state = place_a_unit(state, new PlaceUnitEvent({
    kind: "PlaceUnitEvent",
    discarded_cards: [],
    selected_card : 23,
    selected_column : 4,
    selected_row : 2,
}))

state = draw_cards(state)

state = nextState(state)

state = place_a_unit(state, new PlaceUnitEvent({
    kind: "PlaceUnitEvent",
    discarded_cards: [],
    selected_card : 13,
    selected_column : 4,
    selected_row : 1,
}))

state = place_a_unit(state, new PlaceUnitEvent({
    kind: "PlaceUnitEvent",
    discarded_cards: [],
    selected_card : 17,
    selected_column : 4,
    selected_row : 2,
}))


state = initiate_attack(state, new InitiateAttackEvent({
    kind: "InitiateAttackEvent",
    bonus_card_id: undefined,
    selected_column : 4,
    selected_row : 2,
}))




console.log(util.inspect(state, {depth: 7, colors: true, maxArrayLength: 9}))
