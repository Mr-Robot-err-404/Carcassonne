import { Tile, Land, ChainNode } from "../interfaces"
import { dirMap, findEdges, oppositeEdges } from "../helperFunctions"
import { createEmptyMatrix } from "../gridSetup"
import { appendLand } from "../territory/appendLand"
import { walkCity } from "../walk/walkCity"
import { claimedNode } from "../claims/claimedNode"

export function claimCity(board: Tile[][], node: Tile, row: number, col: number, territory: Land[][], idx?: number): [ChainNode[], Land[][]] {
    const arr: number[] = findEdges(node.edges, "city")
    const joinMap: Map<number, number> = oppositeEdges()
    const matrix: Land[][] = [...territory]

    const dir = [
        [-1, 0], 
        [0, 1], 
        [1, 0], 
        [0, -1]
    ]
    node.claimed = true
    const chain: ChainNode[] = [{node: node}]
    const visited: boolean[][] = createEmptyMatrix()
    visited[row][col] = true

    if (typeof idx === "number") {
        chain[0].edgeIdx = idx
        appendLand(matrix, row, col, node, "city", idx)
        claimedNode(matrix, row, col, "city", idx)
    
        const x = dir[idx][1]
        const y = dir[idx][0]
        const neighbor = board[row + y][col + x]
        const edgeIdx = joinMap.get(idx) as number

        walkCity(board, neighbor, chain, visited, matrix, joinMap, dir, edgeIdx, row + y, col + x)

        return [chain, matrix]
    }
    appendLand(matrix, row, col, node, "city")
    claimedNode(matrix, row, col, "city")
    
    for (let i = 0; i < arr.length; i++) {
        const idx = arr[i]
        const x = dir[idx][1]
        const y = dir[idx][0]
        const neighbor = board[row + y][col + x]
        const edgeIdx = joinMap.get(idx) as number

        walkCity(board, neighbor, chain, visited, matrix, joinMap, dir, edgeIdx, row + y, col + x)
    }
    return [chain, matrix]
}