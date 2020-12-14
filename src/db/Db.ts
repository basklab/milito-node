import GameState from "@entities/GameState";
import initialSetup from "../config/initialSetup";


export default class Db {

    get internal(): GameState {
        return this._internal;
    }

    set internal(value: GameState) {
        this._internal = value;
    }

    private _internal: GameState = initialSetup()

}
