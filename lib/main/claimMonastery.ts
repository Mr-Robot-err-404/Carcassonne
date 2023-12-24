import { Tile, Land, ChainNode } from "../interfaces"
import { appendLand } from "../territory/appendLand"

export function claimMonastery(board: Tile[][], node: Tile, row: number, col: number, territory: Land[][]): [chain: ChainNode[], matrix: Land[][]] {
    const matrix = [...territory]
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
    node.claimed = true
    const chain = [{ node: node }]
    appendLand(matrix, row, col, node, "monastery")
    
    for (let i = 0; i < dir.length; i++) {
        const x = dir[i][1]
        const y = dir[i][0]
        const neighbor = board[row + y][col + x]
        if (neighbor.empty) {
            continue
        }
        chain.push({ node: neighbor })
        appendLand(matrix, row + y, col + x, neighbor, "monastery")
    }
    return [chain, matrix]
}