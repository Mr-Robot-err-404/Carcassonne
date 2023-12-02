import { Tile } from "../interfaces"

export function isMoveLegal(board: Tile[][], node: Tile, row: number, col: number) {
    const dir = [
        [-1, 0], 
        [0, 1], 
        [1, 0], 
        [0, -1]
    ]
    const edgeIndices = [2, 3, 0, 1]
    const edges: string[] = node.edges

    for (let i = 0; i < edges.length; i++) {
        const x = dir[i][1]
        const y = dir[i][0]
        const neighbor: Tile = board[row + y][col + x]

        if (neighbor.empty) {
            continue
        }
        const idx = edgeIndices[i]

        if (edges[i] !== neighbor.edges[idx]) {
            return false
        }
    }
    return true
}