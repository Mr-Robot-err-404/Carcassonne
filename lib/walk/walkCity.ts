import { Tile, Land, ChainNode } from "../interfaces"
import { appendLand } from "../territory/appendLand"
import { findOtherEdges } from "../helperFunctions"

export function walkCity(board: Tile[][], currNode: Tile, chain: ChainNode[], visited: boolean[][], matrix: Land[][], joinMap: Map<number, number>, dir: number[][], edgeIdx: number, row: number, col: number,) {
    if (currNode.empty) {
        return
    }

    if (visited[row][col]) {
        return 
    }
    
    visited[row][col] = true

    if (currNode.unjoined) {
        chain.push({ node: currNode, edgeIdx: edgeIdx })
        appendLand(matrix, row, col, currNode, "city", edgeIdx)
    }

    else {
        chain.push({ node: currNode })
        appendLand(matrix, row, col, currNode, "city")
    }

    if (currNode.end) {
        return 
    }
    
    const edges = findOtherEdges(currNode.edges, edgeIdx, "city") as number[]

    for (let i = 0; i < edges.length; i++) {
        const idx: number = edges[i]
        const x = dir[idx][1]
        const y = dir[idx][0]
        const neighbor = board[row + y][col + x]
        const nextIdx = joinMap.get(idx) as number

        walkCity(board, neighbor, chain, visited, matrix, joinMap, dir, nextIdx, row + y, col + x)
    }
}