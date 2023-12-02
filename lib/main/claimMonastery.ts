import { Tile, Land } from "../interfaces"
import { appendLand } from "../territory/appendLand"

export function claimMonastery(board: Tile[][], node: Tile, row: number, col: number, territory: Land[][]) {
    const matrix = territory.map((row: Land[]) => [...row])
    const dir = [
        [-1, 0], 
        [0, 1], 
        [1, 0], 
        [0, -1], 
        [-1, -1], 
        [-1, 1], 
        [1, -1], 
        [1, 1]
    ]
    const chain = [{node: node}]
    appendLand(matrix, row, col, node, "monastery")
    
    for (let i = 0; i < dir.length; i++) {
        const x = dir[i][1]
        const y = dir[i][0]
        const neighbor = board[row + y][col + x]
        if (neighbor.empty) {
            continue
        }

        chain.push({node: neighbor})
        appendLand(matrix, row + y, col + x, neighbor, "monastery")
    }
    return [matrix, chain]
}