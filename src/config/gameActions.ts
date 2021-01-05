import PhasesEnum from "../milito-shared/enums/PhasesEnum";
import GameState from "@entities/GameState";
import {UnitCard} from "@entities/Card";
import {takeCard} from "./initialSetup";
import AttackState from "@entities/AttackState";
import assert from "assert";
import SquadFormation, {AttackOutcomesEnum, resolve_battle} from "@config/resolveBattle";
import PlayerState from "@entities/PlayerState";
import PlaceUnitEvent from "../milito-shared/events/PlaceUnitEvent";
import InitiateAttackEvent from "../milito-shared/events/InitiateAttackEvent";
import ChooseDefenderEvent from "../milito-shared/events/ChooseDefenderEvent";
import DefenderWithdrawsEvent from "../milito-shared/events/DefenderWithdrawsEvent";


export function check_victory(state: GameState): GameState {
    assert(state.phase === PhasesEnum.PHASE_1_VICTORY_CHECK)
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
        state.phase = PhasesEnum.GAME_OVER
    } else if (count2 >= 3) {
        console.log("PLAYER2 WON")
        state.phase = PhasesEnum.GAME_OVER
    } else {
        state.phase = PhasesEnum.PHASE_2_ADVANCE
    }
    return state
}


export function advance_units(state: GameState): GameState {
    assert(state.phase === PhasesEnum.PHASE_2_ADVANCE)
    // TODO update unopposed territories
    state.phase = PhasesEnum.PHASE_3_FLANK_ATTACKS
    return state
}

export function flank_attacks(state: GameState): GameState {
    assert(state.phase === PhasesEnum.PHASE_3_FLANK_ATTACKS)
    // TODO figure it out
    state.phase = PhasesEnum.PHASE_4_PLAYER_ACTIONS
    return state
}

