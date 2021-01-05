import util from "util";
import CardDTO from "../milito-shared/game/CardDTO";

export class ILeaderCard {
    id?: number
    combat_value: number
    place_unit_ability: number
    special_effect?: string

    constructor(props: ILeaderCard) {
        this.id = props.id
        this.combat_value = props.combat_value
        this.place_unit_ability = props.place_unit_ability
        this.special_effect = props.special_effect
    }

}

export class LeaderCard extends ILeaderCard {

    [util.inspect.custom](depth: number, opts: Object) {
        return "Leader#" + this.id
    }

    toDTO(): CardDTO {
        return new CardDTO({
            id: this.id,
            unitType: `leader_${this.id}`
        })
    }

}

export class IUnitCard {
    id?: number
    unit_type: string
    speed: number
    attack_strength: number
    defence_strength: number
    deploy_penalty?: number
    flank_penalty?: number
    combine_ability?: boolean
    attack_modifiers?: undefined
    defence_modifiers?: undefined

    constructor(props: IUnitCard) {
        this.id = props.id
        this.unit_type = props.unit_type
        this.speed = props.speed
        this.attack_strength = props.attack_strength
        this.defence_strength = props.defence_strength
        this.deploy_penalty = props.deploy_penalty
        this.flank_penalty = props.flank_penalty
        this.combine_ability = props.combine_ability
        this.attack_modifiers = props.attack_modifiers
        this.defence_modifiers = props.defence_modifiers
    }

}

export class UnitCard extends IUnitCard {

    [util.inspect.custom](depth: number, opts: Object) {
        return this.unit_type + "#" + this.id
    }

    toDTO(): CardDTO {
        return new CardDTO({
            id: this.id,
            unitType: this.unit_type
        })
    }

}

export type Card = UnitCard | LeaderCard
