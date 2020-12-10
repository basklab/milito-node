class PlayerTable {
    enemy_row_2: [number?, number?, number?, number?, number?]
    enemy_row_1: [number?, number?, number?, number?, number?]
    territory_row: [number, number, number, number, number]
    player_row_1: [number?, number?, number?, number?, number?]
    player_row_2: [number?, number?, number?, number?, number?]


    constructor(player_table: PlayerTable
    ) {
        this.enemy_row_2 = player_table.enemy_row_2
        this.enemy_row_1 = player_table.enemy_row_1
        this.territory_row = player_table.territory_row
        this.player_row_1 = player_table.player_row_1
        this.player_row_2 = player_table.player_row_2
    }
}

export default PlayerTable
