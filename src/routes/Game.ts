import {Router} from 'express'
import cors from 'cors'
import {json} from 'body-parser'
import Db from "../db/Db";
import initialSetup from "@config/initialSetup";
import GameState from "@entities/GameState";
import {choose_defender, initiate_attack, place_a_unit, withdraw_from_battle} from "@config/gameActions";
import ChooseDefenderEvent from "../milito-shared/events/ChooseDefenderEvent";
import DefenderWithdrawsEvent from "../milito-shared/events/DefenderWithdrawsEvent";
import InitiateAttackEvent from "../milito-shared/events/InitiateAttackEvent";
import PlaceUnitEvent from "../milito-shared/events/PlaceUnitEvent";

const router = Router()

router.use(cors())

const jsonParser = json()


const database = new Db()

/******************************************************************************
 *                      Get All Game States - "POST /api/game/ololo"
 ******************************************************************************/

router.post('/setup', jsonParser, (request, response) => {
    console.log("request path:", request.path)
    console.log("request body:", request.body)
    database.internal = initialSetup()
    response.json(database.internal.toDTO())
})



function handleEvent(body: any, state: GameState): GameState {
    switch (body.kind) {
        case "ChooseDefenderEvent":
            return choose_defender(state, new ChooseDefenderEvent(body))
        case "DefenderWithdrawsEvent":
            return withdraw_from_battle(state, new DefenderWithdrawsEvent())
        case "InitiateAttackEvent":
            return initiate_attack(state, new InitiateAttackEvent(body))
        case "PlaceUnitEvent":
            return place_a_unit(state, new PlaceUnitEvent(body))
        default:
            throw new Error("unknown event:" + body.kind)
    }
}

router.post('/event', jsonParser, (request, response) => {
    console.log("request path:", request.path)
    console.log("request body:", request.body)
    const oldState = database.internal
    console.log("event:", request.body)
    database.internal = handleEvent(request.body, oldState)
    response.json(database.internal.toDTO())
})

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
