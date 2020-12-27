import StateEnum from "@entities/StateEnum";
import PlayerState from "@entities/PlayerState";
import AttackState from "@entities/AttackState";

export default class GameState {
    neutral: [number, number, number, number, number]
    phase: StateEnum
    current_player: PlayerState
    another_player: PlayerState
    attack_state?: AttackState


    constructor(game_state: GameState) {
        this.neutral = game_state.neutral
        this.phase = game_state.phase
        this.current_player = game_state.current_player
        this.another_player = game_state.another_player
    }

}
