import StateEnum from "@entities/StateEnum";
import GameState from "@entities/GameState";
import {ChooseDefenderEvent, InitiateAttackEvent, PlaceUnitEvent} from "../events/GameEvents";
import {UnitCard} from "@entities/Card";
import {takeCard} from "./initialSetup";
import AttackState from "@entities/AttackState";
import assert from "assert";


export function check_victory(state: GameState): GameState {
    assert(state.phase === StateEnum.PHASE_1_VICTORY_CHECK)
    let count1 = 0
    let count2 = 0
    for (let x of state.neutral) {
        if (x === 1) {
            count1 += 1
        } else if (x === 2) {
            count2 += 1
        }
    }
    if (count1 >= 3) {
        console.log("PLAYER1 WON")
        state.phase = StateEnum.GAME_OVER
    } else if (count2 >= 3) {
        console.log("PLAYER2 WON")
        state.phase = StateEnum.GAME_OVER
    } else {
        state.phase = StateEnum.PHASE_2_ADVANCE
    }
    return state
}


export function advance_units(state: GameState): GameState {
    assert(state.phase === StateEnum.PHASE_2_ADVANCE)
    // TODO update unopposed territories
    state.phase = StateEnum.PHASE_3_FLANK_ATTACKS
    return state
}

export function flank_attacks(state: GameState): GameState {
    assert(state.phase === StateEnum.PHASE_3_FLANK_ATTACKS)
    // TODO figure it out
    state.phase = StateEnum.PHASE_4_PLAYER_ACTIONS
    return state
}

export function nextState(state: GameState): GameState {
    console.log("STATE = " + state.phase)
    switch (state.phase) {
        case StateEnum.PHASE_1_VICTORY_CHECK:
            state = check_victory(state)
            return nextState(state)
        case StateEnum.PHASE_2_ADVANCE:
            let tmp = advance_units(state)
            return nextState(tmp)
        case StateEnum.PHASE_3_FLANK_ATTACKS:
            return flank_attacks(state)
        case StateEnum.PHASE_5_DRAW_CARDS:
            state = end_this_turn(state)
            return nextState(state)
        default:
            throw new Error("unknown state")
    }
}

export function place_a_unit(state: GameState, action: PlaceUnitEvent): GameState {
    console.log("ACTION: " + action.kind)
    let player = state.current_player
    let deploy_value = 0
    action.discarded_cards.forEach((discard_id) => {
        const cardById = player.hand.take_card_by_id(discard_id)
        if ("place_unit_ability" in cardById) {
            deploy_value += cardById.place_unit_ability
        } else {
            deploy_value += 1
        }
        player.discard.push(cardById)
    })
    let card_in_hand = <UnitCard>player.hand.take_card_by_id(action.selected_card)
    assert("unit_type" in card_in_hand)

    if (action.selected_column === 0 || action.selected_column === 4) {
        const deploy_penalty = (card_in_hand.deploy_penalty ?? 0) + (card_in_hand.flank_penalty ?? 0)
        assert(deploy_value >= deploy_penalty)
    }
    // todo check another unit must be the same type or must have combine ability
    let current_row
    if (action.selected_row === 1) {
        current_row = player.row_1
    } else {
        current_row = player.row_2
    }
    const tmp = current_row[action.selected_column]
    if (tmp !== undefined) {
        player.discard.push(tmp)
    }
    current_row[action.selected_column] = card_in_hand
    return state
}


export function initiate_attack(state: GameState, action: InitiateAttackEvent): GameState {
    console.log("ACTION: " + action.kind)
    let main_card
    let support_card
    if (action.selected_row === 1) {
        main_card = state.current_player.row_1[action.selected_column]
        support_card = state.current_player.row_2[action.selected_column]
    } else {
        main_card = state.current_player.row_2[action.selected_column]
        support_card = state.current_player.row_1[action.selected_column]
    }
    assert(main_card !== undefined)
    let bonus_card
    if (action.bonus_card_id === undefined) {
        bonus_card = state.current_player.deck.pop()
    } else {
        bonus_card = state.current_player.hand.take_card_by_id(action.bonus_card_id)
    }
    state.attack_state = new AttackState({
        bonus_card: bonus_card,
        main_unit: main_card,
        support_unit: support_card,
        attack_column: action.selected_column,
        defence_column: action.selected_column,
    })
    state.phase = StateEnum.PHASE_4_DEFENDER_ACTIONS
    return state
}


export function choose_defender(state: GameState, action: ChooseDefenderEvent): GameState {
    console.log("ACTION: " + action.kind)
    assert(state.attack_state !== undefined)
    const column = state.attack_state.defence_column
    let main_card
    let support_card
    if (action.selected_row === 1) {
        main_card = state.current_player.row_1[column]
        support_card = state.current_player.row_2[column]
    } else {
        main_card = state.current_player.row_2[column]
        support_card = state.current_player.row_1[column]
    }
    let bonus_card
    if (!action.is_bonus_card_used) {
        bonus_card = undefined
    } else if (action.bonus_card_id === undefined) {
        bonus_card = state.current_player.deck.pop()
    } else {
        bonus_card = state.current_player.hand.take_card_by_id(action.bonus_card_id)
    }

    return state
}

export function draw_cards(state: GameState): GameState {
    assert(state.phase === StateEnum.PHASE_4_PLAYER_ACTIONS)
    state.phase = StateEnum.PHASE_5_DRAW_CARDS
    for (let i = 0; i < 3; i++) {
        state.current_player = takeCard(state.current_player)
    }
    return state
}

export function end_this_turn(state: GameState): GameState {
    const tmp = state.current_player
    state.current_player = state.another_player
    state.another_player = tmp
    state.phase = StateEnum.PHASE_1_VICTORY_CHECK
    return state
}


