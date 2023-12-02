import { Tile, Land, ChainNode } from "../interfaces"
import { dirMap, oppositeEdges } from "../helperFunctions"
import { createEmptyMatrix } from "../gridSetup"
import { appendLand } from "../territory/appendLand"
import { walkCity } from "../walk/walkCity"

export function claimCity(board: Tile[][], node: Tile, row: number, col: number, territory: Land[][], singleEdge?: string) {
    const map = dirMap(node, "city", singleEdge)
    const arr: string[] = Object.keys(map)
    const joinMap: Map<number, number> = oppositeEdges()
    const matrix: Land[][] = [...territory]

    const dir = [
        [-1, 0], 
        [0, 1], 
        [1, 0], 
        [0, -1]
    ]
    const chain: ChainNode[] = [{node: node}]
    const visited: boolean[][] = createEmptyMatrix()
    visited[row][col] = true
    
    if (singleEdge) {
        const int = parseInt(arr[0])
        chain[0].edgeIdx = int
        appendLand(matrix, row, col, node, "city", int)
    }
    else {
        appendLand(matrix, row, col, node, "city")
    }

    for (let i = 0; i < arr.length; i++) {
        const idx = parseInt(arr[i])
        const x = dir[idx][1]
        const y = dir[idx][0]
        const neighbor = board[row + y][col + x]
        const edgeIdx = joinMap.get(idx) as number

        walkCity(board, neighbor, chain, visited, matrix, joinMap, dir, edgeIdx, row + y, col + x)
    }
    return [chain, matrix]
}