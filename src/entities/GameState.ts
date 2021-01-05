import PhasesEnum from "../milito-shared/enums/PhasesEnum";
import PlayerState from "@entities/PlayerState";
import AttackState from "@entities/AttackState";
import GameTableDTO from "../milito-shared/game/GameTableDTO";


class AGameState {

    neutral: [number, number, number, number, number]
    phase: PhasesEnum
    current_player: PlayerState
    another_player: PlayerState
    battle_state?: AttackState


    constructor(game_state: AGameState) {
        this.neutral = game_state.neutral
        this.phase = game_state.phase
        this.current_player = game_state.current_player
        this.another_player = game_state.another_player
    }

}

export default class GameState extends AGameState {

    toDTO(): GameTableDTO {
        return new GameTableDTO({
            anotherPlayer: this.another_player.toDTO(),
            currentPlayer: this.current_player.toDTO(),
            neutral: this.neutral,
            phase: this.phase,
        })
    }

}
