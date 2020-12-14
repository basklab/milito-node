import PlayerState from "@entities/PlayerState";
import Deck from "@entities/Deck";
import Hand from "@entities/Hand";
import StateEnum from "@entities/StateEnum";
import CarthaginianDeck from "./decks/CarthaginianDeck";
import GameState from "@entities/GameState";

const player_table1 = new PlayerState({
        discard: Deck.makeEmpty(),
        hand: Hand.makeEmpty(),
        row_1: [0, 0, 0, 0, 0],
        row_2: [0, 0, 0, 0, 0],
        state: StateEnum.GAME_START_STATE,
        deck: CarthaginianDeck.make()
    }
)
const player_table2 = new PlayerState({
        discard: Deck.makeEmpty(),
        hand: Hand.makeEmpty(),
        row_1: [0, 0, 0, 0, 0],
        row_2: [0, 0, 0, 0, 0],
        state: StateEnum.GAME_START_STATE,
        deck: CarthaginianDeck.make(),
    }
)

function takeCard(playerState: PlayerState): PlayerState {
    let card = playerState.deck.pop()
    playerState.hand.push(card)
    return playerState
}


export default function initialSetup(): GameState {
    const gameState = new GameState({
        neutral: [0, 0, 0, 0, 0],
        phase: StateEnum.GAME_START_STATE,
        current_player: player_table1,
        another_player: player_table2,
    })
    for (let i = 0; i < 4; i++) {
        gameState.current_player = takeCard(gameState.current_player)
        gameState.another_player = takeCard(gameState.another_player)
    }
    return gameState
}
