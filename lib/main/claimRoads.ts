import { Tile, Land, ChainNode } from "../interfaces"
import { appendLand } from "../territory/appendLand"
import { isLoop, dirMap, oppositeEdges, findEdges } from "../helperFunctions"
import { walkRoad } from "../walk/walkRoad"
import { createEmptyMatrix } from "../gridSetup"
import { claimedNode } from "../claims/claimedNode"

export function claimRoad(board: Tile[][], node: Tile, row: number, col: number, territory: Land[][], idx?: number): [chain: ChainNode[], matrix: Land[][]] {
    const arr: number[] = findEdges(node.edges, "road")
    const joinMap: Map<number, number> = oppositeEdges()
    const matrix: Land[][] = [...territory]

    const dir = [
        [-1, 0], 
        [0, 1], 
        [1, 0], 
        [0, -1]
    ]
    node.claimed = true
    const chain: ChainNode[] = [{ node: node }]
    const visited = createEmptyMatrix()
    visited[row][col] = true

    if (typeof idx === "number") {
        chain[0].edgeIdx = idx
        appendLand(matrix, row, col, node, "road", idx)
        claimedNode(matrix, row, col, "road", idx)

        const x = dir[idx][1]
        const y = dir[idx][0]
        const neighbor = board[row + y][col + x]
        const edgeIdx = joinMap.get(idx) as number
        walkRoad(board, neighbor, chain, matrix, visited, edgeIdx, joinMap, dir, row + y, col + x, false)

        return [chain, matrix]
    }
    appendLand(matrix, row, col, node, "road")
    claimedNode(matrix, row, col, "road")
    
    for (let i = 0; i < arr.length; i++) {
        const idx = arr[i]
        const x = dir[idx][1]
        const y = dir[idx][0]
        const neighbor = board[row + y][col + x]
        const edgeIdx = joinMap.get(idx) as number
        const append = i == 0 ? false : true

        walkRoad(board, neighbor, chain, matrix, visited, edgeIdx, joinMap, dir, row + y, col + x, append)
    } 
    return [chain, matrix]
}