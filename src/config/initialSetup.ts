import PlayerState from "@entities/PlayerState";
import Deck from "@entities/Deck";
import Hand from "@entities/Hand";
import PhasesEnum from "../milito-shared/enums/PhasesEnum";
import GameState from "@entities/GameState";
import AncientBritishDeck from "./decks/AncientBritish";
import AlexandrianMacedonianDeck from "./decks/AlexandrianMacedonian";
import FactionsEnum from "../milito-shared/enums/FactionsEnum";


export function takeCard(playerState: PlayerState): PlayerState {
    let card = playerState.deck.pop()
    playerState.hand.push(card)
    return playerState
}

export default function initialSetup(): GameState {
    const player_table1 = new PlayerState({
            dead_pile: Deck.makeEmpty(),
            discard_pile: Deck.makeEmpty(),
            faction: FactionsEnum.AlexandrianMacedonian,
            hand: Hand.makeEmpty(),
            player_id: 1,
            row_1: [undefined, undefined, undefined, undefined, undefined],
            row_2: [undefined, undefined, undefined, undefined, undefined],
            state: PhasesEnum.GAME_START_STATE,
            deck: AlexandrianMacedonianDeck.make(),
        }
    )
    const player_table2 = new PlayerState({
            dead_pile: Deck.makeEmpty(),
            discard_pile: Deck.makeEmpty(),
            faction: FactionsEnum.AncientBritish,
            hand: Hand.makeEmpty(),
            player_id: 2,
            row_1: [undefined, undefined, undefined, undefined, undefined],
            row_2: [undefined, undefined, undefined, undefined, undefined],
            state: PhasesEnum.GAME_START_STATE,
            deck: AncientBritishDeck.make(),
        }
    )
    const gameState = new GameState({
        neutral: [0, 0, 0, 0, 0],
        phase: PhasesEnum.PHASE_1_VICTORY_CHECK,
        current_player: player_table1,
        another_player: player_table2,
    })
    for (let i = 0; i < 9; i++) {
        gameState.current_player = takeCard(gameState.current_player)
        gameState.another_player = takeCard(gameState.another_player)
    }
    return gameState
}
