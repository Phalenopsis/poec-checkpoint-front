import { PlayerDTO } from "./player-dto.type"

export type GameDTO = {
    id: number,
    player: PlayerDTO,
    grid: string
}