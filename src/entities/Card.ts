export interface LeaderCard {
    id?: number
    combat_value: string
    place_unit_ability: number
    special_effect: number
}

export interface UnitCard {
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

}

export type Card = UnitCard | LeaderCard