export function nextState(state: GameState): GameState {
    console.log("STATE = " + state.phase)
    switch (state.phase) {
        case PhasesEnum.PHASE_1_VICTORY_CHECK:
            state = check_victory(state)
            return nextState(state)
        case PhasesEnum.PHASE_2_ADVANCE:
            let tmp = advance_units(state)
            return nextState(tmp)
        case PhasesEnum.PHASE_3_FLANK_ATTACKS:
            return flank_attacks(state)
        case PhasesEnum.PHASE_5_DRAW_CARDS:
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
        player.discard_pile.push(cardById)
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
        player.discard_pile.push(tmp)
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
    state.battle_state = new AttackState({
        squad_formation: new SquadFormation({
            bonus_card: bonus_card,
            main_unit: main_card,
            support_unit: support_card,
        }),
        attack_column: action.selected_column,
        defence_column: action.selected_column,
    })
    state.phase = PhasesEnum.PHASE_4_DEFENDER_ACTIONS
    return state
}


function remove_losing_units(player: PlayerState, squad: SquadFormation, column: number) {
    player.row_1[column] = undefined
    player.row_2[column] = undefined
    player.dead_pile.push(squad.main_unit)
    if (squad.support_unit !== undefined) {
        player.dead_pile.push(squad.support_unit)
    }
}

function discard_tied_units(player: PlayerState, squad: SquadFormation, column: number) {
    player.row_1[column] = undefined
    player.row_2[column] = undefined
    player.discard_pile.push(squad.main_unit)
    if (squad.support_unit !== undefined) {
        player.discard_pile.push(squad.support_unit)
    }
}

export function choose_defender(game: GameState, action: ChooseDefenderEvent): GameState {
    console.log("ACTION: " + action.kind)
    assert(game.battle_state !== undefined)
    const column = game.battle_state.defence_column
    let main_card
    let support_card
    const attacking_player = game.current_player
    const defending_player = game.another_player
    if (action.selected_row === 1) {
        main_card = defending_player.row_1[column]
        support_card = defending_player.row_2[column]
    } else {
        main_card = defending_player.row_2[column]
        support_card = defending_player.row_1[column]
    }
    assert(main_card !== undefined)
    let bonus_card
    if (!action.is_bonus_card_used) {
        bonus_card = undefined
    } else if (action.bonus_card_id === undefined) {
        bonus_card = defending_player.deck.pop()
    } else {
        bonus_card = defending_player.hand.take_card_by_id(action.bonus_card_id)
    }
    const defenceSquad = new SquadFormation({
        bonus_card: bonus_card,
        main_unit: main_card,
        support_unit: support_card
    })
    const attackSquad = game.battle_state.squad_formation;
    const outcome = resolve_battle(
        attackSquad,
        defenceSquad,
    )
    console.log("outcome =", outcome)
    game.phase = PhasesEnum.PHASE_4_PLAYER_ACTIONS
    if (defenceSquad.bonus_card !== undefined) {
        defending_player.discard_pile.push(defenceSquad.bonus_card)
    }
    if (attackSquad.bonus_card !== undefined) {
        attacking_player.discard_pile.push(attackSquad.bonus_card)
    }
    switch (outcome) {
        case AttackOutcomesEnum.ATTACKER_WINS:
            remove_losing_units(defending_player, defenceSquad, game.battle_state.defence_column)
            game.neutral[game.battle_state.defence_column] = game.current_player.player_id
            return game
        case AttackOutcomesEnum.DEFENDER_WINS:
            remove_losing_units(game.current_player, attackSquad, game.battle_state.defence_column)
            if (game.neutral[game.battle_state.defence_column] !== game.another_player.player_id) {
                game.neutral[game.battle_state.defence_column] = 0
            }
            return game
        case AttackOutcomesEnum.TIED:
            discard_tied_units(game.current_player, attackSquad, game.battle_state.defence_column)
            discard_tied_units(game.another_player, defenceSquad, game.battle_state.defence_column)
            game.neutral[game.battle_state.defence_column] = 0
            return game
    }
}


export function withdraw_from_battle(game: GameState, action: DefenderWithdrawsEvent): GameState {
    console.log("ACTION: " + action.kind)
    assert(game.battle_state !== undefined)
    const attackColumn = game.battle_state.attack_column
    const defenceColumn = game.battle_state.defence_column
    const attackingPlayer = game.current_player
    const defendingPlayer = game.another_player
    const attack_speed = Math.max(attackingPlayer.row_1[attackColumn]?.speed ?? 0,
        attackingPlayer?.row_2[attackColumn]?.speed ?? 0)
    const defence_speed = Math.min(defendingPlayer.row_1[defenceColumn]?.speed ?? 9,
        defendingPlayer?.row_2[defenceColumn]?.speed ?? 9)
    if (defence_speed <= attack_speed) {
        throw new Error("can't withdraw with speed = " + defence_speed)
    }
    if (game.battle_state.squad_formation.bonus_card !== undefined) {
        attackingPlayer.discard_pile.push(game.battle_state.squad_formation.bonus_card)
    }
    const unitCard = defendingPlayer.row_1[defenceColumn];
    if (unitCard !== undefined) {
        defendingPlayer.discard_pile.push(unitCard)
        defendingPlayer.row_1[defenceColumn] = undefined
    }
    const supportCard = defendingPlayer.row_2[defenceColumn];
    if (supportCard !== undefined) {
        defendingPlayer.discard_pile.push(supportCard)
        defendingPlayer.row_2[defenceColumn] = undefined
    }
    game.phase = PhasesEnum.PHASE_4_PLAYER_ACTIONS
    return game
}


export function draw_cards(state: GameState): GameState {
    assert(state.phase === PhasesEnum.PHASE_4_PLAYER_ACTIONS)
    state.phase = PhasesEnum.PHASE_5_DRAW_CARDS
    for (let i = 0; i < 3; i++) {
        state.current_player = takeCard(state.current_player)
    }
    return state
}

export function end_this_turn(state: GameState): GameState {
    const tmp = state.current_player
    state.current_player = state.another_player
    state.another_player = tmp
    state.phase = PhasesEnum.PHASE_1_VICTORY_CHECK
    return state
}
