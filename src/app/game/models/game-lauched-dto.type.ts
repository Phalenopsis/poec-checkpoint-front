export type GameLaunched = {
    id: number,
    playerId: number,
    difficulty: string,
    grid: string,
    humanPlayerColor: number,
    constructGrid?: string[][],
    isFinished: number
}
