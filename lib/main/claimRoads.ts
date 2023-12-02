import { Tile, Land, ChainNode } from "../interfaces"
import { appendLand } from "../territory/appendLand"
import { isLoop, dirMap, oppositeEdges } from "../helperFunctions"
import { walkRoad } from "../walk/walkRoad"
import { createEmptyMatrix } from "../gridSetup"

export function claimRoad(board: Tile[][], node: Tile, row: number, col: number, territory: Land[][], singleEdge?: string) {
    const map = dirMap(node, "road", singleEdge)
    const arr: string[] = Object.keys(map)
    const joinMap: Map<number, number> = oppositeEdges()
    const matrix: Land[][] = [...territory]

    const dir = [
        [-1, 0], 
        [0, 1], 
        [1, 0], 
        [0, -1]
    ]
    const chain: ChainNode[] = [{ node: node }]
    const visited = createEmptyMatrix()
    visited[row][col] = true

    if (singleEdge) {
        const int = parseInt(arr[0])
        chain[0].edgeIdx = int
    
        appendLand(matrix, row, col, node, "road", int)
    }
    else {
        appendLand(matrix, row, col, node, "road")
    }
    
    for (let i = 0; i < arr.length; i++) {
        const idx = parseInt(arr[i])
        const x = dir[idx][1]
        const y = dir[idx][0]
        const neighbor = board[row + y][col + x]
        const edgeIdx = joinMap.get(idx) as number
        const append = i == 0 ? false : true

        walkRoad(board, neighbor, chain, matrix, visited, edgeIdx, joinMap, dir, row + y, col + x, append)
    } 
    return [chain, matrix]
}