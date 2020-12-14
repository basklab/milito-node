import {Router} from 'express'
import cors from 'cors'
import {json} from 'body-parser'

import GameState from "@entities/GameState"
import StateEnum from "@entities/StateEnum"
import {PlayACardEvent} from "../events/GameEvents"
import PlayerState from "@entities/PlayerState";

const router = Router()

router.use(cors())

const jsonParser = json()

// const player_table1 = new PlayerState({
//         discard: [],
//         hand: [],
//         row_1: [1, 0, 0, 1, 0],
//         row_2: [1, 0, 0, 1, 0],
//         state: StateEnum.SELECT_CARDS_STATE,
//         deck: []
//     }
// )
//
// const player_table2 = new PlayerState({
//     discard: [],
//     hand: [],
//         row_1: [3, 1, 2, 1, 2],
//         row_2: [1, -1, 3, 1, 3],
//         state: StateEnum.SELECT_CARDS_STATE,
//         deck: [],
//     }
// )
//
// const res = new GameState({
//         neutral: [0, 0, 0, 0, 0],
//         phase: StateEnum.SELECT_CARDS_STATE,
//         current_player: player_table1,
//         another_player: player_table2,
//     }
// )

const res = {}

/******************************************************************************
 *                      Get All Game States - "POST /api/game/ololo"
 ******************************************************************************/

router.post('/ololo', jsonParser, (request, response) => {
    console.log("request path:", request.path)
    console.log("request body:", request.body)
    response.json(res)
})


router.post('/event', jsonParser, (request, response) => {
    console.log("request path:", request.path)
    console.log("request body:", request.body)
    if (request.body.kind == "PlayACardEvent") {
        let myEvent = new PlayACardEvent(request.body)
        console.log("event:", myEvent)
    } else {
        throw Error("unknown event type")
    }
    response.json(res)
})

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
