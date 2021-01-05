import PhasesEnum from "../milito-shared/enums/PhasesEnum";
import Deck from "@entities/Deck";
import Hand from "@entities/Hand";
import {UnitCard} from "@entities/Card";
import PlayerInfoDTO from "../milito-shared/game/PlayerInfoDTO";
import FactionsEnum from "../milito-shared/enums/FactionsEnum";


class APlayerState {
    deck: Deck
    dead_pile: Deck
    discard_pile: Deck
    faction: FactionsEnum
    hand: Hand
    player_id: number
    row_1: [UnitCard?, UnitCard?, UnitCard?, UnitCard?, UnitCard?]
    row_2: [UnitCard?, UnitCard?, UnitCard?, UnitCard?, UnitCard?]
    state: PhasesEnum

    constructor(that: APlayerState) {
        this.deck = that.deck
        this.dead_pile = that.dead_pile
        this.discard_pile = that.discard_pile
        this.faction = that.faction
        this.hand = that.hand
        this.player_id = that.player_id
        this.row_1 = that.row_1
        this.row_2 = that.row_2
        this.state = that.state
    }

}


export default class PlayerState extends APlayerState {

    toDTO(): PlayerInfoDTO {
        return new PlayerInfoDTO({
            faction: this.faction,
            hand: this.hand.toDTO(),
            playerId: this.player_id,
            row1: this.row_1.map((x) => x?.toDTO()),
            row2: this.row_2.map((x) => x?.toDTO()),
        })
    }
}
