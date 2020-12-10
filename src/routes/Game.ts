import {Router} from 'express';
import cors from 'cors'
import {json} from 'body-parser'

import PlayerState from "@entities/PlayerState";
import PlayerTable from "@entities/PlayerTable";
import StateEnum from "@entities/StateEnum";

const router = Router();

router.use(cors())

const jsonParser = json();

const player_table = new PlayerTable({
        enemy_row_2: [1, 0, 0, 1, 0],
        enemy_row_1: [1, 0, 0, 1, 0],
        territory_row: [0, 0, 0, 0, 0],
        player_row_1: [3, 1, 2, 1, 2],
        player_row_2: [1, -1, 3, 1, 3],
    }
)

const res = new PlayerState({
        table: player_table,
        hand: [3, 2, 2],
        state: StateEnum.SELECT_CARDS_STATE,
        cardsToDiscard: 0,
        discarded_cards: [],
        selected_card: undefined,
        selected_column: undefined,
    }
);


/******************************************************************************
 *                      Get All Game States - "POST /api/game/ololo"
 ******************************************************************************/

router.post('/ololo', jsonParser, (request, response) => {
    console.log("request path:", request.path)
    console.log("request body:", request.body)
    response.json(res)
})


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
